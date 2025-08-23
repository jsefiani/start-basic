import { useLingui } from "@lingui/react/macro"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute('/$locale/')({
    component: HomeScreen,
    loader: async ({ context }) => {
      return {
        title: context.i18n.t(
          `A title`,
        ),
        description: context.i18n.t(
          `A description`,
        ),
      }
    },
    head: ({ loaderData }) => {
      return {
        meta: [
          {
            title: loaderData?.title,
          },
          {
            description: loaderData?.description,
          },
        ],
      }
    },
  })

  function HomeScreen() {
    const { t } = useLingui()

    return <div>{t`Welcome Home!!!`}</div>
  }