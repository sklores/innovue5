/* eslint-disable react-refresh/only-export-components */
import { useRefresh } from '../../app/state.tsx'
import type { SVGProps } from 'react'

export type BirdsProps = SVGProps<SVGSVGElement>

export const useBirdProps = (): BirdsProps => {
  const { lastRefresh } = useRefresh()
  return {
    className: 'birds',
    key: lastRefresh,
  }
}

const Birds = (props: BirdsProps) => (
  <svg viewBox="0 0 100 20" {...props}>
    <path d="M5 10 Q10 0 15 10" stroke="currentColor" fill="none" />
    <path d="M20 10 Q25 0 30 10" stroke="currentColor" fill="none" />
  </svg>
)

export default Birds
