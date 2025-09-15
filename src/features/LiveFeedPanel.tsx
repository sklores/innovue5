import { useState } from 'react'

const tabs = ['A15', 'A16', 'A17']
const chips = ['B15', 'B16', 'B17']

const LiveFeedPanel = () => {
  const [active, setActive] = useState(0)
  return (
    <section className="live-feed-panel">
      <div className="tabs">
        {tabs.map((t, idx) => (
          <button
            key={t}
            className={idx === active ? 'active' : ''}
            onClick={() => setActive(idx)}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="chips" style={{ display: 'flex', overflowX: 'auto' }}>
        {chips.map((c) => (
          <div key={c} className="chip">
            {c}
          </div>
        ))}
      </div>
    </section>
  )
}

export default LiveFeedPanel
