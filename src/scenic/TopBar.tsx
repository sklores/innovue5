import logo from '../assets/react.svg'
import ControlPill from './ControlPill.tsx'
import Birds, { useBirdProps } from './layers/Birds.tsx'
import Waves, { useWaveProps } from './layers/Waves.tsx'

const TopBar = () => {
  const waveProps = useWaveProps()
  const birdProps = useBirdProps()
  return (
    <header className="top-bar">
      <div className="scenic">
        <Waves {...waveProps} />
        <img src={logo} alt="Logo" className="logo" />
        <Birds {...birdProps} />
      </div>
      <ControlPill />
    </header>
  )
}

export default TopBar
