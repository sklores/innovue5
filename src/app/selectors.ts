import { useRefresh } from './state'

export type Kpis = {
  sales: number
  laborPct: number
}

export const TARGETS = {
  sales: 100,
}

export function useKpis(): Kpis {
  return {
    sales: 0,
    laborPct: 0,
  }
}

export function useLastUpdated() {
  const { lastRefresh } = useRefresh()
  return lastRefresh
}

export function useLoadingError(): unknown {
  return undefined
}

export function useLiveFeed(): { titles: string[]; rows: string[][] } | undefined {
  return undefined
}

export const useFeed = useLiveFeed

export function tileColor(): string {
  return ''
}

const MAX_BIRDS = 10
const MIN_BIRD_SPEED = 0.5
const MAX_BIRD_SPEED = 2

export function useBirdProps() {
  const { laborPct } = useKpis()
  const factor = clamp(laborPct / 0.5, 0, 1)
  const count = Math.round(factor * MAX_BIRDS)
  const speed = MIN_BIRD_SPEED + factor * (MAX_BIRD_SPEED - MIN_BIRD_SPEED)
  return { count, speed }
}

export function useWaveProps() {
  const { sales } = useKpis()
  const amplitude = clamp(sales / TARGETS.sales, 0, 1)
  return { amplitude, roughness: 0 }
}

function clamp(value: number, min = 0, max = 1) {
  return Math.min(Math.max(value, min), max)
}
