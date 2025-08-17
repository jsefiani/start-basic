import { type I18n } from '@lingui/core'

export const locales = {
  en: 'English',
  fr: 'Français',
  nl: 'Nederlands',
}

export const SUPPORTED_LOCALES = Object.keys(locales)

export const isLocaleValid = (locale: string) =>
  Object.keys(locales).includes(locale)

export const DEFAULT_LOCALE = 'en'

/**
 * We do a dynamic import of just the catalog that we need
 * @param locale any locale string
 */
export async function dynamicActivate(i18n: I18n, locale: string) {
  const { messages } = await import(`../../locales/${locale}/messages.po`)
  i18n.loadAndActivate({ locale, messages })
}
