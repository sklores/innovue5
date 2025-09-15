/* eslint-disable react-refresh/only-export-components */
import { useRefresh } from '../../app/state.tsx'
import type { SVGProps } from 'react'

export type WavesProps = SVGProps<SVGSVGElement>

export const useWaveProps = (): WavesProps => {
  const { lastRefresh } = useRefresh()
  return {
    className: 'waves',
    key: lastRefresh,
    preserveAspectRatio: 'none',
  }
}

const Waves = (props: WavesProps) => (
  <svg viewBox="0 0 100 20" {...props}>
    <path d="M0 20 Q25 0 50 20 T100 20 V20 Z" fill="currentColor" />
  </svg>
)

export default Waves
