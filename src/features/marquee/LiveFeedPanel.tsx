import { useEffect, useMemo, useState } from 'react'
import { useLiveFeed, useLastUpdated } from '../../app/selectors'

const STORAGE_KEY = 'innovue.liveFeed.tab'

export default function LiveFeedPanel() {
  const lastUpdated = useLastUpdated()
  const feed = useLiveFeed()
  const titles: string[] = useMemo(() => feed?.titles ?? [], [feed])
  const rawRows: string[] = useMemo(() => feed?.rows ?? [], [feed])
  const rows: string[][] = useMemo(
    () =>
      rawRows.map((r: string) =>
        r.split(/-----|—|–/g)
          .map((s: string) => s.trim())
          .filter(Boolean),
      ),
    [rawRows],
  )

  const [active, setActive] = useState(() => {
    if (typeof window === 'undefined') return 0
    const raw = window.localStorage.getItem(STORAGE_KEY)
    const idx = raw ? parseInt(raw, 10) : 0
    return Number.isFinite(idx) ? idx : 0
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, String(active))
    }
  }, [active])

  const chips = useMemo(() => rows[active] ?? [], [rows, active])
  const marqueeItems = useMemo(() => chips.concat(chips), [chips])

  const formatted = lastUpdated
    ? new Date(lastUpdated).toLocaleTimeString()
    : ''

  return (
    <section className="live-feed-panel" aria-labelledby="live-feed-header">
      <header className="live-feed-header" id="live-feed-header">
        <div className="live-feed-meta">
          <h2 className="live-feed-title">GCDC Live Feed</h2>
          <span className="live-feed-updated">Last Updated {formatted}</span>
        </div>
        <div className="live-feed-tabs" role="tablist">
          {titles.map((t: string, idx: number) => (
            <button
              key={idx}
              id={`live-feed-tab-${idx}`}
              role="tab"
              aria-selected={idx === active}
              aria-controls={`live-feed-panel-${idx}`}
              className={idx === active ? 'active' : ''}
              onClick={() => setActive(idx)}
            >
              {t || `Tab ${idx + 1}`}
            </button>
          ))}
        </div>
      </header>
      <div
        className="live-feed-body"
        role="tabpanel"
        id={`live-feed-panel-${active}`}
        aria-labelledby={`live-feed-tab-${active}`}
      >
        {chips.length === 0 ? (
          <div className="live-feed-empty">No updates</div>
        ) : (
          <div className="marquee" tabIndex={0}>
            <div className="marquee-track">
              {marqueeItems.map((chip: string, idx: number) => (
                <span key={idx} className="chip">
                  {chip}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

