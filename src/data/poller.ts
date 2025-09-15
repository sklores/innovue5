import { fetchRanges } from './sheetsClient'
import { KPI_RANGES, LIVE_FEED_RANGE } from './sheetMap'
import { adaptFeed, adaptKpis } from './adapters'

export function startPolling(
  callback: (data: { kpis: Record<string, number>; feed: string[] }) => void,
  interval = 60000,
) {
  const entries = Object.entries(KPI_RANGES)
  const ranges = [...entries.map(([, r]) => r), LIVE_FEED_RANGE]
  const seen = new Set<string>()

  async function poll() {
    try {
      const res = await fetchRanges(ranges)
      const valueRanges = res.valueRanges || []
      const kpis = adaptKpis(valueRanges.slice(0, entries.length), entries)
      const feedAll = adaptFeed(valueRanges[entries.length])
      const fresh = feedAll.filter((item) => !seen.has(item))
      fresh.forEach((item) => seen.add(item))
      callback({ kpis, feed: fresh })
    } catch (err) {
      console.error(err)
    }
  }

  poll()
  const id = setInterval(poll, interval)
  return () => clearInterval(id)
}
