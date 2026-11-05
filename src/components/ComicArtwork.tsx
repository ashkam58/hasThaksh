import React, { useEffect, useRef } from 'react';
import { Lesson } from '../types/quest';

export const Py9RobotAvatar: React.FC<{
  mood?: 'ready' | 'happy' | 'thinking' | 'alert';
  size?: 'sm' | 'md' | 'lg';
}> = ({ mood = 'ready', size = 'md' }) => {
  const dims = size === 'sm' ? 'w-12 h-12' : size === 'lg' ? 'w-24 h-24' : 'w-16 h-16';
  const eyeColor =
    mood === 'happy'
      ? '#10B981'
      : mood === 'alert'
      ? '#F59E0B'
      : mood === 'thinking'
      ? '#A855F7'
      : '#38BDF8';

  return (
    <div
      className={`${dims} relative shrink-0 rounded-2xl bg-[#E0F2FE] border-3 border-[#0F172A] shadow-[4px_4px_0px_#0F172A] flex items-center justify-center overflow-hidden`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 80 80" className="w-full h-full">
        <defs>
          <radialGradient id="py9Glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#BAE6FD" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#E0F2FE" stopOpacity="0.2" />
          </radialGradient>
        </defs>
        <circle cx="40" cy="40" r="36" fill="url(#py9Glow)" />
        {/* Antenna */}
        <line x1="40" y1="7" x2="40" y2="18" stroke="#0F172A" strokeWidth="3.5" strokeLinecap="round" />
        <circle cx="40" cy="6" r="5" fill="#FBBF24" stroke="#0F172A" strokeWidth="2" />
        {/* Head chassis */}
        <rect x="15" y="18" width="50" height="40" rx="10" fill="#38BDF8" stroke="#0F172A" strokeWidth="3" />
        {/* Visor */}
        <rect x="21" y="25" width="38" height="19" rx="5" fill="#0F172A" stroke="#F8FAFC" strokeWidth="1.5" />
        {/* Eyes */}
        {mood === 'happy' ? (
          <>
            <path d="M26 36 Q31 29 36 36" fill="none" stroke="#34D399" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M44 36 Q49 29 54 36" fill="none" stroke="#34D399" strokeWidth="3.5" strokeLinecap="round" />
          </>
        ) : (
          <>
            <circle cx="31" cy="35" r="4.5" fill={eyeColor} />
            <circle cx="49" cy="35" r="4.5" fill={eyeColor} />
          </>
        )}
        {/* Mouth / Voice grille */}
        <rect x="28" y="48" width="24" height="5" rx="2.5" fill="#FEF3C7" stroke="#0F172A" strokeWidth="1.5" />
        {/* Side ear bolts */}
        <rect x="10" y="30" width="5" height="13" rx="2" fill="#FBBF24" stroke="#0F172A" strokeWidth="2" />
        <rect x="65" y="30" width="5" height="13" rx="2" fill="#FBBF24" stroke="#0F172A" strokeWidth="2" />
        {/* Collar badge */}
        <path d="M24 58 L56 58 L62 74 L18 74 Z" fill="#FBBF24" stroke="#0F172A" strokeWidth="2.5" />
        <text x="40" y="70" textAnchor="middle" fill="#0F172A" fontSize="9.5" fontWeight="900" fontFamily="monospace">
          PY-9
        </text>
      </svg>
    </div>
  );
};

export const ComicChapterIllustration: React.FC<{
  theme: Lesson['illustrationTheme'];
  chapterTitle: string;
  classNumber: number;
}> = ({ theme, chapterTitle, classNumber }) => {
  const themeConfig: Record<
    Lesson['illustrationTheme'],
    { bgStart: string; bgEnd: string; primary: string; secondary: string; badge: string; caption: string; actionWord: string }
  > = {
    superhero: { bgStart: '#FEF3C7', bgEnd: '#E0F2FE', primary: '#0284C7', secondary: '#F59E0B', badge: 'CORE IGNITION', caption: 'int • float • str • bool', actionWord: 'POW!' },
    detective: { bgStart: '#F3E8FF', bgEnd: '#E0F2FE', primary: '#7C3AED', secondary: '#0284C7', badge: 'CIPHER LAB', caption: 'slice [start:stop] • f-strings', actionWord: 'CLUE!' },
    robot: { bgStart: '#E0F2FE', bgEnd: '#D1FAE5', primary: '#0284C7', secondary: '#059669', badge: 'ALGO ENGINE', caption: 'Input → Process → Output', actionWord: 'BEEP!' },
    decision: { bgStart: '#FEF3C7', bgEnd: '#FCE7F3', primary: '#D97706', secondary: '#DB2777', badge: 'BRANCH GATE', caption: 'if • elif • else', actionWord: 'CHOOSE!' },
    lab: { bgStart: '#D1FAE5', bgEnd: '#E0F2FE', primary: '#059669', secondary: '#0284C7', badge: 'LOGIC MATRIX', caption: 'and • or • not', actionWord: 'ZAP!' },
    factory: { bgStart: '#FCE7F3', bgEnd: '#FEF3C7', primary: '#DB2777', secondary: '#D97706', badge: 'LOOP TURBINE', caption: 'for i in range()', actionWord: 'SPIN!' },
    rocket: { bgStart: '#FFEDD5', bgEnd: '#E0F2FE', primary: '#EA580C', secondary: '#0284C7', badge: 'THRUST LOOP', caption: 'while • break • continue', actionWord: 'BLAST!' },
    grid: { bgStart: '#E0F2FE', bgEnd: '#F3E8FF', primary: '#0284C7', secondary: '#7C3AED', badge: 'STAR MATRIX', caption: 'Nested row × col loops', actionWord: 'GRID!' },
    backpack: { bgStart: '#D1FAE5', bgEnd: '#FEF3C7', primary: '#059669', secondary: '#D97706', badge: 'GEAR VAULT', caption: 'lists • append • pop', actionWord: 'LOAD!' },
    leaderboard: { bgStart: '#FEF3C7', bgEnd: '#E0F2FE', primary: '#D97706', secondary: '#0284C7', badge: 'ARENA RANKS', caption: 'sort • max • slices', actionWord: 'RANK!' },
    toolbox: { bgStart: '#FCE7F3', bgEnd: '#E0F2FE', primary: '#DB2777', secondary: '#0284C7', badge: 'DEF FORGE', caption: 'def function():', actionWord: 'BUILD!' },
    modular: { bgStart: '#EDE9FE', bgEnd: '#D1FAE5', primary: '#6D28D9', secondary: '#059669', badge: 'RETURN RELAY', caption: 'params • return • scope', actionWord: 'SYNC!' },
    database: { bgStart: '#E0F2FE', bgEnd: '#FEF3C7', primary: '#0284C7', secondary: '#D97706', badge: 'KEY-VALUE CORE', caption: 'dict[key] = value', actionWord: 'FIND!' },
    dice: { bgStart: '#FFE4E6', bgEnd: '#FEF3C7', primary: '#E11D48', secondary: '#D97706', badge: 'PROBABILITY', caption: 'import random • math', actionWord: 'ROLL!' },
    treasure: { bgStart: '#FEF9C3', bgEnd: '#D1FAE5', primary: '#CA8A04', secondary: '#059669', badge: '2D RADAR', caption: 'grid[row][col]', actionWord: 'MAP!' },
    bug: { bgStart: '#FFE4E6', bgEnd: '#E0F2FE', primary: '#DC2626', secondary: '#0284C7', badge: 'SHIELD ARMOUR', caption: 'try • except • debug', actionWord: 'FIX!' },
    quiz_project: { bgStart: '#E0F2FE', bgEnd: '#FEF3C7', primary: '#0284C7', secondary: '#D97706', badge: 'PROJECT 1', caption: 'QUIZ MASTER ENGINE', actionWord: 'QUIZ!' },
    maze_project: { bgStart: '#D1FAE5', bgEnd: '#FEF3C7', primary: '#059669', secondary: '#D97706', badge: 'PROJECT 2', caption: 'TREASURE MAZE 2D', actionWord: 'QUEST!' },
    rps_project: { bgStart: '#FCE7F3', bgEnd: '#E0F2FE', primary: '#DB2777', secondary: '#0284C7', badge: 'PROJECT 3', caption: 'RPS LEAGUE ARENA', actionWord: 'DUEL!' },
    showcase: { bgStart: '#FEF3C7', bgEnd: '#E0F2FE', primary: '#D97706', secondary: '#0284C7', badge: 'GRAND FINALE', caption: 'PYTHON CHAMPION', actionWord: 'WIN!' },
  };

  const cfg = themeConfig[theme] || themeConfig.superhero;

  return (
    <div className="relative w-full h-52 sm:h-60 rounded-2xl overflow-hidden comic-panel bg-[#FFFDF7]">
      <svg viewBox="0 0 720 220" className="w-full h-full preserve-3d" role="img" aria-label={chapterTitle}>
        <defs>
          <linearGradient id={`bg-${classNumber}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={cfg.bgStart} />
            <stop offset="55%" stopColor="#FFFDF7" />
            <stop offset="100%" stopColor={cfg.bgEnd} />
          </linearGradient>
          <pattern id={`dots-${classNumber}`} x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
            <circle cx="3.5" cy="3.5" r="2" fill={cfg.primary} opacity="0.16" />
          </pattern>
        </defs>

        <rect width="720" height="220" fill={`url(#bg-${classNumber})`} />
        <rect width="720" height="220" fill={`url(#dots-${classNumber})`} />

        {/* Dynamic Comic Speed Rays */}
        <g stroke={cfg.primary} strokeOpacity="0.22" strokeWidth="3">
          <line x1="0" y1="15" x2="290" y2="110" />
          <line x1="0" y1="85" x2="260" y2="120" />
          <line x1="0" y1="185" x2="300" y2="135" />
          <line x1="720" y1="20" x2="460" y2="105" />
          <line x1="720" y1="180" x2="470" y2="130" />
        </g>

        {/* Comic Action Starburst Top-Right */}
        <g transform="translate(458, 42)">
          <polygon
            points="0,-30 11,-11 32,-17 17,2 34,17 11,17 4,34 -9,15 -30,21 -17,2 -32,-15 -9,-11"
            fill="#FBBF24"
            stroke="#0F172A"
            strokeWidth="3"
          />
          <text
            x="0"
            y="6"
            textAnchor="middle"
            fill="#0F172A"
            fontSize="14"
            fontWeight="900"
            fontFamily="'Bangers', sans-serif"
          >
            {cfg.actionWord}
          </text>
        </g>

        {/* Right Hexagonal Comic Emblem */}
        <g transform="translate(592, 112)">
          <polygon
            points="0,-84 74,-42 74,42 0,84 -74,42 -74,-42"
            fill="#FFFFFF"
            stroke="#0F172A"
            strokeWidth="4"
          />
          <polygon
            points="0,-68 60,-34 60,34 0,68 -60,34 -60,-34"
            fill="#FEF3C7"
            stroke={cfg.primary}
            strokeWidth="2.5"
            strokeDasharray="7 5"
          />
          <text x="0" y="-18" textAnchor="middle" fill="#B45309" fontSize="13" fontWeight="900" fontFamily="monospace">
            CLASS {String(classNumber).padStart(2, '0')}
          </text>
          <text x="0" y="8" textAnchor="middle" fill="#0F172A" fontSize="15" fontWeight="900" fontFamily="sans-serif">
            {cfg.badge}
          </text>
          <text x="0" y="30" textAnchor="middle" fill={cfg.primary} fontSize="11" fontWeight="800" fontFamily="monospace">
            {cfg.caption}
          </text>
        </g>

        {/* Left Comic Story Frame */}
        <g transform="translate(26, 22)">
          <rect x="0" y="0" width="225" height="34" rx="6" fill="#FBBF24" stroke="#0F172A" strokeWidth="3" />
          <text x="12" y="22" fill="#0F172A" fontSize="13.5" fontWeight="900" fontFamily="sans-serif">
            ISSUE #{String(classNumber).padStart(2, '0')} • COMIC EDITION
          </text>

          <text x="0" y="70" fill="#0F172A" fontSize="28" fontWeight="900" fontFamily="'Bricolage Grotesque', sans-serif">
            {chapterTitle}
          </text>

          {/* Warm Paper Code Callout Box */}
          <rect x="0" y="90" width="435" height="76" rx="12" fill="#FFFFFF" stroke="#0F172A" strokeWidth="3" />
          <text x="18" y="120" fill="#0369A1" fontSize="15" fontWeight="800" fontFamily="monospace">
            &gt;&gt;&gt; mission_status = &quot;CLASS_{String(classNumber).padStart(2, '0')}_READY&quot;
          </text>
          <text x="18" y="148" fill="#B45309" fontSize="14.5" fontWeight="800" fontFamily="monospace">
            &gt;&gt;&gt; print(f&quot;Commander Hasthaksh Lv.{Math.min(9, Math.ceil(classNumber / 2.2))} Engaged!&quot;)
          </text>
        </g>
      </svg>
    </div>
  );
};

export const PythonCanvasVisualizer: React.FC<{
  stdout: string;
  code: string;
  reducedMotion?: boolean;
}> = ({ stdout, code, reducedMotion = false }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const stateRef = useRef({ stdout, code, reducedMotion });
  stateRef.current = { stdout, code, reducedMotion };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId = 0;
    let frame = 0;

    const render = () => {
      frame++;
      const { stdout: out, code: src } = stateRef.current;
      const w = canvas.width;
      const h = canvas.height;

      // Warm cream comic paper canvas background
      ctx.fillStyle = '#FFFDF7';
      ctx.fillRect(0, 0, w, h);

      // Subtle comic blueprint grid
      ctx.strokeStyle = 'rgba(2, 132, 199, 0.14)';
      ctx.lineWidth = 1;
      for (let x = 0; x < w; x += 28) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += 28) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      const lines = out
        .trim()
        .split('\n')
        .filter((l) => l.trim().length > 0);

      const isMazeOutput =
        src.includes('maze') ||
        lines.some((l) => /^[S.#PTG\s]+$/.test(l.trim()) && l.trim().length >= 3);

      if (isMazeOutput) {
        ctx.fillStyle = '#B45309';
        ctx.font = 'bold 14px "JetBrains Mono", monospace';
        ctx.fillText('2D GRID TELEMETRY VIEW', 18, 26);

        const gridRows = [
          ['S', '.', '.', '#'],
          ['#', '.', '#', '.'],
          ['.', '.', '.', '.'],
          ['#', '#', '.', 'T'],
        ];

        const cellSize = 38;
        const startX = 24;
        const startY = 40;

        for (let r = 0; r < 4; r++) {
          for (let c = 0; c < 4; c++) {
            const tile = gridRows[r][c];
            const cx = startX + c * (cellSize + 6);
            const cy = startY + r * (cellSize + 6);
            ctx.fillStyle =
              tile === '#'
                ? '#CBD5E1'
                : tile === 'T'
                ? '#FDE68A'
                : tile === 'S'
                ? '#BAE6FD'
                : '#FFFFFF';
            ctx.fillRect(cx, cy, cellSize, cellSize);
            ctx.strokeStyle = '#0F172A';
            ctx.lineWidth = 2;
            ctx.strokeRect(cx, cy, cellSize, cellSize);

            ctx.fillStyle = '#0F172A';
            ctx.font = 'bold 15px "JetBrains Mono", monospace';
            ctx.fillText(tile, cx + 14, cy + 25);
          }
        }

        ctx.fillStyle = '#0369A1';
        ctx.font = 'bold 14px "Plus Jakarta Sans", sans-serif';
        ctx.fillText('LIVE STDOUT STREAM:', 225, 50);
        ctx.fillStyle = '#0F172A';
        ctx.font = 'bold 14px "JetBrains Mono", monospace';
        lines.slice(-6).forEach((ln, idx) => {
          ctx.fillText(ln.slice(0, 34), 225, 76 + idx * 22);
        });
      } else {
        const pulse = stateRef.current.reducedMotion ? 1 : 0.85 + Math.sin(frame * 0.08) * 0.15;
        ctx.fillStyle = '#0369A1';
        ctx.font = 'bold 14px "JetBrains Mono", monospace';
        ctx.fillText('PY-9 HOLOGRAPHIC COMIC STAGE', 18, 28);

        ctx.save();
        ctx.translate(78, 120);
        ctx.fillStyle = '#E0F2FE';
        ctx.beginPath();
        ctx.arc(0, 0, 44, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = `rgba(2, 132, 199, ${0.85 * pulse})`;
        ctx.lineWidth = 3.5;
        ctx.beginPath();
        ctx.arc(0, 0, 44, 0, Math.PI * 2);
        ctx.stroke();

        ctx.strokeStyle = '#D97706';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(0, 0, 32, frame * 0.03, frame * 0.03 + Math.PI * 1.3);
        ctx.stroke();

        ctx.fillStyle = '#0F172A';
        ctx.font = 'bold 13px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.fillText(lines.length > 0 ? `${lines.length} LINES` : 'READY', 0, 5);
        ctx.restore();

        ctx.fillStyle = '#334155';
        ctx.font = 'bold 14px "JetBrains Mono", monospace';
        if (lines.length === 0) {
          ctx.fillText('Click "▶ Run Code" to project', 148, 95);
          ctx.fillText('your Python output here!', 148, 118);
        } else {
          lines.slice(0, 5).forEach((ln, i) => {
            ctx.fillStyle = '#FEF3C7';
            ctx.fillRect(148, 38 + i * 32, w - 164, 26);
            ctx.strokeStyle = '#0F172A';
            ctx.lineWidth = 2;
            ctx.strokeRect(148, 38 + i * 32, w - 164, 26);
            ctx.fillStyle = '#0F172A';
            ctx.font = 'bold 13.5px "JetBrains Mono", monospace';
            ctx.fillText(ln.slice(0, 40), 158, 56 + i * 32);
          });
        }
      }
    };

    render();
    if (!stateRef.current.reducedMotion) {
      const interval = window.setInterval(render, 120);
      return () => window.clearInterval(interval);
    }
    return () => {
      if (animId) cancelAnimationFrame(animId);
    };
  }, [stdout, code, reducedMotion]);

  return (
    <div className="rounded-2xl comic-panel bg-[#FFFDF7] overflow-hidden">
      <div className="px-4 py-2.5 bg-[#FEF3C7] border-b-2 border-[#0F172A] flex items-center justify-between text-sm font-mono font-extrabold text-[#0F172A]">
        <span>🎬 VISUAL TELEMETRY CANVAS</span>
        <span className="px-2.5 py-0.5 rounded bg-[#38BDF8] border border-[#0F172A] text-[#0F172A] font-black text-xs">
          LIVE STAGE
        </span>
      </div>
      <canvas
        ref={canvasRef}
        width={520}
        height={225}
        data-testid="python-visualizer-canvas"
        className="w-full h-44 block"
      />
    </div>
  );
};
