import TopBar from './scenic/TopBar.tsx'
import KpiTiles from './features/kpi/KpiTiles.tsx'
import LiveFeedPanel from './features/marquee/LiveFeedPanel.tsx'

function App() {
  return (
    <>
      <TopBar />
      <KpiTiles />
      <LiveFeedPanel />
    </>
  )
}

export default App
