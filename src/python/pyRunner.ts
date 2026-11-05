import { executePython3Sync, PythonExecutionResult, ExecutionOptions } from './engine';

export type RuntimeStatus = 'loading' | 'ready-pyodide' | 'ready-engine';

let currentRuntimeStatus: RuntimeStatus = 'loading';
let pyodideWorker: Worker | null = null;
let pyodideReady = false;
const statusListeners = new Set<(status: RuntimeStatus) => void>();

function notifyStatus(status: RuntimeStatus) {
  currentRuntimeStatus = status;
  statusListeners.forEach((cb) => cb(status));
}

export function subscribeRuntimeStatus(cb: (status: RuntimeStatus) => void): () => void {
  cb(currentRuntimeStatus);
  statusListeners.add(cb);
  return () => statusListeners.delete(cb);
}

const WORKER_SOURCE = `
let pyodide = null;
let initPromise = null;

async function ensurePyodide() {
  if (pyodide) return pyodide;
  if (!initPromise) {
    initPromise = (async () => {
      importScripts('https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js');
      pyodide = await self.loadPyodide({
        indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/'
      });
      return pyodide;
    })();
  }
  return initPromise;
}

self.onmessage = async (event) => {
  const { type, id, code, inputs } = event.data;
  if (type === 'init') {
    try {
      await ensurePyodide();
      self.postMessage({ type: 'init-ok' });
    } catch (err) {
      self.postMessage({ type: 'init-fallback', error: String(err) });
    }
    return;
  }

  if (type === 'run') {
    const startTime = performance.now();
    try {
      const py = await ensurePyodide();
      let stdoutBuf = '';
      let stderrBuf = '';
      const inputQueue = Array.isArray(inputs) ? [...inputs] : [];
      const inputLog = [];
      let cursor = 0;

      py.setStdout({
        batched: (str) => {
          stdoutBuf += str + '\\n';
        }
      });
      py.setStderr({
        batched: (str) => {
          stderrBuf += str + '\\n';
        }
      });

      py.globals.set('__quest_input_fn', (promptText) => {
        const p = promptText ? String(promptText) : '';
        const val = cursor < inputQueue.length ? String(inputQueue[cursor++]) : '';
        inputLog.push({ prompt: p, value: val });
        return val;
      });

      await py.runPythonAsync(\`
import builtins
def _custom_input(prompt=""):
    return __quest_input_fn(prompt)
builtins.input = _custom_input
\`);

      await py.runPythonAsync(code);

      self.postMessage({
        type: 'result',
        id,
        result: {
          stdout: stdoutBuf,
          stderr: stderrBuf,
          status: stderrBuf ? 'error' : 'success',
          durationMs: Math.round(performance.now() - startTime),
          inputLog,
          engine: 'pyodide-wasm'
        }
      });
    } catch (err) {
      self.postMessage({
        type: 'result',
        id,
        result: {
          stdout: '',
          stderr: String(err.message || err),
          status: 'error',
          durationMs: Math.round(performance.now() - startTime),
          inputLog: [],
          engine: 'pyodide-wasm'
        }
      });
    }
  }
};
`;

export function initPythonRuntime(): void {
  if (typeof window === 'undefined') {
    notifyStatus('ready-engine');
    return;
  }
  if (pyodideWorker) return;

  try {
    const blob = new Blob([WORKER_SOURCE], { type: 'application/javascript' });
    const url = URL.createObjectURL(blob);
    pyodideWorker = new Worker(url);

    const initTimeout = window.setTimeout(() => {
      if (!pyodideReady) {
        notifyStatus('ready-engine');
      }
    }, 3200);

    pyodideWorker.onmessage = (e) => {
      if (e.data?.type === 'init-ok') {
        window.clearTimeout(initTimeout);
        pyodideReady = true;
        notifyStatus('ready-pyodide');
      } else if (e.data?.type === 'init-fallback') {
        window.clearTimeout(initTimeout);
        pyodideReady = false;
        notifyStatus('ready-engine');
      }
    };

    pyodideWorker.onerror = () => {
      window.clearTimeout(initTimeout);
      pyodideReady = false;
      notifyStatus('ready-engine');
    };

    pyodideWorker.postMessage({ type: 'init' });
  } catch {
    notifyStatus('ready-engine');
  }
}

export async function runPythonCode(
  source: string,
  optionsOrInputs: ExecutionOptions | string[] = {}
): Promise<PythonExecutionResult> {
  const options: ExecutionOptions = Array.isArray(optionsOrInputs)
    ? { inputs: optionsOrInputs }
    : optionsOrInputs;

  // Always compute trace steps & deterministic check using the AST engine
  const syncResult = executePython3Sync(source, options);

  // If the program has a timeout (infinite loop) or Pyodide worker isn't active, return syncResult immediately
  const activeWorker = pyodideWorker;
  if (!pyodideReady || !activeWorker || syncResult.status === 'timeout') {
    return syncResult;
  }

  const timeoutMs = options.timeoutMs ?? 3500;
  const reqId = Math.random().toString(36).slice(2);

  return new Promise<PythonExecutionResult>((resolve) => {
    let settled = false;

    const timer = window.setTimeout(() => {
      if (settled) return;
      settled = true;
      // Terminate stuck worker and re-spawn
      if (pyodideWorker) {
        pyodideWorker.terminate();
        pyodideWorker = null;
        pyodideReady = false;
        initPythonRuntime();
      }
      resolve({
        ...syncResult,
        status: 'timeout',
        stderr: `TimeoutError: Execution exceeded ${timeoutMs}ms limit and was terminated.`,
      });
    }, timeoutMs);

    const handler = (event: MessageEvent) => {
      if (event.data?.type === 'result' && event.data?.id === reqId) {
        if (settled) return;
        settled = true;
        window.clearTimeout(timer);
        activeWorker.removeEventListener('message', handler);
        const wRes = event.data.result;
        resolve({
          stdout: wRes.stdout || syncResult.stdout,
          stderr: wRes.stderr,
          status: wRes.status,
          durationMs: wRes.durationMs,
          inputLog: wRes.inputLog?.length ? wRes.inputLog : syncResult.inputLog,
          traceSteps: syncResult.traceSteps,
          engine: 'pyodide-wasm',
        });
      }
    };

    activeWorker.addEventListener('message', handler);
    activeWorker.postMessage({
      type: 'run',
      id: reqId,
      code: source,
      inputs: options.inputs ?? [],
    });
  });
}
