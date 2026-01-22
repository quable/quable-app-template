'use client'

import { useEffect, useState } from 'react'
import i18n from '@/i18n/config'
import { Box, CircularProgress } from '@mui/material'

interface I18nProviderProps {
  children: React.ReactNode
}

export function I18nProvider({ children }: I18nProviderProps) {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    // Detect language on client side only
    const savedLang = localStorage.getItem('i18nextLng')
    const browserLang = navigator.language.split('-')[0]
    const detectedLang = savedLang || (browserLang === 'fr' ? 'fr' : 'en')

    if (i18n.language !== detectedLang) {
      i18n.changeLanguage(detectedLang).then(() => {
        setIsReady(true)
      })
    } else {
      setIsReady(true)
    }
  }, [])

  // Don't render children until i18n is ready to avoid hydration mismatch
  if (!isReady) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: '#f5f5f5',
        }}
      >
        <CircularProgress />
      </Box>
    )
  }

  return <>{children}</>
}
