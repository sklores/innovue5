/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, type ReactNode } from 'react'

type RefreshContextType = {
  refreshNow: () => void
  lastRefresh: number
}

const RefreshContext = createContext<RefreshContextType>({
  refreshNow: () => {},
  lastRefresh: Date.now(),
})

export function RefreshProvider({ children }: { children: ReactNode }) {
  const [lastRefresh, setLastRefresh] = useState(Date.now())
  const refreshNow = () => setLastRefresh(Date.now())

  return (
    <RefreshContext.Provider value={{ refreshNow, lastRefresh }}>
      {children}
    </RefreshContext.Provider>
  )
}

export function useRefresh() {
  return useContext(RefreshContext)
}
