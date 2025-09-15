import type { CSSProperties } from 'react'

type BirdsProps = {
  count: number
  speed: number
}

const Birds = ({ count, speed }: BirdsProps) => {
  const birds = Array.from({ length: count })
  return (
    <svg
      className="birds-layer"
      width="100%"
      height="100%"
      viewBox="0 0 100 20"
      aria-hidden="true"
    >
      <defs>
        <path
          id="bird"
          d="M2 2L5 0L8 2"
          stroke="currentColor"
          strokeWidth="0.5"
          fill="none"
          strokeLinecap="round"
        />
      </defs>
      {birds.map((_, i) => (
        <g
          key={i}
          className="bird"
          style={{
            animationDuration: `${speed}s`,
            animationDelay: `${(i * speed) / count}s`,
          } as CSSProperties}
        >
          <use href="#bird" transform={`translate(0 ${i * 3})`} />
        </g>
      ))}
      <style>{`
        .birds-layer .bird {
          animation-name: bird-fly;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        @keyframes bird-fly {
          from { transform: translateX(-10%); }
          to { transform: translateX(110%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .birds-layer .bird {
            animation: none;
          }
        }
      `}</style>
    </svg>
  )
}

export default Birds
