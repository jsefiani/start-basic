import type { I18n } from '@lingui/core'
import { useLingui } from '@lingui/react'
import {
  createRootRouteWithContext,
  HeadContent,
  notFound,
  Outlet,
  redirect,
  Scripts,
} from '@tanstack/react-router'
import type { ReactNode } from 'react'

import { getLocale } from '../lib/lingui/get-locale'
import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from '../lib/lingui/i18n'

type RouterContext = {
  i18n: I18n
}

export const Route = createRootRouteWithContext<RouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'A title',
      },
    ],
    links: [],
  }),
  notFoundComponent: () => <div>Not Found</div>,
  beforeLoad: async ({ location, matches, context }) => {
    if (
      location.pathname.startsWith('/api/') ||
      location.pathname.includes('.')
    ) {
      return
    }

    const localeMatch = matches.find(m => m.routeId === '/$locale/')
    const searchStr = typeof location.search === 'string' ? location.search : ''

    if (localeMatch?.params?.locale) {
      const { locale } = localeMatch.params

      if (!SUPPORTED_LOCALES.includes(locale)) {
        throw notFound()
      }
    } else {
      const segments = location.pathname.split('/').filter(Boolean)

      if (segments.length === 0) {
        const locale = await getLocale()

        throw redirect({
          href: `/${locale}${searchStr}`,
          replace: true,
        })
      }

      const [potentialLocale, ...restSegments] = segments

      if (!SUPPORTED_LOCALES.includes(potentialLocale)) {
        const restPath =
          restSegments.length > 0 ? `/${restSegments.join('/')}` : ''
        throw redirect({
          href: `/${DEFAULT_LOCALE}${restPath}${searchStr}`,
          replace: true,
        })
      }
    }
  },
  component: RootComponent,
})

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  )
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  const { i18n } = useLingui()

  return (
    <html lang={i18n.locale}>
      <head>
        <HeadContent />
      </head>
      <body className="flex flex-col min-h-full grow">
        {children}
        <Scripts />
      </body>
    </html>
  )
}
