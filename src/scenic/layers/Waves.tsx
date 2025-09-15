import { JSX } from 'react'

interface WavesProps {
  amplitude: number
  roughness: number
}

const Waves = ({ amplitude, roughness = 0 }: WavesProps): JSX.Element => {
  void roughness
  const height = 50
  const path = `M0 ${height} Q25 ${height - amplitude} 50 ${height} T100 ${height} V100 H0 Z`

  return (
    <svg viewBox="0 0 100 100" className="waves" preserveAspectRatio="none">
      <g>
        <path d={path} fill="currentColor" />
        <animateTransform
          attributeName="transform"
          type="translate"
          from="0 0"
          to="20 0"
          dur="5s"
          repeatCount="indefinite"
        />
      </g>
    </svg>
  )
}

export default Waves
