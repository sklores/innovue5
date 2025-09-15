import TopBar from "./scenic/TopBar"
import KpiTiles from "./features/kpi/KpiTiles"
import LiveFeedPanel from "./features/marquee/LiveFeedPanel"

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
