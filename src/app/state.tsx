/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  type ReactNode,
} from 'react'
import { startPolling } from '../data/poller'

export interface AppState {
  count: number
  kpis: Record<string, number>
  feed: string[]
}

interface IncrementAction {
  type: 'increment'
}
interface SetKpisAction {
  type: 'set-kpis'
  kpis: Record<string, number>
}
interface AppendFeedAction {
  type: 'append-feed'
  feed: string[]
}

type Action = IncrementAction | SetKpisAction | AppendFeedAction

const initialState: AppState = { count: 0, kpis: {}, feed: [] }

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'increment':
      return { ...state, count: state.count + 1 }
    case 'set-kpis':
      return { ...state, kpis: action.kpis }
    case 'append-feed':
      return { ...state, feed: [...state.feed, ...action.feed] }
    default:
      return state
  }
}

const StateContext = createContext<AppState>(initialState)
const DispatchContext = createContext<React.Dispatch<Action>>(() => undefined)

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    const stop = startPolling((data) => {
      dispatch({ type: 'set-kpis', kpis: data.kpis })
      if (data.feed.length) {
        dispatch({ type: 'append-feed', feed: data.feed })
      }
    })
    return stop
  }, [])

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>{children}</DispatchContext.Provider>
    </StateContext.Provider>
  )
}

export function useAppDispatch() {
  return useContext(DispatchContext)
}

export function useAppSelector<T>(selector: (state: AppState) => T): T {
  const state = useContext(StateContext)
  return selector(state)
}
