import { kpiBackground } from '../lib/color'

interface Props {
  label: string
  value: string
  color: string
}

export default function KPI({ label, value, color }: Props) {
  return (
    <div className="kpi" style={{ backgroundColor: kpiBackground(color) }}>
      <span className="kpi-label">{label}</span>
      <span className="kpi-value">{value}</span>
    </div>
  )
}
