'use client'

import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './locales/en.json'
import fr from './locales/fr.json'

// Get initial language - use 'en' as default for SSR consistency
const getInitialLanguage = () => {
  if (typeof window === 'undefined') return 'en'
  const saved = localStorage.getItem('i18nextLng')
  if (saved && ['en', 'fr'].includes(saved)) return saved
  const browserLang = navigator.language.split('-')[0]
  return browserLang === 'fr' ? 'fr' : 'en'
}

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
    },
    fr: {
      translation: fr,
    },
  },
  lng: getInitialLanguage(),
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
