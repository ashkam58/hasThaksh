export interface TraceStep {
  stepNumber: number;
  line: number;
  codeLine: string;
  variables: Record<string, string>;
  stdoutSoFar: string;
}

export interface PythonExecutionResult {
  stdout: string;
  stderr: string;
  status: 'success' | 'error' | 'timeout';
  durationMs: number;
  inputLog: { prompt: string; value: string }[];
  traceSteps: TraceStep[];
  engine: 'pyodide-wasm' | 'python3-runtime';
}

export interface ExecutionOptions {
  inputs?: string[];
  maxSteps?: number;
  timeoutMs?: number;
  seed?: number;
}

class PythonRuntimeError extends Error {
  pyType: string;
  line: number;
  constructor(pyType: string, message: string, line: number) {
    super(`${pyType} (Line ${line}): ${message}`);
    this.pyType = pyType;
    this.line = line;
  }
}

class BreakSignal {}
class ContinueSignal {}
class ReturnSignal {
  value: any;
  constructor(value: any) {
    this.value = value;
  }
}

interface StmtLine {
  lineNo: number; // 1-indexed
  indent: number;
  text: string;
}

type BlockNode =
  | { kind: 'simple'; lineNo: number; text: string }
  | {
      kind: 'if';
      lineNo: number;
      branches: { cond: string | null; lineNo: number; body: BlockNode[] }[];
    }
  | {
      kind: 'for';
      lineNo: number;
      target: string;
      iterExpr: string;
      body: BlockNode[];
    }
  | {
      kind: 'while';
      lineNo: number;
      cond: string;
      body: BlockNode[];
    }
  | {
      kind: 'def';
      lineNo: number;
      name: string;
      params: { name: string; defaultExpr?: string }[];
      body: BlockNode[];
    }
  | {
      kind: 'try';
      lineNo: number;
      tryBody: BlockNode[];
      handlers: { errorType: string | null; varName: string | null; body: BlockNode[] }[];
      finallyBody: BlockNode[];
    };

interface PyFunction {
  __pyFunc: true;
  name: string;
  params: { name: string; defaultExpr?: string }[];
  body: BlockNode[];
  defLine: number;
}

/**
 * Preprocess source lines: strip comments (outside strings) and join multi-line brackets [], {}, ().
 */
function preprocessSource(source: string): StmtLine[] {
  const rawLines = source.replace(/\r\n/g, '\n').split('\n');
  const result: StmtLine[] = [];

  let accumText = '';
  let accumIndent = 0;
  let accumStartLine = 1;
  let bracketDepth = 0;

  for (let i = 0; i < rawLines.length; i++) {
    const raw = rawLines[i];
    // Strip comment outside quotes
    let cleaned = '';
    let inSingle = false;
    let inDouble = false;
    let escaped = false;

    for (let c = 0; c < raw.length; c++) {
      const ch = raw[c];
      if (escaped) {
        cleaned += ch;
        escaped = false;
        continue;
      }
      if (ch === '\\') {
        cleaned += ch;
        escaped = true;
        continue;
      }
      if (ch === "'" && !inDouble) {
        inSingle = !inSingle;
        cleaned += ch;
      } else if (ch === '"' && !inSingle) {
        inDouble = !inDouble;
        cleaned += ch;
      } else if (ch === '#' && !inSingle && !inDouble) {
        break;
      } else {
        cleaned += ch;
      }
    }

    if (cleaned.trim() === '') {
      continue;
    }

    // Count brackets on this cleaned line
    let deltaDepth = 0;
    inSingle = false;
    inDouble = false;
    escaped = false;
    for (let c = 0; c < cleaned.length; c++) {
      const ch = cleaned[c];
      if (escaped) {
        escaped = false;
        continue;
      }
      if (ch === '\\') {
        escaped = true;
        continue;
      }
      if (ch === "'" && !inDouble) inSingle = !inSingle;
      else if (ch === '"' && !inSingle) inDouble = !inDouble;
      else if (!inSingle && !inDouble) {
        if (ch === '(' || ch === '[' || ch === '{') deltaDepth++;
        else if (ch === ')' || ch === ']' || ch === '}') deltaDepth--;
      }
    }

    if (bracketDepth === 0) {
      const match = cleaned.match(/^(\s*)(.*)$/);
      const indentStr = match ? match[1] : '';
      let indent = 0;
      for (const ch of indentStr) {
        indent += ch === '\t' ? 4 : 1;
      }
      accumIndent = indent;
      accumStartLine = i + 1;
      accumText = cleaned.trim();
      bracketDepth += deltaDepth;
    } else {
      accumText += ' ' + cleaned.trim();
      bracketDepth += deltaDepth;
    }

    if (bracketDepth < 0) {
      throw new PythonRuntimeError('SyntaxError', 'Unmatched closing bracket', i + 1);
    }

    if (bracketDepth === 0 && accumText !== '') {
      const inlineMatch = accumText.match(/^(if\s+.+|elif\s+.+|else\s*:.+|for\s+.+|while\s+.+)$/);
      let pushedInline = false;
      if (inlineMatch && !accumText.endsWith(':')) {
        const colonIdx = findTopLevelOp(accumText, ':');
        if (colonIdx !== -1) {
          const head = accumText.slice(0, colonIdx + 1).trim();
          const tail = accumText.slice(colonIdx + 1).trim();
          if (/^(if\s+|elif\s+|else\s*:|for\s+|while\s+)/.test(head) && tail.length > 0) {
            result.push({
              lineNo: accumStartLine,
              indent: accumIndent,
              text: head,
            });
            result.push({
              lineNo: accumStartLine,
              indent: accumIndent + 4,
              text: tail,
            });
            pushedInline = true;
          }
        }
      }
      if (!pushedInline) {
        result.push({
          lineNo: accumStartLine,
          indent: accumIndent,
          text: accumText,
        });
      }
      accumText = '';
    }
  }

  if (bracketDepth !== 0) {
    throw new PythonRuntimeError('SyntaxError', 'Unclosed bracket or parenthesis', accumStartLine);
  }

  return result;
}

function parseParams(paramStr: string, lineNo: number): { name: string; defaultExpr?: string }[] {
  const trimmed = paramStr.trim();
  if (!trimmed) return [];
  const parts = splitTopLevel(trimmed, ',');
  return parts.map((p) => {
    const eqIdx = findTopLevelOp(p, '=');
    if (eqIdx !== -1) {
      return {
        name: p.slice(0, eqIdx).trim(),
        defaultExpr: p.slice(eqIdx + 1).trim(),
      };
    }
    const name = p.trim();
    if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(name)) {
      throw new PythonRuntimeError('SyntaxError', `Invalid parameter name '${name}'`, lineNo);
    }
    return { name };
  });
}

function parseBlock(lines: StmtLine[], startIdx: number, expectedIndent: number): { nodes: BlockNode[]; nextIdx: number } {
  const nodes: BlockNode[] = [];
  let i = startIdx;

  while (i < lines.length) {
    const line = lines[i];
    if (line.indent < expectedIndent) {
      break;
    }
    if (line.indent > expectedIndent) {
      throw new PythonRuntimeError('IndentationError', `Unexpected indentation at '${line.text}'`, line.lineNo);
    }

    const txt = line.text;

    // Check block starters
    if (/^if\s+(.+):$/.test(txt)) {
      const m = txt.match(/^if\s+(.+):$/)!;
      const branches: { cond: string | null; lineNo: number; body: BlockNode[] }[] = [];
      i++;
      if (i >= lines.length || lines[i].indent <= expectedIndent) {
        throw new PythonRuntimeError('IndentationError', 'Expected an indented block after if statement', line.lineNo);
      }
      const sub = parseBlock(lines, i, lines[i].indent);
      branches.push({ cond: m[1].trim(), lineNo: line.lineNo, body: sub.nodes });
      i = sub.nextIdx;

      while (i < lines.length && lines[i].indent === expectedIndent) {
        const nextTxt = lines[i].text;
        const elifMatch = nextTxt.match(/^elif\s+(.+):$/);
        if (elifMatch) {
          const branchLine = lines[i].lineNo;
          i++;
          if (i >= lines.length || lines[i].indent <= expectedIndent) {
            throw new PythonRuntimeError('IndentationError', 'Expected an indented block after elif statement', branchLine);
          }
          const elifSub = parseBlock(lines, i, lines[i].indent);
          branches.push({ cond: elifMatch[1].trim(), lineNo: branchLine, body: elifSub.nodes });
          i = elifSub.nextIdx;
        } else if (/^else\s*:$/.test(nextTxt)) {
          const branchLine = lines[i].lineNo;
          i++;
          if (i >= lines.length || lines[i].indent <= expectedIndent) {
            throw new PythonRuntimeError('IndentationError', 'Expected an indented block after else statement', branchLine);
          }
          const elseSub = parseBlock(lines, i, lines[i].indent);
          branches.push({ cond: null, lineNo: branchLine, body: elseSub.nodes });
          i = elseSub.nextIdx;
          break;
        } else {
          break;
        }
      }

      nodes.push({ kind: 'if', lineNo: line.lineNo, branches });
      continue;
    }

    if (/^for\s+(.+?)\s+in\s+(.+):$/.test(txt)) {
      const m = txt.match(/^for\s+(.+?)\s+in\s+(.+):$/)!;
      i++;
      if (i >= lines.length || lines[i].indent <= expectedIndent) {
        throw new PythonRuntimeError('IndentationError', 'Expected an indented block after for statement', line.lineNo);
      }
      const sub = parseBlock(lines, i, lines[i].indent);
      nodes.push({
        kind: 'for',
        lineNo: line.lineNo,
        target: m[1].trim(),
        iterExpr: m[2].trim(),
        body: sub.nodes,
      });
      i = sub.nextIdx;
      continue;
    }

    if (/^while\s+(.+):$/.test(txt)) {
      const m = txt.match(/^while\s+(.+):$/)!;
      i++;
      if (i >= lines.length || lines[i].indent <= expectedIndent) {
        throw new PythonRuntimeError('IndentationError', 'Expected an indented block after while statement', line.lineNo);
      }
      const sub = parseBlock(lines, i, lines[i].indent);
      nodes.push({
        kind: 'while',
        lineNo: line.lineNo,
        cond: m[1].trim(),
        body: sub.nodes,
      });
      i = sub.nextIdx;
      continue;
    }

    if (/^def\s+([A-Za-z_][A-Za-z0-9_]*)\s*\((.*)\)\s*:$/.test(txt)) {
      const m = txt.match(/^def\s+([A-Za-z_][A-Za-z0-9_]*)\s*\((.*)\)\s*:$/)!;
      const funcName = m[1];
      const params = parseParams(m[2], line.lineNo);
      i++;
      if (i >= lines.length || lines[i].indent <= expectedIndent) {
        throw new PythonRuntimeError('IndentationError', 'Expected an indented block after function definition', line.lineNo);
      }
      const sub = parseBlock(lines, i, lines[i].indent);
      nodes.push({
        kind: 'def',
        lineNo: line.lineNo,
        name: funcName,
        params,
        body: sub.nodes,
      });
      i = sub.nextIdx;
      continue;
    }

    if (/^try\s*:$/.test(txt)) {
      const tryLine = line.lineNo;
      i++;
      if (i >= lines.length || lines[i].indent <= expectedIndent) {
        throw new PythonRuntimeError('IndentationError', 'Expected an indented block after try:', tryLine);
      }
      const trySub = parseBlock(lines, i, lines[i].indent);
      i = trySub.nextIdx;
      const handlers: { errorType: string | null; varName: string | null; body: BlockNode[] }[] = [];
      let finallyBody: BlockNode[] = [];

      while (i < lines.length && lines[i].indent === expectedIndent) {
        const hTxt = lines[i].text;
        const excMatch = hTxt.match(/^except(?:\s+([A-Za-z_][A-Za-z0-9_]*)(?:\s+as\s+([A-Za-z_][A-Za-z0-9_]*))?)?\s*:$/);
        if (excMatch) {
          const hLine = lines[i].lineNo;
          i++;
          if (i >= lines.length || lines[i].indent <= expectedIndent) {
            throw new PythonRuntimeError('IndentationError', 'Expected an indented block after except:', hLine);
          }
          const hSub = parseBlock(lines, i, lines[i].indent);
          handlers.push({
            errorType: excMatch[1] || null,
            varName: excMatch[2] || null,
            body: hSub.nodes,
          });
          i = hSub.nextIdx;
        } else if (/^finally\s*:$/.test(hTxt)) {
          const fLine = lines[i].lineNo;
          i++;
          if (i >= lines.length || lines[i].indent <= expectedIndent) {
            throw new PythonRuntimeError('IndentationError', 'Expected an indented block after finally:', fLine);
          }
          const fSub = parseBlock(lines, i, lines[i].indent);
          finallyBody = fSub.nodes;
          i = fSub.nextIdx;
          break;
        } else {
          break;
        }
      }

      if (handlers.length === 0 && finallyBody.length === 0) {
        throw new PythonRuntimeError('SyntaxError', 'try block must have at least one except or finally clause', tryLine);
      }

      nodes.push({
        kind: 'try',
        lineNo: tryLine,
        tryBody: trySub.nodes,
        handlers,
        finallyBody,
      });
      continue;
    }

    // Syntax check for stray colons on control words
    if (/^(if|elif|else|for|while|def|try|except)\b/.test(txt) && !txt.endsWith(':')) {
      throw new PythonRuntimeError('SyntaxError', `Expected ':' at the end of '${txt}'`, line.lineNo);
    }

    nodes.push({ kind: 'simple', lineNo: line.lineNo, text: txt });
    i++;
  }

  return { nodes, nextIdx: i };
}

/**
 * Helper to split string by delimiter only at top level (outside quotes and brackets).
 */
function splitTopLevel(expr: string, delimiter: string): string[] {
  const parts: string[] = [];
  let current = '';
  let depth = 0;
  let inSingle = false;
  let inDouble = false;
  let escaped = false;

  for (let i = 0; i < expr.length; i++) {
    const ch = expr[i];
    if (escaped) {
      current += ch;
      escaped = false;
      continue;
    }
    if (ch === '\\') {
      current += ch;
      escaped = true;
      continue;
    }
    if (ch === "'" && !inDouble) {
      inSingle = !inSingle;
      current += ch;
      continue;
    }
    if (ch === '"' && !inSingle) {
      inDouble = !inDouble;
      current += ch;
      continue;
    }
    if (!inSingle && !inDouble) {
      if (ch === '(' || ch === '[' || ch === '{') depth++;
      else if (ch === ')' || ch === ']' || ch === '}') depth--;

      if (depth === 0 && expr.slice(i, i + delimiter.length) === delimiter) {
        parts.push(current);
        current = '';
        i += delimiter.length - 1;
        continue;
      }
    }
    current += ch;
  }
  parts.push(current);
  return parts;
}

/**
 * Find single-character assignment '=' at top level (not ==, !=, <=, >=, +=, -=, *=, /=, //=)
 */
function findTopLevelOp(expr: string, op: string): number {
  let depth = 0;
  let inSingle = false;
  let inDouble = false;
  let escaped = false;

  for (let i = 0; i < expr.length; i++) {
    const ch = expr[i];
    if (escaped) {
      escaped = false;
      continue;
    }
    if (ch === '\\') {
      escaped = true;
      continue;
    }
    if (ch === "'" && !inDouble) inSingle = !inSingle;
    else if (ch === '"' && !inSingle) inDouble = !inDouble;
    else if (!inSingle && !inDouble) {
      if (ch === '(' || ch === '[' || ch === '{') depth++;
      else if (ch === ')' || ch === ']' || ch === '}') depth--;
      else if (depth === 0 && expr.slice(i, i + op.length) === op) {
        if (op === '=') {
          const prev = i > 0 ? expr[i - 1] : '';
          const next = i + 1 < expr.length ? expr[i + 1] : '';
          if (prev === '=' || prev === '!' || prev === '<' || prev === '>' || prev === '+' || prev === '-' || prev === '*' || prev === '/' || next === '=') {
            continue;
          }
        }
        return i;
      }
    }
  }
  return -1;
}

export function pyToString(val: any): string {
  if (val === null || val === undefined) return 'None';
  if (typeof val === 'boolean') return val ? 'True' : 'False';
  if (typeof val === 'number') {
    if (Number.isNaN(val)) return 'nan';
    return String(val);
  }
  if (typeof val === 'string') return val;
  if (Array.isArray(val)) {
    const isTuple = (val as any).__isTuple;
    const inner = val.map((item) => pyRepr(item)).join(', ');
    if (isTuple) {
      return val.length === 1 ? `(${inner},)` : `(${inner})`;
    }
    return `[${inner}]`;
  }
  if (typeof val === 'object') {
    const entries = Object.entries(val)
      .filter(([k]) => !k.startsWith('__'))
      .map(([k, v]) => `${pyRepr(k)}: ${pyRepr(v)}`);
    return `{${entries.join(', ')}}`;
  }
  return String(val);
}

export function pyRepr(val: any): string {
  if (typeof val === 'string') {
    return `'${val.replace(/'/g, "\\'")}'`;
  }
  return pyToString(val);
}

export function pyTruthy(val: any): boolean {
  if (val === null || val === undefined || val === false) return false;
  if (val === 0 || val === '') return false;
  if (Array.isArray(val)) return val.length > 0;
  if (typeof val === 'object') {
    return Object.keys(val).filter((k) => !k.startsWith('__')).length > 0;
  }
  return true;
}

export function pyEquals(a: any, b: any): boolean {
  if (a === b) return true;
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    return a.every((v, idx) => pyEquals(v, b[idx]));
  }
  if (a && b && typeof a === 'object' && typeof b === 'object' && !Array.isArray(a) && !Array.isArray(b)) {
    const keysA = Object.keys(a).filter((k) => !k.startsWith('__'));
    const keysB = Object.keys(b).filter((k) => !k.startsWith('__'));
    if (keysA.length !== keysB.length) return false;
    return keysA.every((k) => pyEquals(a[k], b[k]));
  }
  return false;
}

/**
 * Execute Python 3 code using the deterministic in-browser AST interpreter.
 */
export function executePython3Sync(
  source: string,
  optionsOrInputs: ExecutionOptions | string[] = {}
): PythonExecutionResult {
  const options: ExecutionOptions = Array.isArray(optionsOrInputs)
    ? { inputs: optionsOrInputs }
    : optionsOrInputs;
  const startTime = performance.now();
  const maxSteps = options.maxSteps ?? 25000;
  const inputQueue = [...(options.inputs ?? [])];
  let inputCursor = 0;

  let stdout = '';
  const inputLog: { prompt: string; value: string }[] = [];
  const traceSteps: TraceStep[] = [];
  let stepsExecuted = 0;

  // Deterministic PRNG if seed provided, otherwise Math.random
  let useSeed = options.seed !== undefined;
  let rngState = options.seed ?? (Date.now() % 2147483647);
  const nextRand = (): number => {
    if (useSeed) {
      rngState = (rngState * 16807) % 2147483647;
      return (rngState - 1) / 2147483646;
    }
    return Math.random();
  };

  const globalEnv: Record<string, any> = {};

  const randomModule = {
    __module: 'random',
    seed: (s?: number) => {
      useSeed = true;
      rngState = Math.max(1, Math.abs(Math.floor(Number(s ?? 1))) % 2147483647);
      return null;
    },
    randint: (a: number, b: number) => {
      const min = Math.ceil(Number(a));
      const max = Math.floor(Number(b));
      return Math.floor(nextRand() * (max - min + 1)) + min;
    },
    choice: (seq: any[]) => {
      if (!seq || seq.length === 0) {
        throw new Error('Cannot choose from an empty sequence');
      }
      const idx = Math.floor(nextRand() * seq.length);
      return seq[idx];
    },
    random: () => nextRand(),
    shuffle: (seq: any[]) => {
      if (Array.isArray(seq)) {
        for (let i = seq.length - 1; i > 0; i--) {
          const j = Math.floor(nextRand() * (i + 1));
          [seq[i], seq[j]] = [seq[j], seq[i]];
        }
      }
      return null;
    },
  };

  const mathModule = {
    __module: 'math',
    pi: Math.PI,
    e: Math.E,
    sqrt: (x: number) => Math.sqrt(Number(x)),
    ceil: (x: number) => Math.ceil(Number(x)),
    floor: (x: number) => Math.floor(Number(x)),
    pow: (x: number, y: number) => Math.pow(Number(x), Number(y)),
    fabs: (x: number) => Math.abs(Number(x)),
    factorial: (n: number) => {
      let r = 1;
      for (let i = 2; i <= n; i++) r *= i;
      return r;
    },
    gcd: (a: number, b: number) => {
      let x = Math.abs(Math.trunc(a));
      let y = Math.abs(Math.trunc(b));
      while (y) {
        const t = y;
        y = x % y;
        x = t;
      }
      return x;
    },
  };

  function recordTrace(lineNo: number, codeLine: string, env: Record<string, any>) {
    stepsExecuted++;
    if (stepsExecuted > maxSteps) {
      throw new PythonRuntimeError(
        'TimeoutError',
        `Program exceeded ${maxSteps} steps on line ${lineNo}. Check for an infinite while loop or missing counter update!`,
        lineNo
      );
    }
    if (traceSteps.length < 300) {
      const varsSnapshot: Record<string, string> = {};
      const merged = { ...globalEnv, ...env };
      for (const [k, v] of Object.entries(merged)) {
        if (v && (v.__pyFunc || v.__module)) continue;
        varsSnapshot[k] = pyRepr(v);
      }
      traceSteps.push({
        stepNumber: traceSteps.length + 1,
        line: lineNo,
        codeLine,
        variables: varsSnapshot,
        stdoutSoFar: stdout,
      });
    }
  }

  function lookupVar(name: string, localEnv: Record<string, any>, lineNo: number): any {
    if (name in localEnv) return localEnv[name];
    if (name in globalEnv) return globalEnv[name];
    throw new PythonRuntimeError('NameError', `name '${name}' is not defined`, lineNo);
  }

  function assignVar(name: string, val: any, localEnv: Record<string, any>, globalsSet: Set<string>) {
    if (globalsSet.has(name) || localEnv === globalEnv) {
      globalEnv[name] = val;
    } else {
      localEnv[name] = val;
    }
  }

  function evalExpr(rawExpr: string, localEnv: Record<string, any>, lineNo: number): any {
    const expr = rawExpr.trim();
    if (!expr) return null;

    // Strip outer redundant parentheses if balanced across the entire expression
    if (expr.startsWith('(') && expr.endsWith(')')) {
      let depth = 0;
      let balancedOuter = true;
      let inS = false;
      let inD = false;
      let esc = false;
      for (let i = 0; i < expr.length; i++) {
        const ch = expr[i];
        if (esc) {
          esc = false;
          continue;
        }
        if (ch === '\\') {
          esc = true;
          continue;
        }
        if (ch === "'" && !inD) inS = !inS;
        else if (ch === '"' && !inS) inD = !inD;
        else if (!inS && !inD) {
          if (ch === '(') depth++;
          else if (ch === ')') depth--;
          if (depth === 0 && i < expr.length - 1) {
            balancedOuter = false;
            break;
          }
        }
      }
      if (balancedOuter) {
        const inner = expr.slice(1, -1).trim();
        // Check if it's a tuple literal like (1, 2)
        const topComma = splitTopLevel(inner, ',');
        if (topComma.length > 1) {
          const arr = topComma.filter((s) => s.trim() !== '').map((s) => evalExpr(s, localEnv, lineNo));
          (arr as any).__isTuple = true;
          return arr;
        }
        return evalExpr(inner, localEnv, lineNo);
      }
    }

    // 1. Ternary expression: X if COND else Y
    const ternaryMatch = splitTernary(expr);
    if (ternaryMatch) {
      const condVal = evalExpr(ternaryMatch.cond, localEnv, lineNo);
      return pyTruthy(condVal)
        ? evalExpr(ternaryMatch.ifTrue, localEnv, lineNo)
        : evalExpr(ternaryMatch.ifFalse, localEnv, lineNo);
    }

    // 2. Boolean 'or'
    const orParts = splitByWordOp(expr, 'or');
    if (orParts.length > 1) {
      let lastVal: any = false;
      for (const p of orParts) {
        lastVal = evalExpr(p, localEnv, lineNo);
        if (pyTruthy(lastVal)) return lastVal;
      }
      return lastVal;
    }

    // 3. Boolean 'and'
    const andParts = splitByWordOp(expr, 'and');
    if (andParts.length > 1) {
      let lastVal: any = true;
      for (const p of andParts) {
        lastVal = evalExpr(p, localEnv, lineNo);
        if (!pyTruthy(lastVal)) return lastVal;
      }
      return lastVal;
    }

    // 4. Unary 'not'
    if (/^not\b\s*(.+)$/.test(expr)) {
      const m = expr.match(/^not\b\s*(.+)$/)!;
      return !pyTruthy(evalExpr(m[1], localEnv, lineNo));
    }

    // 5. Comparisons (including chained like 0 <= x < 10, in, not in)
    const compChain = splitComparisons(expr);
    if (compChain.ops.length > 0) {
      const vals = compChain.operands.map((o) => evalExpr(o, localEnv, lineNo));
      for (let i = 0; i < compChain.ops.length; i++) {
        const left = vals[i];
        const right = vals[i + 1];
        const op = compChain.ops[i];
        let ok = false;
        if (op === '==') ok = pyEquals(left, right);
        else if (op === '!=') ok = !pyEquals(left, right);
        else if (op === '<') ok = left < right;
        else if (op === '>') ok = left > right;
        else if (op === '<=') ok = left <= right;
        else if (op === '>=') ok = left >= right;
        else if (op === 'in') ok = evalIn(left, right, lineNo);
        else if (op === 'not in') ok = !evalIn(left, right, lineNo);
        else if (op === 'is') ok = left === right;
        else if (op === 'is not') ok = left !== right;
        if (!ok) return false;
      }
      return true;
    }

    // 6. Addition / Subtraction (+, -) at top level (left-to-right)
    const addSub = splitAddSub(expr);
    if (addSub.ops.length > 0) {
      let acc = evalExpr(addSub.terms[0], localEnv, lineNo);
      for (let i = 0; i < addSub.ops.length; i++) {
        const rhs = evalExpr(addSub.terms[i + 1], localEnv, lineNo);
        const op = addSub.ops[i];
        if (op === '+') {
          if (Array.isArray(acc) && Array.isArray(rhs)) {
            acc = [...acc, ...rhs];
          } else if (typeof acc === 'string' && typeof rhs === 'string') {
            acc = acc + rhs;
          } else if (typeof acc === 'number' && typeof rhs === 'number') {
            acc = acc + rhs;
          } else if (typeof acc === 'boolean' || typeof rhs === 'boolean') {
            acc = Number(acc) + Number(rhs);
          } else {
            throw new PythonRuntimeError(
              'TypeError',
              `Cannot concatenate or add ${typeof acc} and ${typeof rhs} (use str() or int() to convert types first)`,
              lineNo
            );
          }
        } else {
          if (typeof acc !== 'number' || typeof rhs !== 'number') {
            throw new PythonRuntimeError('TypeError', `Unsupported operand types for -: '${typeof acc}' and '${typeof rhs}'`, lineNo);
          }
          acc = acc - rhs;
        }
      }
      return acc;
    }

    // 7. Multiplication / Division / Floor Div / Modulo (*, /, //, %)
    const mulDiv = splitMulDiv(expr);
    if (mulDiv.ops.length > 0) {
      let acc = evalExpr(mulDiv.terms[0], localEnv, lineNo);
      for (let i = 0; i < mulDiv.ops.length; i++) {
        const rhs = evalExpr(mulDiv.terms[i + 1], localEnv, lineNo);
        const op = mulDiv.ops[i];
        if (op === '*') {
          if (typeof acc === 'string' && typeof rhs === 'number') {
            acc = rhs > 0 ? acc.repeat(Math.floor(rhs)) : '';
          } else if (typeof acc === 'number' && typeof rhs === 'string') {
            acc = acc > 0 ? rhs.repeat(Math.floor(acc)) : '';
          } else if (Array.isArray(acc) && typeof rhs === 'number') {
            const out: any[] = [];
            for (let k = 0; k < Math.floor(rhs); k++) out.push(...acc);
            acc = out;
          } else if (typeof acc === 'number' && typeof rhs === 'number') {
            acc = acc * rhs;
          } else {
            throw new PythonRuntimeError('TypeError', `Cannot multiply ${typeof acc} and ${typeof rhs}`, lineNo);
          }
        } else if (op === '/') {
          if (rhs === 0) throw new PythonRuntimeError('ZeroDivisionError', 'division by zero', lineNo);
          acc = Number(acc) / Number(rhs);
        } else if (op === '//') {
          if (rhs === 0) throw new PythonRuntimeError('ZeroDivisionError', 'integer division or modulo by zero', lineNo);
          acc = Math.floor(Number(acc) / Number(rhs));
        } else if (op === '%') {
          if (rhs === 0) throw new PythonRuntimeError('ZeroDivisionError', 'integer division or modulo by zero', lineNo);
          const n = Number(acc);
          const d = Number(rhs);
          acc = ((n % d) + d) % d;
        }
      }
      return acc;
    }

    // 8. Unary + or -
    if (expr.startsWith('-') && expr.length > 1) {
      return -Number(evalExpr(expr.slice(1), localEnv, lineNo));
    }
    if (expr.startsWith('+') && expr.length > 1) {
      return +Number(evalExpr(expr.slice(1), localEnv, lineNo));
    }

    // 9. Exponentiation ** (right-associative)
    const powIdx = findTopLevelOp(expr, '**');
    if (powIdx !== -1) {
      const base = evalExpr(expr.slice(0, powIdx), localEnv, lineNo);
      const exp = evalExpr(expr.slice(powIdx + 2), localEnv, lineNo);
      return Math.pow(Number(base), Number(exp));
    }

    // 10. Postfix operations: function calls, method calls, attribute access, indexing/slicing
    const postfix = parsePostfix(expr);
    if (postfix) {
      return evalPostfix(postfix, localEnv, lineNo);
    }

    // 11. Literals: booleans, None, numbers, strings, f-strings, lists, dicts
    if (expr === 'True') return true;
    if (expr === 'False') return false;
    if (expr === 'None') return null;

    if (/^-?\d+$/.test(expr)) return parseInt(expr, 10);
    if (/^-?\d+\.\d+$/.test(expr)) return parseFloat(expr);

    // f-string: f"..." or f'...'
    if ((expr.startsWith('f"') && expr.endsWith('"')) || (expr.startsWith("f'") && expr.endsWith("'"))) {
      const inner = expr.slice(2, -1);
      return evalFString(inner, localEnv, lineNo);
    }

    // String literal
    if ((expr.startsWith('"') && expr.endsWith('"')) || (expr.startsWith("'") && expr.endsWith("'"))) {
      return unescapePyString(expr.slice(1, -1));
    }

    // List literal or list comprehension [...]
    if (expr.startsWith('[') && expr.endsWith(']')) {
      const inner = expr.slice(1, -1).trim();
      if (!inner) return [];
      // Check list comprehension: [itemExpr for var in iterExpr (if condExpr)]
      const compMatch = inner.match(/^(.+?)\s+for\s+([A-Za-z_][A-Za-z0-9_]*)\s+in\s+(.+)$/);
      if (compMatch && splitTopLevel(inner, ',').length === 1) {
        const itemExpr = compMatch[1].trim();
        const varName = compMatch[2].trim();
        const rest = compMatch[3].trim();
        let iterStr = rest;
        let condStr: string | null = null;
        const ifParts = splitByWordOp(rest, 'if');
        if (ifParts.length === 2) {
          iterStr = ifParts[0].trim();
          condStr = ifParts[1].trim();
        }
        const iterable = toIterable(evalExpr(iterStr, localEnv, lineNo), lineNo);
        const out: any[] = [];
        for (const item of iterable) {
          const subEnv = { ...localEnv, [varName]: item };
          if (condStr === null || pyTruthy(evalExpr(condStr, subEnv, lineNo))) {
            out.push(evalExpr(itemExpr, subEnv, lineNo));
          }
        }
        return out;
      }
      return splitTopLevel(inner, ',')
        .filter((s) => s.trim() !== '')
        .map((s) => evalExpr(s, localEnv, lineNo));
    }

    // Dict literal {...}
    if (expr.startsWith('{') && expr.endsWith('}')) {
      const inner = expr.slice(1, -1).trim();
      if (!inner) return {};
      const entries = splitTopLevel(inner, ',').filter((s) => s.trim() !== '');
      const obj: Record<string, any> = {};
      for (const entry of entries) {
        const colonIdx = findTopLevelOp(entry, ':');
        if (colonIdx === -1) {
          throw new PythonRuntimeError('SyntaxError', `Invalid dictionary entry '${entry}'`, lineNo);
        }
        const k = evalExpr(entry.slice(0, colonIdx), localEnv, lineNo);
        const v = evalExpr(entry.slice(colonIdx + 1), localEnv, lineNo);
        obj[String(k)] = v;
      }
      return obj;
    }

    // Top-level comma tuple without parens: e.g. a, b
    const tupleParts = splitTopLevel(expr, ',');
    if (tupleParts.length > 1) {
      const arr = tupleParts.map((p) => evalExpr(p, localEnv, lineNo));
      (arr as any).__isTuple = true;
      return arr;
    }

    // Identifier
    if (/^[A-Za-z_][A-Za-z0-9_]*$/.test(expr)) {
      return lookupVar(expr, localEnv, lineNo);
    }

    throw new PythonRuntimeError('SyntaxError', `Invalid expression: '${expr}'`, lineNo);
  }

  function evalIn(item: any, container: any, lineNo: number): boolean {
    if (typeof container === 'string') {
      return container.includes(String(item));
    }
    if (Array.isArray(container)) {
      return container.some((el) => pyEquals(el, item));
    }
    if (container && typeof container === 'object') {
      return String(item) in container;
    }
    throw new PythonRuntimeError('TypeError', `argument of type '${typeof container}' is not iterable`, lineNo);
  }

  function unescapePyString(s: string): string {
    return s
      .replace(/\\n/g, '\n')
      .replace(/\\t/g, '\t')
      .replace(/\\'/g, "'")
      .replace(/\\"/g, '"')
      .replace(/\\\\/g, '\\');
  }

  function evalFString(inner: string, localEnv: Record<string, any>, lineNo: number): string {
    let out = '';
    let i = 0;
    while (i < inner.length) {
      if (inner[i] === '{') {
        if (inner[i + 1] === '{') {
          out += '{';
          i += 2;
          continue;
        }
        let depth = 1;
        let j = i + 1;
        while (j < inner.length && depth > 0) {
          if (inner[j] === '{') depth++;
          else if (inner[j] === '}') depth--;
          j++;
        }
        const rawSub = inner.slice(i + 1, j - 1);
        const colonIdx = findTopLevelOp(rawSub, ':');
        if (colonIdx !== -1) {
          const val = evalExpr(rawSub.slice(0, colonIdx), localEnv, lineNo);
          const fmt = rawSub.slice(colonIdx + 1).trim();
          const floatMatch = fmt.match(/^\.(\d+)f$/);
          if (floatMatch && typeof val === 'number') {
            out += val.toFixed(parseInt(floatMatch[1], 10));
          } else {
            out += pyToString(val);
          }
        } else {
          const val = evalExpr(rawSub, localEnv, lineNo);
          out += pyToString(val);
        }
        i = j;
      } else if (inner[i] === '}' && inner[i + 1] === '}') {
        out += '}';
        i += 2;
      } else {
        out += inner[i];
        i++;
      }
    }
    return unescapePyString(out);
  }

  function evalCall(fnName: string, argsRaw: string, localEnv: Record<string, any>, lineNo: number): any {
    const rawParts = argsRaw.trim() === '' ? [] : splitTopLevel(argsRaw, ',').filter((p) => p.trim() !== '');
    const posArgs: any[] = [];
    const kwArgs: Record<string, any> = {};

    for (const part of rawParts) {
      const eqIdx = findTopLevelOp(part, '=');
      if (eqIdx !== -1) {
        const k = part.slice(0, eqIdx).trim();
        const v = evalExpr(part.slice(eqIdx + 1), localEnv, lineNo);
        kwArgs[k] = v;
      } else {
        posArgs.push(evalExpr(part, localEnv, lineNo));
      }
    }

    // Built-in functions
    switch (fnName) {
      case 'print': {
        const sep = kwArgs.sep !== undefined ? String(kwArgs.sep) : ' ';
        const end = kwArgs.end !== undefined ? String(kwArgs.end) : '\n';
        const lineStr = posArgs.map((a) => pyToString(a)).join(sep);
        stdout += lineStr + end;
        return null;
      }
      case 'input': {
        const prompt = posArgs.length > 0 ? pyToString(posArgs[0]) : '';
        const val = inputCursor < inputQueue.length ? String(inputQueue[inputCursor++]) : '';
        inputLog.push({ prompt, value: val });
        return val;
      }
      case 'int': {
        if (posArgs.length === 0) return 0;
        const v = posArgs[0];
        if (typeof v === 'boolean') return v ? 1 : 0;
        if (typeof v === 'number') return Math.trunc(v);
        const s = String(v).trim();
        if (!/^[+-]?\d+$/.test(s)) {
          throw new PythonRuntimeError('ValueError', `invalid literal for int() with base 10: '${v}'`, lineNo);
        }
        return parseInt(s, 10);
      }
      case 'float': {
        if (posArgs.length === 0) return 0.0;
        const v = posArgs[0];
        if (typeof v === 'boolean') return v ? 1.0 : 0.0;
        if (typeof v === 'number') return v;
        const s = String(v).trim();
        const parsed = Number(s);
        if (s === '' || Number.isNaN(parsed)) {
          throw new PythonRuntimeError('ValueError', `could not convert string to float: '${v}'`, lineNo);
        }
        return parsed;
      }
      case 'str': {
        if (posArgs.length === 0) return '';
        return pyToString(posArgs[0]);
      }
      case 'bool': {
        if (posArgs.length === 0) return false;
        return pyTruthy(posArgs[0]);
      }
      case 'len': {
        if (posArgs.length !== 1) throw new PythonRuntimeError('TypeError', 'len() takes exactly one argument', lineNo);
        const v = posArgs[0];
        if (typeof v === 'string' || Array.isArray(v)) return v.length;
        if (v && typeof v === 'object') return Object.keys(v).filter((k) => !k.startsWith('__')).length;
        throw new PythonRuntimeError('TypeError', `object of type '${typeof v}' has no len()`, lineNo);
      }
      case 'type': {
        const v = posArgs[0];
        if (v === null || v === undefined) return "<class 'NoneType'>";
        if (typeof v === 'boolean') return "<class 'bool'>";
        if (typeof v === 'number') return Number.isInteger(v) ? "<class 'int'>" : "<class 'float'>";
        if (typeof v === 'string') return "<class 'str'>";
        if (Array.isArray(v)) return (v as any).__isTuple ? "<class 'tuple'>" : "<class 'list'>";
        return "<class 'dict'>";
      }
      case 'range': {
        let start = 0;
        let stop = 0;
        let step = 1;
        if (posArgs.length === 1) {
          stop = Number(posArgs[0]);
        } else if (posArgs.length === 2) {
          start = Number(posArgs[0]);
          stop = Number(posArgs[1]);
        } else if (posArgs.length === 3) {
          start = Number(posArgs[0]);
          stop = Number(posArgs[1]);
          step = Number(posArgs[2]);
          if (step === 0) throw new PythonRuntimeError('ValueError', 'range() arg 3 must not be zero', lineNo);
        } else {
          throw new PythonRuntimeError('TypeError', 'range() expected 1 to 3 arguments', lineNo);
        }
        const arr: number[] = [];
        if (step > 0) {
          for (let k = start; k < stop; k += step) arr.push(k);
        } else {
          for (let k = start; k > stop; k += step) arr.push(k);
        }
        return arr;
      }
      case 'abs':
        return Math.abs(Number(posArgs[0]));
      case 'round': {
        const n = Number(posArgs[0]);
        const digits = posArgs.length > 1 ? Number(posArgs[1]) : 0;
        const factor = Math.pow(10, digits);
        return Math.round(n * factor) / factor;
      }
      case 'min': {
        const items = posArgs.length === 1 && Array.isArray(posArgs[0]) ? posArgs[0] : posArgs;
        if (items.length === 0) throw new PythonRuntimeError('ValueError', 'min() arg is an empty sequence', lineNo);
        return items.reduce((a: any, b: any) => (a < b ? a : b));
      }
      case 'max': {
        const items = posArgs.length === 1 && Array.isArray(posArgs[0]) ? posArgs[0] : posArgs;
        if (items.length === 0) throw new PythonRuntimeError('ValueError', 'max() arg is an empty sequence', lineNo);
        return items.reduce((a: any, b: any) => (a > b ? a : b));
      }
      case 'sum': {
        const items = posArgs[0];
        const startVal = posArgs.length > 1 ? Number(posArgs[1]) : 0;
        if (!Array.isArray(items)) throw new PythonRuntimeError('TypeError', 'sum() expects an iterable', lineNo);
        return items.reduce((acc, v) => acc + Number(v), startVal);
      }
      case 'sorted': {
        const items = [...toIterable(posArgs[0], lineNo)];
        const rev = Boolean(kwArgs.reverse);
        items.sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
        if (rev) items.reverse();
        return items;
      }
      case 'reversed': {
        return [...toIterable(posArgs[0], lineNo)].reverse();
      }
      case 'list': {
        if (posArgs.length === 0) return [];
        return [...toIterable(posArgs[0], lineNo)];
      }
      case 'dict': {
        if (posArgs.length === 0) return { ...kwArgs };
        return { ...posArgs[0] };
      }
      case 'enumerate': {
        const items = toIterable(posArgs[0], lineNo);
        const startIdx = posArgs.length > 1 ? Number(posArgs[1]) : 0;
        return items.map((val, idx) => {
          const pair = [startIdx + idx, val];
          (pair as any).__isTuple = true;
          return pair;
        });
      }
      case 'zip': {
        const lists = posArgs.map((a) => toIterable(a, lineNo));
        if (lists.length === 0) return [];
        const minLen = Math.min(...lists.map((l) => l.length));
        const out: any[] = [];
        for (let i = 0; i < minLen; i++) {
          const tup = lists.map((l) => l[i]);
          (tup as any).__isTuple = true;
          out.push(tup);
        }
        return out;
      }
      case 'ord':
        return String(posArgs[0]).charCodeAt(0);
      case 'chr':
        return String.fromCharCode(Number(posArgs[0]));
      case 'isinstance': {
        const val = posArgs[0];
        const t = posArgs[1];
        if (t === 'int') return typeof val === 'number' && Number.isInteger(val);
        if (t === 'float') return typeof val === 'number';
        if (t === 'str') return typeof val === 'string';
        if (t === 'list') return Array.isArray(val);
        if (t === 'dict') return val && typeof val === 'object' && !Array.isArray(val);
        return false;
      }
    }

    // User-defined function or imported function
    const fnObj = lookupVar(fnName, localEnv, lineNo);
    if (typeof fnObj === 'function') {
      try {
        return fnObj(...posArgs);
      } catch (err: any) {
        throw new PythonRuntimeError('ValueError', err.message || String(err), lineNo);
      }
    }
    if (fnObj && fnObj.__pyFunc) {
      return invokePyFunc(fnObj, posArgs, kwArgs, localEnv, lineNo);
    }

    throw new PythonRuntimeError('TypeError', `'${fnName}' is not callable`, lineNo);
  }

  function invokePyFunc(
    fn: PyFunction,
    posArgs: any[],
    kwArgs: Record<string, any>,
    callerEnv: Record<string, any>,
    callLine: number
  ): any {
    const fnEnv: Record<string, any> = {};
    const globalsSet = new Set<string>();

    for (let i = 0; i < fn.params.length; i++) {
      const p = fn.params[i];
      if (i < posArgs.length) {
        fnEnv[p.name] = posArgs[i];
      } else if (p.name in kwArgs) {
        fnEnv[p.name] = kwArgs[p.name];
      } else if (p.defaultExpr !== undefined) {
        fnEnv[p.name] = evalExpr(p.defaultExpr, callerEnv, callLine);
      } else {
        throw new PythonRuntimeError(
          'TypeError',
          `${fn.name}() missing required positional argument: '${p.name}'`,
          callLine
        );
      }
    }

    try {
      execBlock(fn.body, fnEnv, globalsSet);
    } catch (sig) {
      if (sig instanceof ReturnSignal) {
        return sig.value;
      }
      throw sig;
    }
    return null;
  }

  function evalPostfix(
    parsed: { base: string; ops: ({ type: 'call'; args: string } | { type: 'index'; expr: string } | { type: 'attr'; name: string })[] },
    localEnv: Record<string, any>,
    lineNo: number
  ): any {
    let current: any;
    let startIdx = 0;

    if (parsed.ops.length >= 1 && parsed.ops[0].type === 'call' && /^[A-Za-z_][A-Za-z0-9_]*$/.test(parsed.base)) {
      current = evalCall(parsed.base, parsed.ops[0].args, localEnv, lineNo);
      startIdx = 1;
    } else {
      current = evalExpr(parsed.base, localEnv, lineNo);
    }

    for (let i = startIdx; i < parsed.ops.length; i++) {
      const op = parsed.ops[i];
      if (op.type === 'index') {
        current = evalIndexOrSlice(current, op.expr, localEnv, lineNo);
      } else if (op.type === 'attr') {
        const nextOp = parsed.ops[i + 1];
        if (nextOp && nextOp.type === 'call') {
          current = evalMethodCall(current, op.name, nextOp.args, localEnv, lineNo);
          i++; // skip the call op
        } else {
          if (current && typeof current === 'object' && op.name in current) {
            current = current[op.name];
          } else {
            throw new PythonRuntimeError('AttributeError', `object has no attribute '${op.name}'`, lineNo);
          }
        }
      } else if (op.type === 'call') {
        if (typeof current === 'function') {
          const args = op.args.trim() === '' ? [] : splitTopLevel(op.args, ',').map((a) => evalExpr(a, localEnv, lineNo));
          current = current(...args);
        } else if (current && current.__pyFunc) {
          const args = op.args.trim() === '' ? [] : splitTopLevel(op.args, ',').map((a) => evalExpr(a, localEnv, lineNo));
          current = invokePyFunc(current, args, {}, localEnv, lineNo);
        } else {
          throw new PythonRuntimeError('TypeError', 'object is not callable', lineNo);
        }
      }
    }

    return current;
  }

  function evalIndexOrSlice(target: any, indexExpr: string, localEnv: Record<string, any>, lineNo: number): any {
    const colonParts = splitTopLevel(indexExpr, ':');
    if (colonParts.length > 1) {
      // Slicing!
      if (typeof target !== 'string' && !Array.isArray(target)) {
        throw new PythonRuntimeError('TypeError', 'Only strings and lists support slicing', lineNo);
      }
      const len = target.length;
      const step = colonParts.length >= 3 && colonParts[2].trim() !== '' ? Number(evalExpr(colonParts[2], localEnv, lineNo)) : 1;
      if (step === 0) throw new PythonRuntimeError('ValueError', 'slice step cannot be zero', lineNo);

      let start: number;
      let stop: number;

      if (step > 0) {
        start = colonParts[0].trim() !== '' ? Number(evalExpr(colonParts[0], localEnv, lineNo)) : 0;
        stop = colonParts[1].trim() !== '' ? Number(evalExpr(colonParts[1], localEnv, lineNo)) : len;
        if (start < 0) start = Math.max(0, len + start);
        else start = Math.min(len, start);
        if (stop < 0) stop = Math.max(0, len + stop);
        else stop = Math.min(len, stop);

        const items: any[] = [];
        for (let k = start; k < stop; k += step) {
          items.push(target[k]);
        }
        return typeof target === 'string' ? items.join('') : items;
      } else {
        start = colonParts[0].trim() !== '' ? Number(evalExpr(colonParts[0], localEnv, lineNo)) : len - 1;
        stop = colonParts[1].trim() !== '' ? Number(evalExpr(colonParts[1], localEnv, lineNo)) : -len - 1;
        if (start < 0) start = len + start;
        if (start >= len) start = len - 1;
        if (colonParts[1].trim() !== '' && stop < 0) stop = len + stop;

        const items: any[] = [];
        for (let k = start; k > stop; k += step) {
          if (k >= 0 && k < len) items.push(target[k]);
        }
        return typeof target === 'string' ? items.join('') : items;
      }
    }

    const idxVal = evalExpr(indexExpr, localEnv, lineNo);
    if (typeof target === 'string' || Array.isArray(target)) {
      let idx = Number(idxVal);
      if (idx < 0) idx = target.length + idx;
      if (idx < 0 || idx >= target.length) {
        throw new PythonRuntimeError('IndexError', `index ${idxVal} out of range (length ${target.length})`, lineNo);
      }
      return target[idx];
    }
    if (target && typeof target === 'object') {
      const key = String(idxVal);
      if (!(key in target)) {
        throw new PythonRuntimeError('KeyError', `'${key}' not found in dictionary`, lineNo);
      }
      return target[key];
    }
    throw new PythonRuntimeError('TypeError', `'${typeof target}' object is not subscriptable`, lineNo);
  }

  function evalMethodCall(target: any, method: string, argsRaw: string, localEnv: Record<string, any>, lineNo: number): any {
    const rawParts = argsRaw.trim() === '' ? [] : splitTopLevel(argsRaw, ',').filter((p) => p.trim() !== '');
    const args: any[] = [];
    const kwArgs: Record<string, any> = {};

    for (const part of rawParts) {
      const eqIdx = findTopLevelOp(part, '=');
      if (eqIdx !== -1) {
        kwArgs[part.slice(0, eqIdx).trim()] = evalExpr(part.slice(eqIdx + 1), localEnv, lineNo);
      } else {
        args.push(evalExpr(part, localEnv, lineNo));
      }
    }

    // Module methods (random, math)
    if (target && target.__module && typeof target[method] === 'function') {
      return target[method](...args);
    }

    // String methods
    if (typeof target === 'string') {
      switch (method) {
        case 'upper':
          return target.toUpperCase();
        case 'lower':
          return target.toLowerCase();
        case 'strip':
          return target.trim();
        case 'lstrip':
          return target.trimStart();
        case 'rstrip':
          return target.trimEnd();
        case 'title':
          return target.replace(/\b\w/g, (c) => c.toUpperCase());
        case 'capitalize':
          return target.length > 0 ? target[0].toUpperCase() + target.slice(1).toLowerCase() : '';
        case 'swapcase':
          return target
            .split('')
            .map((c) => (c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()))
            .join('');
        case 'replace':
          return target.split(String(args[0])).join(String(args[1] ?? ''));
        case 'find':
          return target.indexOf(String(args[0]));
        case 'index': {
          const idx = target.indexOf(String(args[0]));
          if (idx === -1) throw new PythonRuntimeError('ValueError', 'substring not found', lineNo);
          return idx;
        }
        case 'count': {
          const sub = String(args[0]);
          if (!sub) return target.length + 1;
          return target.split(sub).length - 1;
        }
        case 'split': {
          if (args.length === 0 || args[0] === null) {
            return target.trim() === '' ? [] : target.trim().split(/\s+/);
          }
          return target.split(String(args[0]));
        }
        case 'join': {
          const iter = toIterable(args[0], lineNo);
          return iter.map((x) => pyToString(x)).join(target);
        }
        case 'startswith':
          return target.startsWith(String(args[0]));
        case 'endswith':
          return target.endsWith(String(args[0]));
        case 'isdigit':
          return /^\d+$/.test(target);
        case 'isalpha':
          return /^[A-Za-z]+$/.test(target);
        case 'isalnum':
          return /^[A-Za-z0-9]+$/.test(target);
        case 'format': {
          let idx = 0;
          return target.replace(/\{(\w*)\}/g, (_, k) => {
            if (k === '') return pyToString(args[idx++]);
            if (/^\d+$/.test(k)) return pyToString(args[Number(k)]);
            return pyToString(kwArgs[k]);
          });
        }
        default:
          throw new PythonRuntimeError('AttributeError', `'str' object has no attribute '${method}'`, lineNo);
      }
    }

    // List methods
    if (Array.isArray(target)) {
      switch (method) {
        case 'append':
          target.push(args[0]);
          return null;
        case 'insert': {
          const idx = Math.max(0, Math.min(target.length, Number(args[0])));
          target.splice(idx, 0, args[1]);
          return null;
        }
        case 'remove': {
          const idx = target.findIndex((el) => pyEquals(el, args[0]));
          if (idx === -1) throw new PythonRuntimeError('ValueError', `list.remove(x): '${args[0]}' not in list`, lineNo);
          target.splice(idx, 1);
          return null;
        }
        case 'pop': {
          if (target.length === 0) throw new PythonRuntimeError('IndexError', 'pop from empty list', lineNo);
          if (args.length === 0) return target.pop();
          let idx = Number(args[0]);
          if (idx < 0) idx = target.length + idx;
          if (idx < 0 || idx >= target.length) throw new PythonRuntimeError('IndexError', 'pop index out of range', lineNo);
          return target.splice(idx, 1)[0];
        }
        case 'sort': {
          target.sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
          if (kwArgs.reverse) target.reverse();
          return null;
        }
        case 'reverse':
          target.reverse();
          return null;
        case 'index': {
          const idx = target.findIndex((el) => pyEquals(el, args[0]));
          if (idx === -1) throw new PythonRuntimeError('ValueError', `'${args[0]}' is not in list`, lineNo);
          return idx;
        }
        case 'count':
          return target.filter((el) => pyEquals(el, args[0])).length;
        case 'clear':
          target.length = 0;
          return null;
        case 'copy':
          return [...target];
        case 'extend': {
          const iter = toIterable(args[0], lineNo);
          target.push(...iter);
          return null;
        }
        default:
          throw new PythonRuntimeError('AttributeError', `'list' object has no attribute '${method}'`, lineNo);
      }
    }

    // Dict methods
    if (target && typeof target === 'object') {
      switch (method) {
        case 'get': {
          const k = String(args[0]);
          return k in target ? target[k] : args.length > 1 ? args[1] : null;
        }
        case 'keys':
          return Object.keys(target).filter((k) => !k.startsWith('__'));
        case 'values':
          return Object.entries(target)
            .filter(([k]) => !k.startsWith('__'))
            .map(([, v]) => v);
        case 'items':
          return Object.entries(target)
            .filter(([k]) => !k.startsWith('__'))
            .map(([k, v]) => {
              const pair = [k, v];
              (pair as any).__isTuple = true;
              return pair;
            });
        case 'pop': {
          const k = String(args[0]);
          if (k in target) {
            const val = target[k];
            delete target[k];
            return val;
          }
          if (args.length > 1) return args[1];
          throw new PythonRuntimeError('KeyError', `'${k}'`, lineNo);
        }
        case 'update': {
          if (args[0] && typeof args[0] === 'object') {
            Object.assign(target, args[0]);
          }
          return null;
        }
        case 'clear': {
          for (const k of Object.keys(target)) {
            if (!k.startsWith('__')) delete target[k];
          }
          return null;
        }
        default:
          throw new PythonRuntimeError('AttributeError', `'dict' object has no attribute '${method}'`, lineNo);
      }
    }

    throw new PythonRuntimeError('AttributeError', `Cannot call method '${method}' on ${typeof target}`, lineNo);
  }

  function toIterable(val: any, lineNo: number): any[] {
    if (Array.isArray(val)) return val;
    if (typeof val === 'string') return val.split('');
    if (val && typeof val === 'object') return Object.keys(val).filter((k) => !k.startsWith('__'));
    throw new PythonRuntimeError('TypeError', `'${typeof val}' object is not iterable`, lineNo);
  }

  function assignTarget(targetStr: string, val: any, localEnv: Record<string, any>, globalsSet: Set<string>, lineNo: number) {
    const parts = splitTopLevel(targetStr, ',');
    if (parts.length > 1) {
      const iter = toIterable(val, lineNo);
      if (iter.length !== parts.length) {
        throw new PythonRuntimeError('ValueError', `Cannot unpack ${iter.length} values into ${parts.length} variables`, lineNo);
      }
      for (let i = 0; i < parts.length; i++) {
        assignTarget(parts[i].trim(), iter[i], localEnv, globalsSet, lineNo);
      }
      return;
    }

    const t = targetStr.trim();
    // Subscript assignment: e.g. lst[0] = x or maze[r][c] = 'P'
    const pf = parsePostfix(t);
    if (pf && pf.ops.length > 0 && pf.ops[pf.ops.length - 1].type === 'index') {
      const lastOp = pf.ops[pf.ops.length - 1] as { type: 'index'; expr: string };
      const containerPf = { base: pf.base, ops: pf.ops.slice(0, -1) };
      const container = containerPf.ops.length === 0 ? evalExpr(pf.base, localEnv, lineNo) : evalPostfix(containerPf, localEnv, lineNo);
      const keyVal = evalExpr(lastOp.expr, localEnv, lineNo);

      if (Array.isArray(container)) {
        let idx = Number(keyVal);
        if (idx < 0) idx = container.length + idx;
        if (idx < 0 || idx >= container.length) {
          throw new PythonRuntimeError('IndexError', 'list assignment index out of range', lineNo);
        }
        container[idx] = val;
        return;
      }
      if (container && typeof container === 'object') {
        container[String(keyVal)] = val;
        return;
      }
      throw new PythonRuntimeError('TypeError', `'${typeof container}' object does not support item assignment`, lineNo);
    }

    if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(t)) {
      throw new PythonRuntimeError('SyntaxError', `Invalid variable name '${t}'`, lineNo);
    }
    assignVar(t, val, localEnv, globalsSet);
  }

  function execSimple(text: string, lineNo: number, localEnv: Record<string, any>, globalsSet: Set<string>) {
    recordTrace(lineNo, text, localEnv);

    if (text === 'pass') return;
    if (text === 'break') throw new BreakSignal();
    if (text === 'continue') throw new ContinueSignal();

    if (/^return(\s+.*)?$/.test(text)) {
      const m = text.match(/^return(?:\s+(.*))?$/)!;
      const val = m[1] ? evalExpr(m[1], localEnv, lineNo) : null;
      throw new ReturnSignal(val);
    }

    if (/^global\s+(.+)$/.test(text)) {
      const m = text.match(/^global\s+(.+)$/)!;
      const names = m[1].split(',').map((s) => s.trim());
      for (const n of names) globalsSet.add(n);
      return;
    }

    if (/^import\s+(.+)$/.test(text)) {
      const m = text.match(/^import\s+(.+)$/)!;
      const mods = m[1].split(',').map((s) => s.trim());
      for (const mod of mods) {
        if (mod === 'random') assignVar('random', randomModule, localEnv, globalsSet);
        else if (mod === 'math') assignVar('math', mathModule, localEnv, globalsSet);
        else assignVar(mod, { __module: mod }, localEnv, globalsSet);
      }
      return;
    }

    if (/^from\s+([A-Za-z_][A-Za-z0-9_]*)\s+import\s+(.+)$/.test(text)) {
      const m = text.match(/^from\s+([A-Za-z_][A-Za-z0-9_]*)\s+import\s+(.+)$/)!;
      const modName = m[1];
      const names = m[2].split(',').map((s) => s.trim());
      const modObj: any = modName === 'random' ? randomModule : modName === 'math' ? mathModule : {};
      for (const name of names) {
        if (name === '*') {
          for (const [k, v] of Object.entries(modObj)) {
            if (!k.startsWith('__')) assignVar(k, v, localEnv, globalsSet);
          }
        } else if (name in modObj) {
          assignVar(name, modObj[name], localEnv, globalsSet);
        }
      }
      return;
    }

    if (/^del\s+(.+)$/.test(text)) {
      const targetStr = text.slice(4).trim();
      const pf = parsePostfix(targetStr);
      if (pf && pf.ops.length > 0 && pf.ops[pf.ops.length - 1].type === 'index') {
        const lastOp = pf.ops[pf.ops.length - 1] as { type: 'index'; expr: string };
        const containerPf = { base: pf.base, ops: pf.ops.slice(0, -1) };
        const container = containerPf.ops.length === 0 ? evalExpr(pf.base, localEnv, lineNo) : evalPostfix(containerPf, localEnv, lineNo);
        const keyVal = evalExpr(lastOp.expr, localEnv, lineNo);
        if (Array.isArray(container)) {
          let idx = Number(keyVal);
          if (idx < 0) idx = container.length + idx;
          container.splice(idx, 1);
        } else if (container && typeof container === 'object') {
          delete container[String(keyVal)];
        }
      } else {
        delete localEnv[targetStr];
        delete globalEnv[targetStr];
      }
      return;
    }

    // Augmented assignment (+=, -=, *=, /=, //=)
    for (const augOp of ['+=', '-=', '*=', '//=', '/=']) {
      const idx = findTopLevelOp(text, augOp);
      if (idx !== -1) {
        const lhs = text.slice(0, idx).trim();
        const rhsExpr = text.slice(idx + augOp.length).trim();
        const currentVal = evalExpr(lhs, localEnv, lineNo);
        const rhsVal = evalExpr(rhsExpr, localEnv, lineNo);
        let newVal: any;
        if (augOp === '+=') {
          if (Array.isArray(currentVal) && Array.isArray(rhsVal)) newVal = [...currentVal, ...rhsVal];
          else if (typeof currentVal === 'string') newVal = currentVal + String(rhsVal);
          else newVal = Number(currentVal) + Number(rhsVal);
        } else if (augOp === '-=') newVal = Number(currentVal) - Number(rhsVal);
        else if (augOp === '*=') {
          if (typeof currentVal === 'string') newVal = currentVal.repeat(Number(rhsVal));
          else newVal = Number(currentVal) * Number(rhsVal);
        } else if (augOp === '/=') newVal = Number(currentVal) / Number(rhsVal);
        else if (augOp === '//=') newVal = Math.floor(Number(currentVal) / Number(rhsVal));

        assignTarget(lhs, newVal, localEnv, globalsSet, lineNo);
        return;
      }
    }

    // Standard assignment (=)
    const eqIdx = findTopLevelOp(text, '=');
    if (eqIdx !== -1) {
      const lhs = text.slice(0, eqIdx).trim();
      const rhs = text.slice(eqIdx + 1).trim();
      const val = evalExpr(rhs, localEnv, lineNo);
      assignTarget(lhs, val, localEnv, globalsSet, lineNo);
      return;
    }

    // Standalone expression (e.g., print(), list.append(), function call)
    evalExpr(text, localEnv, lineNo);
  }

  function execBlock(nodes: BlockNode[], localEnv: Record<string, any>, globalsSet: Set<string>) {
    for (const node of nodes) {
      if (node.kind === 'simple') {
        execSimple(node.text, node.lineNo, localEnv, globalsSet);
      } else if (node.kind === 'if') {
        for (const branch of node.branches) {
          if (branch.cond === null) {
            recordTrace(branch.lineNo, 'else:', localEnv);
            execBlock(branch.body, localEnv, globalsSet);
            break;
          } else {
            recordTrace(branch.lineNo, `if/elif ${branch.cond}:`, localEnv);
            const condVal = evalExpr(branch.cond, localEnv, branch.lineNo);
            if (pyTruthy(condVal)) {
              execBlock(branch.body, localEnv, globalsSet);
              break;
            }
          }
        }
      } else if (node.kind === 'for') {
        recordTrace(node.lineNo, `for ${node.target} in ${node.iterExpr}:`, localEnv);
        const iterVal = evalExpr(node.iterExpr, localEnv, node.lineNo);
        const items = toIterable(iterVal, node.lineNo);
        for (const item of items) {
          assignTarget(node.target, item, localEnv, globalsSet, node.lineNo);
          try {
            execBlock(node.body, localEnv, globalsSet);
          } catch (sig) {
            if (sig instanceof BreakSignal) break;
            if (sig instanceof ContinueSignal) continue;
            throw sig;
          }
        }
      } else if (node.kind === 'while') {
        while (true) {
          recordTrace(node.lineNo, `while ${node.cond}:`, localEnv);
          const condVal = evalExpr(node.cond, localEnv, node.lineNo);
          if (!pyTruthy(condVal)) break;
          try {
            execBlock(node.body, localEnv, globalsSet);
          } catch (sig) {
            if (sig instanceof BreakSignal) break;
            if (sig instanceof ContinueSignal) continue;
            throw sig;
          }
        }
      } else if (node.kind === 'def') {
        recordTrace(node.lineNo, `def ${node.name}(...):`, localEnv);
        const fnObj: PyFunction = {
          __pyFunc: true,
          name: node.name,
          params: node.params,
          body: node.body,
          defLine: node.lineNo,
        };
        assignVar(node.name, fnObj, localEnv, globalsSet);
      } else if (node.kind === 'try') {
        try {
          execBlock(node.tryBody, localEnv, globalsSet);
        } catch (err: any) {
          if (err instanceof BreakSignal || err instanceof ContinueSignal || err instanceof ReturnSignal) {
            throw err;
          }
          const pyErrType = err instanceof PythonRuntimeError ? err.pyType : 'Exception';
          let handled = false;
          for (const h of node.handlers) {
            if (h.errorType === null || h.errorType === 'Exception' || h.errorType === pyErrType) {
              if (h.varName) {
                assignVar(h.varName, err.message, localEnv, globalsSet);
              }
              execBlock(h.body, localEnv, globalsSet);
              handled = true;
              break;
            }
          }
          if (!handled) throw err;
        } finally {
          if (node.finallyBody.length > 0) {
            execBlock(node.finallyBody, localEnv, globalsSet);
          }
        }
      }
    }
  }

  try {
    const stmtLines = preprocessSource(source);
    if (stmtLines.length > 0) {
      const topIndent = stmtLines[0].indent;
      if (topIndent !== 0) {
        throw new PythonRuntimeError('IndentationError', 'Unexpected indentation at start of program', stmtLines[0].lineNo);
      }
      const ast = parseBlock(stmtLines, 0, 0);
      execBlock(ast.nodes, globalEnv, new Set<string>());
    }
    return {
      stdout,
      stderr: '',
      status: 'success',
      durationMs: Math.round(performance.now() - startTime),
      inputLog,
      traceSteps,
      engine: 'python3-runtime',
    };
  } catch (err: any) {
    const isTimeout = err instanceof PythonRuntimeError && err.pyType === 'TimeoutError';
    return {
      stdout,
      stderr: err.message || String(err),
      status: isTimeout ? 'timeout' : 'error',
      durationMs: Math.round(performance.now() - startTime),
      inputLog,
      traceSteps,
      engine: 'python3-runtime',
    };
  }
}

function splitTernary(expr: string): { ifTrue: string; cond: string; ifFalse: string } | null {
  const ifParts = splitByWordOp(expr, 'if');
  if (ifParts.length < 2) return null;
  const ifTrue = ifParts[0];
  const rest = ifParts.slice(1).join(' if ');
  const elseParts = splitByWordOp(rest, 'else');
  if (elseParts.length < 2) return null;
  return {
    ifTrue: ifTrue.trim(),
    cond: elseParts[0].trim(),
    ifFalse: elseParts.slice(1).join(' else ').trim(),
  };
}

function splitByWordOp(expr: string, word: string): string[] {
  const parts: string[] = [];
  let current = '';
  let depth = 0;
  let inS = false;
  let inD = false;
  let esc = false;

  for (let i = 0; i < expr.length; i++) {
    const ch = expr[i];
    if (esc) {
      current += ch;
      esc = false;
      continue;
    }
    if (ch === '\\') {
      current += ch;
      esc = true;
      continue;
    }
    if (ch === "'" && !inD) {
      inS = !inS;
      current += ch;
      continue;
    }
    if (ch === '"' && !inS) {
      inD = !inD;
      current += ch;
      continue;
    }
    if (!inS && !inD) {
      if (ch === '(' || ch === '[' || ch === '{') depth++;
      else if (ch === ')' || ch === ']' || ch === '}') depth--;

      if (depth === 0) {
        const prevChar = i > 0 ? expr[i - 1] : ' ';
        const nextChar = i + word.length < expr.length ? expr[i + word.length] : ' ';
        if (
          /\s/.test(prevChar) &&
          /\s/.test(nextChar) &&
          expr.slice(i, i + word.length) === word
        ) {
          parts.push(current.trim());
          current = '';
          i += word.length;
          continue;
        }
      }
    }
    current += ch;
  }
  parts.push(current.trim());
  return parts;
}

function splitComparisons(expr: string): { operands: string[]; ops: string[] } {
  const operands: string[] = [];
  const ops: string[] = [];
  let current = '';
  let depth = 0;
  let inS = false;
  let inD = false;
  let esc = false;

  for (let i = 0; i < expr.length; i++) {
    const ch = expr[i];
    if (esc) {
      current += ch;
      esc = false;
      continue;
    }
    if (ch === '\\') {
      current += ch;
      esc = true;
      continue;
    }
    if (ch === "'" && !inD) {
      inS = !inS;
      current += ch;
      continue;
    }
    if (ch === '"' && !inS) {
      inD = !inD;
      current += ch;
      continue;
    }
    if (!inS && !inD) {
      if (ch === '(' || ch === '[' || ch === '{') depth++;
      else if (ch === ')' || ch === ']' || ch === '}') depth--;

      if (depth === 0) {
        // Check 'not in', 'is not', 'in', 'is'
        const rest = expr.slice(i);
        const wordMatch = rest.match(/^\s+(not\s+in|is\s+not|in|is)\s+/);
        if (wordMatch) {
          operands.push(current.trim());
          ops.push(wordMatch[1].replace(/\s+/g, ' '));
          current = '';
          i += wordMatch[0].length - 1;
          continue;
        }
        let matchedSym = false;
        for (const sym of ['==', '!=', '<=', '>=', '<', '>']) {
          if (expr.slice(i, i + sym.length) === sym) {
            operands.push(current.trim());
            ops.push(sym);
            current = '';
            i += sym.length - 1;
            matchedSym = true;
            break;
          }
        }
        if (matchedSym) continue;
      }
    }
    current += ch;
  }
  operands.push(current.trim());
  return { operands, ops };
}

function splitAddSub(expr: string): { terms: string[]; ops: ('+' | '-')[] } {
  const terms: string[] = [];
  const ops: ('+' | '-')[] = [];
  let current = '';
  let depth = 0;
  let inS = false;
  let inD = false;
  let esc = false;

  for (let i = 0; i < expr.length; i++) {
    const ch = expr[i];
    if (esc) {
      current += ch;
      esc = false;
      continue;
    }
    if (ch === '\\') {
      current += ch;
      esc = true;
      continue;
    }
    if (ch === "'" && !inD) {
      inS = !inS;
      current += ch;
      continue;
    }
    if (ch === '"' && !inS) {
      inD = !inD;
      current += ch;
      continue;
    }
    if (!inS && !inD) {
      if (ch === '(' || ch === '[' || ch === '{') depth++;
      else if (ch === ')' || ch === ']' || ch === '}') depth--;

      if (depth === 0 && (ch === '+' || ch === '-')) {
        const trimmedPrev = current.trim();
        // Unary if at start or preceded by another operator (*, /, %, //, **)
        if (trimmedPrev !== '' && !/[+\-*/%]$/.test(trimmedPrev)) {
          terms.push(trimmedPrev);
          ops.push(ch);
          current = '';
          continue;
        }
      }
    }
    current += ch;
  }
  terms.push(current.trim());
  return { terms, ops };
}

function splitMulDiv(expr: string): { terms: string[]; ops: ('*' | '/' | '//' | '%')[] } {
  const terms: string[] = [];
  const ops: ('*' | '/' | '//' | '%')[] = [];
  let current = '';
  let depth = 0;
  let inS = false;
  let inD = false;
  let esc = false;

  for (let i = 0; i < expr.length; i++) {
    const ch = expr[i];
    if (esc) {
      current += ch;
      esc = false;
      continue;
    }
    if (ch === '\\') {
      current += ch;
      esc = true;
      continue;
    }
    if (ch === "'" && !inD) {
      inS = !inS;
      current += ch;
      continue;
    }
    if (ch === '"' && !inS) {
      inD = !inD;
      current += ch;
      continue;
    }
    if (!inS && !inD) {
      if (ch === '(' || ch === '[' || ch === '{') depth++;
      else if (ch === ')' || ch === ']' || ch === '}') depth--;

      if (depth === 0) {
        if (expr.slice(i, i + 2) === '//') {
          terms.push(current.trim());
          ops.push('//');
          current = '';
          i++;
          continue;
        }
        if (expr.slice(i, i + 2) === '**') {
          current += '**';
          i++;
          continue;
        }
        if (ch === '*' || ch === '/' || ch === '%') {
          terms.push(current.trim());
          ops.push(ch);
          current = '';
          continue;
        }
      }
    }
    current += ch;
  }
  terms.push(current.trim());
  return { terms, ops };
}

function parsePostfix(
  expr: string
): { base: string; ops: ({ type: 'call'; args: string } | { type: 'index'; expr: string } | { type: 'attr'; name: string })[] } | null {
  const ops: ({ type: 'call'; args: string } | { type: 'index'; expr: string } | { type: 'attr'; name: string })[] = [];
  let i = 0;
  let depth = 0;
  let inS = false;
  let inD = false;
  let esc = false;
  let baseEnd = -1;

  for (; i < expr.length; i++) {
    const ch = expr[i];
    if (esc) {
      esc = false;
      continue;
    }
    if (ch === '\\') {
      esc = true;
      continue;
    }
    if (ch === "'" && !inD) inS = !inS;
    else if (ch === '"' && !inS) inD = !inD;
    else if (!inS && !inD) {
      if (depth === 0 && (ch === '(' || ch === '[' || (ch === '.' && i > 0 && !/^\d+$/.test(expr.slice(0, i))))) {
        if (i > 0) {
          baseEnd = i;
          break;
        }
      }
      if (ch === '(' || ch === '[' || ch === '{') depth++;
      else if (ch === ')' || ch === ']' || ch === '}') depth--;
    }
  }

  if (baseEnd === -1) return null;
  const base = expr.slice(0, baseEnd).trim();
  if (!base) return null;

  let cursor = baseEnd;
  while (cursor < expr.length) {
    const ch = expr[cursor];
    if (ch === '(' || ch === '[') {
      const closeCh = ch === '(' ? ')' : ']';
      let d = 1;
      let j = cursor + 1;
      let s = false;
      let db = false;
      let e = false;
      while (j < expr.length && d > 0) {
        const c = expr[j];
        if (e) e = false;
        else if (c === '\\') e = true;
        else if (c === "'" && !db) s = !s;
        else if (c === '"' && !s) db = !db;
        else if (!s && !db) {
          if (c === ch) d++;
          else if (c === closeCh) d--;
        }
        j++;
      }
      if (d !== 0) return null;
      const content = expr.slice(cursor + 1, j - 1);
      if (ch === '(') ops.push({ type: 'call', args: content });
      else ops.push({ type: 'index', expr: content });
      cursor = j;
    } else if (ch === '.') {
      const m = expr.slice(cursor + 1).match(/^([A-Za-z_][A-Za-z0-9_]*)/);
      if (!m) return null;
      ops.push({ type: 'attr', name: m[1] });
      cursor += 1 + m[1].length;
    } else if (/\s/.test(ch)) {
      cursor++;
    } else {
      return null;
    }
  }

  return ops.length > 0 ? { base, ops } : null;
}
