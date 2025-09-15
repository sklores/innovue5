import { useEffect, useState } from 'react'
import { useRefresh } from './state'

export type Kpis = {
  sales: number
  laborPct: number
}

export const TARGETS = {
  sales: 100,
}

export function useKpis(): Kpis {
  // Access the global application state which is expected to be
  // attached to the `window` object. This mirrors the shape of the
  // server supplied data in production.  If the data isn't present we
  // fall back to zeros to keep the UI stable.
  const { lastRefresh } = useRefresh()
  void lastRefresh // trigger re-render on refresh

  const appState =
    (typeof window !== 'undefined' && (window as any).__APP_STATE__) || {}
  const kpis = appState.kpis ?? {}

  return {
    sales: typeof kpis.sales === 'number' ? kpis.sales : 0,
    laborPct: typeof kpis.laborPct === 'number' ? kpis.laborPct : 0,
  }
}

export function useLastUpdated() {
  const { lastRefresh } = useRefresh()
  return lastRefresh
}

export function useLoadingError(): unknown {
  return undefined
}

export function useLiveFeed(): { titles: string[]; rows: string[] } | undefined {
  const { lastRefresh } = useRefresh()
  const [feed, setFeed] = useState<{ titles: string[]; rows: string[] }>()

  useEffect(() => {
    if (typeof window === 'undefined') return

    type FeedState = { titles?: unknown; rows?: unknown }
    const source: FeedState | undefined = (window as { liveFeed?: FeedState }).liveFeed

    if (source && typeof source === 'object') {
      const titles = Array.isArray(source.titles)
        ? (source.titles as string[])
        : []
      const rows = Array.isArray(source.rows) ? (source.rows as string[]) : []
      setFeed({ titles, rows })
    } else {
      setFeed(undefined)
    }
  }, [lastRefresh])

  return feed
}

export const useFeed = useLiveFeed

export function tileColor(): string {
  // Pastel accent color used for KPI tiles and chips
  return 'var(--accent-10, #e0e0e0)'
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
