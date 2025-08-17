import { type I18n, Messages } from '@lingui/core'
import { I18nProvider } from '@lingui/react'
import type { AnyRouter } from '@tanstack/react-router'
import {
  Fragment,
  type JSX,
  type PropsWithChildren,
  type ReactNode,
} from 'react'

type AdditionalOptions = {
  WrapProvider?: (props: { children: ReactNode }) => JSX.Element
}

export type ValidateRouter<TRouter extends AnyRouter> =
  NonNullable<TRouter['options']['context']> extends {
    i18n: I18n
  }
    ? TRouter
    : never

export function routerWithLingui<TRouter extends AnyRouter>(
  router: ValidateRouter<TRouter>,
  i18n: I18n,
  additionalOpts?: AdditionalOptions,
): TRouter {
  const ogOptions = router.options

  router.options = {
    ...router.options,
    dehydrate: () => {
      return {
        ...ogOptions.dehydrate?.(),
        dehydratedI18n: {
          locale: i18n.locale,
          messages: i18n.messages,
        },
      }
    },
    hydrate: (dehydrated: {
      dehydratedI18n: { locale: string; messages: Messages }
    }) => {
      ogOptions.hydrate?.(dehydrated)
      // On the client, hydrate the i18n catalog with the dehydrated data
      i18n.loadAndActivate({
        locale: dehydrated.dehydratedI18n.locale,
        messages: dehydrated.dehydratedI18n.messages,
      })
    },
    context: {
      ...ogOptions.context,
      i18n,
    },
    Wrap: ({ children }: PropsWithChildren) => {
      const OuterWrapper = additionalOpts?.WrapProvider || Fragment
      const OGWrap = ogOptions.Wrap || Fragment

      return (
        <OuterWrapper>
          <I18nProvider i18n={i18n}>
            <OGWrap>{children}</OGWrap>
          </I18nProvider>
        </OuterWrapper>
      )
    },
  }

  return router
}
