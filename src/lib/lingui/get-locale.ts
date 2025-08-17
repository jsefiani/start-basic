import { createServerFn } from '@tanstack/react-start'
import { getCookie, getHeaders } from '@tanstack/react-start/server'

import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from './i18n'

export const getLocale = createServerFn().handler(async () => {
  const headers = getHeaders()

  const localeFromCookie = getCookie('locale')

  if (localeFromCookie && SUPPORTED_LOCALES.includes(localeFromCookie)) {
    return localeFromCookie
  }

  const locale = headers['accept-language']?.split(',')[0]
  const normalizedLocale = locale?.split('-')[0]

  if (normalizedLocale && SUPPORTED_LOCALES.includes(normalizedLocale)) {
    return normalizedLocale
  }

  return DEFAULT_LOCALE
})
