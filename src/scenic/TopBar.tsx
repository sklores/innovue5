import logo from '../assets/react.svg'
import ControlPill from './ControlPill.tsx'

const TopBar = () => {
  return (
    <header className="top-bar">
      <img src={logo} alt="Logo" className="logo" />
      <ControlPill />
    </header>
  )
}

export default TopBar
