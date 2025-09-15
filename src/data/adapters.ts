interface ValueRange {
  range: string
  values?: string[][]
}

export function adaptKpis(
  valueRanges: ValueRange[],
  entries: [string, string][],
): Record<string, number> {
  const result: Record<string, number> = {}
  entries.forEach(([key], idx) => {
    const vr = valueRanges[idx]
    const value = vr?.values?.[0]?.[0]
    result[key] = Number(value ?? 0)
  })
  return result
}

export function adaptFeed(range: ValueRange): string[] {
  return (range.values || [])
    .map((row) => row.join(' ').trim())
    .filter(Boolean)
}
