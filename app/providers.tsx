'use client'

import { ThemeContextProvider } from '@quable/ui/theme'
import '@quable/ui/theme/index.css'
import '@quable/ui/index.css'
import '@/i18n/config'

export function Providers({ children }: { children: React.ReactNode }) {
  return <ThemeContextProvider>{children}</ThemeContextProvider>
}
