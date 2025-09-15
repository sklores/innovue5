import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { useAppDispatch, useAppSelector } from './app/state'
import { selectCount, selectFeed, selectKpis } from './app/selectors'

function App() {
  const dispatch = useAppDispatch()
  const count = useAppSelector(selectCount)
  const kpis = useAppSelector(selectKpis)
  const feed = useAppSelector(selectFeed)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => dispatch({ type: 'increment' })}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <ul>
        {Object.entries(kpis).map(([key, value]) => (
          <li key={key}>
            {key}: {value}
          </li>
        ))}
      </ul>
      <ul>
        {feed.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
