const tiles = ['Sales', 'COGS', 'Labor', 'Promo', 'Voids']

const KpiTiles = () => {
  return (
    <div className="kpi-grid">
      {tiles.map((name) => (
        <div key={name} className="kpi-tile">
          {name}
        </div>
      ))}
    </div>
  )
}

export default KpiTiles
