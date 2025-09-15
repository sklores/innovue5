import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'
import './styles/topbar.css'
import './styles/kpi.css'
import './styles/bottom.css'
import './styles/marquee.css'
import App from './App.tsx'
import { RefreshProvider } from './app/state.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RefreshProvider>
      <App />
    </RefreshProvider>
  </StrictMode>,
)
