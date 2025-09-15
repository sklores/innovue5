import { tileColor } from '../../app/selectors'

interface KpiTileProps {
  label: string
  full?: boolean
}

const KpiTile = ({ label, full }: KpiTileProps) => {
  return (
    <div
      className={`kpi-tile${full ? ' full' : ''}`}
      style={{
        backgroundColor: tileColor(),
        color: '#1a1a1a',
        fontFamily: 'Manrope, sans-serif',
      }}
    >
      {label}
    </div>
  )
}

export default KpiTile
