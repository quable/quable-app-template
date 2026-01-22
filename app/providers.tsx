'use client'

import { ThemeContextProvider } from '@quable/ui/theme'
import '@quable/ui/theme/index.css'
import '@quable/ui/index.css'
import '@/i18n/config'
import { I18nProvider } from '@/components/I18nProvider'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <I18nProvider>
      <ThemeContextProvider>{children}</ThemeContextProvider>
    </I18nProvider>
  )
}
