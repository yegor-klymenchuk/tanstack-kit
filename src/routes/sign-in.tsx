import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { SignInForm } from '@/features/auth/components/sign-in-form'
import { authClient } from '@/utils/auth-client'

export const Route = createFileRoute('/sign-in')({
  component: RouteComponent,
})

function RouteComponent() {
  const session = authClient.useSession()

  React.useEffect(() => {
    if (session.isPending || session.isRefetching) {
      return
    }

    if (session.data) {
      return
    }

    authClient.oneTap({
      callbackURL: '/dashboard',
      onPromptNotification: (notification) => {
        console.warn(
          'Prompt was dismissed or skipped. Consider displaying an alternative sign-in option.',
          notification,
        )
      },
    })
  }, [session])

  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <SignInForm className="w-full max-w-sm" />
    </div>
  )
}
