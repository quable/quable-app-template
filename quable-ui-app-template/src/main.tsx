import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeContextProvider } from '@quable/ui/theme'
import '@quable/ui/theme/index.css'
import '@quable/ui/index.css'
import './index.css'
import './i18n/config'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeContextProvider>
      <App />
    </ThemeContextProvider>
  </StrictMode>,
)
