import { createFileRoute } from '@tanstack/react-router'
import { useLingui } from '@lingui/react/macro'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  const { t } = useLingui()

  return (
    <div className="p-2">
      <h3>{t`Welcome Home!!!`}</h3>
    </div>
  )
}
