import { GOOGLE_API_KEY, GOOGLE_SHEET_ID } from './hardcoded'

export async function fetchRanges(ranges: string[]) {
  const params = ranges.map((r) => `ranges=${encodeURIComponent(r)}`).join('&')
  const url =
    `https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEET_ID}/values:batchGet?${params}&key=${GOOGLE_API_KEY}`
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error('Failed to fetch ranges')
  }
  return res.json()
}
