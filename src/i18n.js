const translations = {
  sk: {
    greeting: 'Veselé Vianoce\na\nŠťastný Nový rok',
    year: 'Vianoce 2025',
    play: 'Prehraj',
  },
  en: {
    greeting: 'Merry Christmas\nand\nHappy New Year',
    year: 'Christmas 2025',
    play: 'Play',
  },
}

function getLocale() {
  // Check URL query param first (for debugging)
  const urlParams = new URLSearchParams(window.location.search)
  const langParam = urlParams.get('lang')
  if (langParam === 'sk' || langParam === 'en') {
    return langParam
  }

  // Fall back to browser language
  const lang = navigator.language || navigator.userLanguage || 'en'
  // Check if Slovak (sk, sk-SK, etc.)
  if (lang.startsWith('sk') || lang.startsWith('cs')) {
    return 'sk'
  }
  return 'en'
}

const locale = getLocale()

export function t(key) {
  return translations[locale]?.[key] || translations.en[key] || key
}

export { locale }
