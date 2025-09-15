import { useRefresh } from '../app/state.tsx'

const ControlPill = () => {
  const { refreshNow } = useRefresh()
  return (
    <button className="control-pill" onClick={refreshNow}>
      Refresh
    </button>
  )
}

export default ControlPill
