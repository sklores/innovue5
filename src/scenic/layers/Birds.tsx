import React from "react";

type Props = { count: number; speed: number }; // speed 0..1
const prefersReduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

export default function Birds({ count, speed }: Props) {
  const reduced = prefersReduced();
  const n = Math.max(0, Math.min(100, Math.floor(count)));
  const s = Math.max(0, Math.min(1, speed));

  const items = Array.from({ length: n }, (_, i) => {
    const y = 5 + ((i * 29) % 60);
    const dur = 20 - 12 * s;       // 20s..8s
    const delay = (i * 0.7) % dur;

    return (
      <g key={i}
         style={{ animation: reduced ? "none" : `fly ${dur}s linear ${delay}s infinite` }}
         transform={`translate(-20, ${y})`}>
        <path d="M0 0 C 4 -3, 8 -3, 12 0 M12 0 C 16 -3, 20 -3, 24 0"
              fill="none" stroke="currentColor" strokeWidth="1"/>
      </g>
    );
  });

  return (
    <svg aria-hidden viewBox="0 0 100 70"
         style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      <defs>
        <style>{`
          @keyframes fly {
            from { transform: translateX(-20px) }
            to   { transform: translateX(120%) }
          }
        `}</style>
      </defs>
      {items}
    </svg>
  );
}
