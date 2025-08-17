import { createRouter as createTanStackRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import { I18n } from '@lingui/core'
import { routerWithLingui } from './lib/lingui/router-plugin'

export function createRouter({
  i18n,
}: {
  i18n: I18n
}) {
  const router = routerWithLingui(
    createTanStackRouter({
      routeTree,
      defaultPreload: 'intent',
      scrollRestoration: true,
      context: {
        i18n,
      },
    }),
    i18n,
  )

  return router
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof createRouter>
  }
}
