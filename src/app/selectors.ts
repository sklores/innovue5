import { useEffect, useState } from 'react'
import { useRefresh } from './state'

export type Kpis = {
  sales: number
  laborPct: number
}

interface WindowWithAppState extends Window {
  __APP_STATE__?: { kpis?: Partial<Kpis> }
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
    (typeof window !== 'undefined' && (window as WindowWithAppState).__APP_STATE__) || {}
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

/** --- M3: birds & waves selectors (presentational; safe defaults) --- */
type AppGlobals = {
  APP?: {
    kpis?: { laborPct?: number; sales?: number };
    TARGETS?: { sales?: number };
  };
};

export function useBirdProps(): { count: number; speed: number } {
  const app = (globalThis as AppGlobals).APP;
  const laborPct = app?.kpis?.laborPct ?? 30; // 0..100
  const t = Math.max(0, Math.min(1, (50 - laborPct) / 50)); // lower labor => higher t
  const count = Math.round(2 + t * 10);  // 2..12
  const speed = t;                       // 0..1
  return { count, speed };
}
export function useWaveProps(): { amplitude: number; roughness: number } {
  const app = (globalThis as AppGlobals).APP;
  const sales = app?.kpis?.sales ?? 0;
  const target = app?.TARGETS?.sales ?? 1;
  const ratio = target > 0 ? Math.max(0, Math.min(1, sales / target)) : 0;
  return { amplitude: ratio, roughness: 0 };
}
