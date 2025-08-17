import {
  getHeaders,
  getWebRequest,
  setHeader,
} from '@tanstack/react-start/server'
import { parse, serialize } from 'cookie-es'

import { DEFAULT_LOCALE, isLocaleValid } from './i18n'

export function getLocaleFromRequest() {
  const headers = getHeaders()
  const request = getWebRequest()

  const url = new URL(request.url)
  const pathLocale = url.pathname.split('/')[1] ?? ''

  if (isLocaleValid(pathLocale)) {
    setHeader(
      'Set-Cookie',
      serialize('locale', pathLocale, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      }),
    )

    return pathLocale
  }
  const queryLocale = url.searchParams.get('locale') ?? ''

  if (isLocaleValid(queryLocale)) {
    setHeader(
      'Set-Cookie',
      serialize('locale', queryLocale, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      }),
    )

    return queryLocale
  }

  const cookie = parse(headers.cookie ?? '')
  if (cookie.locale && isLocaleValid(cookie.locale)) {
    return cookie.locale
  }

  // Mostly used for API requests
  if (headers['accept-language'] && isLocaleValid(headers['accept-language'])) {
    return headers['accept-language']
  }

  setHeader(
    'Set-Cookie',
    serialize('locale', DEFAULT_LOCALE, {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    }),
  )

  return DEFAULT_LOCALE
}
