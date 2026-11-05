import React, { useState, useEffect } from 'react';
import { runPythonCode } from '../python/pyRunner';
import { PythonExecutionResult, TraceStep } from '../python/engine';

export interface PythonEditorPanelProps {
  title?: string;
  code: string;
  onChange: (newCode: string) => void;
  defaultCode?: string;
  inputValues: string;
  onInputValuesChange: (newInputs: string) => void;
  explanationText?: string;
  onRunComplete?: (result: PythonExecutionResult) => void;
  compact?: boolean;
  heightClass?: string;
}

export const PythonEditorPanel: React.FC<PythonEditorPanelProps> = ({
  title = 'PYTHON 3 MISSION CONSOLE',
  code,
  onChange,
  defaultCode,
  inputValues,
  onInputValuesChange,
  explanationText,
  onRunComplete,
  compact = false,
  heightClass = 'h-72',
}) => {
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<PythonExecutionResult | null>(null);
  const [stepMode, setStepMode] = useState(false);
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [fontScale, setFontScale] = useState<'base' | 'lg' | 'xl'>('base');

  const lines = code.split('\n');
  const activeTrace: TraceStep | null =
    stepMode && result && result.traceSteps.length > 0
      ? result.traceSteps[Math.min(currentStepIdx, result.traceSteps.length - 1)]
      : null;

  useEffect(() => {
    setStepMode(false);
    setCurrentStepIdx(0);
  }, [code]);

  const handleRun = async (enableStep = false) => {
    setIsRunning(true);
    try {
      const inputArray = inputValues.length > 0 ? inputValues.replace(/\r\n/g, '\n').split('\n') : [];
      const execResult = await runPythonCode(code, inputArray);
      setResult(execResult);
      if (enableStep && execResult.traceSteps.length > 0) {
        setStepMode(true);
        setCurrentStepIdx(0);
      } else {
        setStepMode(false);
      }
      if (onRunComplete) {
        onRunComplete(execResult);
      }
    } finally {
      setIsRunning(false);
    }
  };

  const handleReset = () => {
    if (defaultCode !== undefined) {
      onChange(defaultCode);
    }
    setResult(null);
    setStepMode(false);
    setCurrentStepIdx(0);
  };

  const handleClearOutput = () => {
    setResult(null);
    setStepMode(false);
    setCurrentStepIdx(0);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const target = e.currentTarget;
      const start = target.selectionStart;
      const end = target.selectionEnd;
      const updated = code.substring(0, start) + '    ' + code.substring(end);
      onChange(updated);
      requestAnimationFrame(() => {
        target.selectionStart = target.selectionEnd = start + 4;
      });
    }
  };

  const fontClasses =
    fontScale === 'xl'
      ? 'text-xl leading-8'
      : fontScale === 'lg'
      ? 'text-lg leading-7'
      : 'text-base leading-7';

  const containerClasses = isFullScreen
    ? 'fixed inset-3 z-50 flex flex-col rounded-2xl border-4 border-[#0F172A] bg-[#FFFDF7] shadow-2xl overflow-y-auto p-5'
    : 'flex flex-col rounded-2xl comic-panel bg-[#FFFFFF] overflow-hidden';

  return (
    <div className={containerClasses}>
      {/* Top Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-[#E0F2FE] border-b-3 border-[#0F172A]">
        <div className="flex items-center gap-2.5">
          <span className="inline-block w-3.5 h-3.5 rounded-full bg-[#F59E0B] border-2 border-[#0F172A]" />
          <span className="font-mono text-sm sm:text-base font-black tracking-wider text-[#0F172A] uppercase">
            {title}
          </span>
          {activeTrace && (
            <span className="px-2.5 py-1 rounded-lg bg-[#FBBF24] border-2 border-[#0F172A] text-[#0F172A] font-mono text-xs sm:text-sm font-black">
              Line {activeTrace.line} (Step {currentStepIdx + 1}/{result?.traceSteps.length})
            </span>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => handleRun(false)}
            disabled={isRunning}
            className="px-4 py-2 rounded-xl bg-[#34D399] hover:bg-[#10B981] text-[#0F172A] font-black text-sm tracking-wide comic-btn cursor-pointer disabled:opacity-50"
          >
            {isRunning ? 'Running...' : '▶ Run Code'}
          </button>

          <button
            type="button"
            onClick={() => handleRun(true)}
            disabled={isRunning}
            className="px-3.5 py-2 rounded-xl bg-[#38BDF8] hover:bg-[#0EA5E9] text-[#0F172A] font-black text-sm comic-btn cursor-pointer"
          >
            👣 Step Through
          </button>

          {defaultCode !== undefined && (
            <button
              type="button"
              onClick={handleReset}
              className="px-3 py-2 rounded-xl bg-[#FFFFFF] hover:bg-[#F1F5F9] border-2 border-[#0F172A] text-[#0F172A] text-xs sm:text-sm font-bold transition cursor-pointer"
            >
              ↺ Reset
            </button>
          )}

          <button
            type="button"
            onClick={handleClearOutput}
            className="px-3 py-2 rounded-xl bg-[#FFFFFF] hover:bg-[#F1F5F9] border-2 border-[#0F172A] text-[#0F172A] text-xs sm:text-sm font-bold transition cursor-pointer"
          >
            Clear
          </button>

          {explanationText && (
            <button
              type="button"
              onClick={() => setShowExplanation((prev) => !prev)}
              className="px-3 py-2 rounded-xl bg-[#F3E8FF] hover:bg-[#E9D5FF] border-2 border-[#0F172A] text-[#581C87] text-xs sm:text-sm font-bold transition cursor-pointer"
            >
              {showExplanation ? 'Hide Explain' : '💡 Explain'}
            </button>
          )}

          {/* Font Size Controls for Big Clear Readability */}
          <div className="flex items-center rounded-xl bg-[#FFFFFF] border-2 border-[#0F172A] overflow-hidden">
            <button
              type="button"
              onClick={() => setFontScale((prev) => (prev === 'xl' ? 'lg' : 'base'))}
              title="Decrease code font size"
              aria-label="Decrease code font size"
              className="px-2.5 py-1.5 text-xs font-mono font-bold text-[#0F172A] hover:bg-[#F1F5F9] cursor-pointer"
            >
              A-
            </button>
            <button
              type="button"
              onClick={() => setFontScale((prev) => (prev === 'base' ? 'lg' : 'xl'))}
              title="Increase code font size"
              aria-label="Increase code font size"
              className="px-2.5 py-1.5 text-xs font-mono font-black text-[#B45309] hover:bg-[#FEF3C7] border-l-2 border-[#0F172A] cursor-pointer"
            >
              A+
            </button>
          </div>

          <button
            type="button"
            onClick={handleCopy}
            className="px-3 py-2 rounded-xl bg-[#FFFFFF] hover:bg-[#F1F5F9] border-2 border-[#0F172A] text-[#0F172A] text-xs sm:text-sm font-bold transition cursor-pointer"
          >
            {copied ? '✓ Copied' : 'Copy'}
          </button>

          <button
            type="button"
            onClick={() => setIsFullScreen((prev) => !prev)}
            aria-label={isFullScreen ? 'Exit full screen editor' : 'Expand full screen editor'}
            className="px-3 py-2 rounded-xl bg-[#FBBF24] hover:bg-[#F59E0B] text-[#0F172A] text-xs sm:text-sm font-black comic-btn cursor-pointer"
          >
            {isFullScreen ? '⤓ Exit Full IDE' : '⤢ Pop-Out IDE'}
          </button>
        </div>
      </div>

      {/* Code Editor with Line Numbers on Warm Cream Paper */}
      <div
        className={`relative flex ${
          isFullScreen ? 'flex-1 min-h-[380px]' : compact ? 'h-56' : heightClass
        } bg-[#FFFDF9] border-b-3 border-[#0F172A] overflow-hidden`}
      >
        <div
          className={`select-none py-4 px-3 bg-[#F1ECE1] border-r-2 border-[#CBD5E1] text-right font-mono ${fontClasses} text-[#64748B] font-bold overflow-hidden`}
          aria-hidden="true"
        >
          {lines.map((_, idx) => {
            const lineNum = idx + 1;
            const isHighlighted = activeTrace?.line === lineNum;
            return (
              <div
                key={lineNum}
                className={`px-1.5 rounded ${
                  isHighlighted ? 'bg-[#FBBF24] text-[#0F172A] font-black' : ''
                }`}
              >
                {lineNum}
              </div>
            );
          })}
        </div>

        <textarea
          value={code}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          spellCheck={false}
          aria-label={`${title} Python code editor`}
          className={`flex-1 w-full p-4 bg-transparent text-[#0F172A] font-mono font-semibold ${fontClasses} focus:outline-none resize-none overflow-y-auto`}
          placeholder="# Write your Python 3 code here..."
        />
      </div>

      {/* Step-Through Debugger Controls & Variable Watch Table */}
      {stepMode && result && result.traceSteps.length > 0 && (
        <div className="p-4 bg-[#FEF3C7] border-b-3 border-[#0F172A] space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="text-sm sm:text-base font-mono text-[#0F172A]">
              <span className="font-black text-[#B45309]">👣 STEP DEBUGGER:</span> Line{' '}
              <span className="underline font-bold">{activeTrace?.line}</span>:{' '}
              <code className="bg-[#FFFFFF] border border-[#0F172A] px-2.5 py-1 rounded-lg text-[#0F172A] font-bold">
                {activeTrace?.codeLine}
              </code>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setCurrentStepIdx((i) => Math.max(0, i - 1))}
                disabled={currentStepIdx === 0}
                className="px-3.5 py-1.5 rounded-xl bg-[#FFFFFF] border-2 border-[#0F172A] text-sm font-mono font-bold text-[#0F172A] disabled:opacity-40 cursor-pointer"
              >
                ◀ Prev Line
              </button>
              <button
                type="button"
                onClick={() => setCurrentStepIdx((i) => Math.min(result.traceSteps.length - 1, i + 1))}
                disabled={currentStepIdx >= result.traceSteps.length - 1}
                className="px-3.5 py-1.5 rounded-xl bg-[#38BDF8] text-[#0F172A] font-black text-sm font-mono comic-btn disabled:opacity-40 cursor-pointer"
              >
                Next Line ▶
              </button>
              <button
                type="button"
                onClick={() => setStepMode(false)}
                className="px-3 py-1.5 rounded-xl bg-[#FFFFFF] border-2 border-[#0F172A] text-[#0F172A] text-sm font-bold cursor-pointer"
              >
                Close Tracer
              </button>
            </div>
          </div>

          {/* Variable Watch Table */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1">
            {activeTrace && Object.keys(activeTrace.variables).length > 0 ? (
              Object.entries(activeTrace.variables).map(([varName, varVal]) => (
                <div
                  key={varName}
                  className="px-3.5 py-2 rounded-xl bg-[#FFFFFF] border-2 border-[#0F172A] flex items-center justify-between gap-2 text-sm font-mono"
                >
                  <span className="text-[#B45309] font-black truncate">{varName}</span>
                  <span className="text-[#047857] font-bold truncate">{varVal}</span>
                </div>
              ))
            ) : (
              <div className="col-span-full text-sm font-mono text-[#334155]">
                No variables assigned yet at this line. Click &quot;Next Line ▶&quot; to watch variables appear!
              </div>
            )}
          </div>
        </div>
      )}

      {/* Optional Code Explanation Drawer */}
      {showExplanation && explanationText && (
        <div className="p-4 bg-[#F3E8FF] border-b-3 border-[#0F172A] text-sm sm:text-base text-[#581C87] leading-relaxed">
          <div className="font-extrabold text-[#6D28D9] mb-1.5">💡 Line-by-Line Teacher Explanation:</div>
          <p className="whitespace-pre-line">{explanationText}</p>
        </div>
      )}

      {/* Bottom Split: Input-Values Panel & Output Console */}
      <div className="grid grid-cols-1 md:grid-cols-12 bg-[#FAF5E8]">
        {/* Input-Values Panel */}
        <div className="md:col-span-4 p-4 border-b-2 md:border-b-0 md:border-r-3 border-[#0F172A] flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs sm:text-sm font-mono font-extrabold text-[#B45309] uppercase tracking-wide">
              📥 Input Values (input())
            </label>
            <span className="text-xs font-mono font-bold text-[#475569]">1 per line</span>
          </div>
          <textarea
            value={inputValues}
            onChange={(e) => onInputValuesChange(e.target.value)}
            rows={3}
            aria-label={`${title} input values`}
            placeholder="Enter each input() value on a new line..."
            className="w-full flex-1 p-3 rounded-xl bg-[#FFFFFF] border-2 border-[#0F172A] text-sm sm:text-base font-mono font-semibold text-[#0F172A] focus:outline-none focus:border-[#0284C7] resize-none"
          />
        </div>

        {/* Output Console */}
        <div className="md:col-span-8 p-4 flex flex-col justify-between min-h-[140px]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs sm:text-sm font-mono font-extrabold text-[#047857] uppercase tracking-wide">
              🖥 Python Output Console
            </span>
            {result && (
              <span className="text-xs font-mono font-bold text-[#334155]">
                {result.status === 'success' ? '✓ Executed' : '⚠ Error'} in {result.durationMs}ms ({result.engine})
              </span>
            )}
          </div>

          <div
            data-testid="python-output-console"
            className={`flex-1 p-3.5 rounded-xl bg-[#FFFFFF] border-2 border-[#0F172A] font-mono ${fontClasses} overflow-x-auto whitespace-pre-wrap`}
          >
            {!result ? (
              <span className="text-[#64748B] text-sm sm:text-base">
                Click &quot;▶ Run Code&quot; to execute your Python 3 code and see the output here...
              </span>
            ) : (
              <>
                {stepMode && activeTrace ? (
                  <div className="text-[#047857] font-bold">
                    {activeTrace.stdoutSoFar || '(No output printed yet at this step)'}
                  </div>
                ) : (
                  <>
                    {result.stdout && <div className="text-[#047857] font-bold">{result.stdout}</div>}
                    {!result.stdout && result.status === 'success' && (
                      <div className="text-[#64748B] italic">
                        Program finished with no printed output. (Did you forget print()?)
                      </div>
                    )}
                  </>
                )}
                {result.stderr && (
                  <div className="mt-2 p-3 rounded-xl bg-[#FFE4E6] border-2 border-[#E11D48] text-[#881337] text-sm sm:text-base">
                    <div className="font-extrabold text-[#BE123C] mb-1">Python Diagnostic Help:</div>
                    <div>{result.stderr}</div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
