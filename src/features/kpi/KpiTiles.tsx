import KpiTile from './KpiTile'

const KpiTiles = () => {
  return (
    <div className="kpi-grid">
      <KpiTile label="Sales" full />
      <KpiTile label="COGS" />
      <KpiTile label="Labor" />
      <KpiTile label="Fixed Cost" />
      <KpiTile label="A/P" />
      <KpiTile label="Online Views" />
      <KpiTile label="Review" />
      <KpiTile label="Prime" />
      <KpiTile label="Bank" />
      <KpiTile label="Net Profit" full />
    </div>
  )
}

export default KpiTiles
