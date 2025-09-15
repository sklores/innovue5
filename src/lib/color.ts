function clamp(value: number) {
  return Math.max(0, Math.min(255, value))
}

function toRgb(hex: string) {
  let normalized = hex.replace('#', '')
  if (normalized.length === 3) {
    normalized = normalized.split('').map((c) => c + c).join('')
  }
  const num = parseInt(normalized, 16)
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  }
}

function toHex({ r, g, b }: { r: number; g: number; b: number }) {
  return (
    '#' +
    [r, g, b]
      .map((v) => clamp(v).toString(16).padStart(2, '0'))
      .join('')
  )
}

export function kpiBackground(hex: string, amount = 0.2) {
  const { r, g, b } = toRgb(hex)
  const lighten = (v: number) => clamp(v + 255 * amount)
  return toHex({ r: lighten(r), g: lighten(g), b: lighten(b) })
}
