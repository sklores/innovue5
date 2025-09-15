import Sky from './scenic/layers/Sky'
import Lighthouse from './scenic/layers/Lighthouse'
import LightBeam from './scenic/layers/LightBeam'
import RockBase from './scenic/layers/RockBase'
import Brand from './scenic/layers/Brand'
import Splash from './scenic/layers/Splash'
import KPI from './components/KPI'
import Marquee from './components/Marquee'

export default function App() {
  return (
    <>
      <div className="scenic">
        <Sky />
        <Lighthouse />
        <LightBeam />
        <RockBase />
        <Brand />
        <Splash />
      </div>
      <KPI label="Visitors" value="1.2k" color="#3b82f6" />
      <Marquee items={['Alpha', 'Beta', 'Gamma']} />
    </>
  )
}
