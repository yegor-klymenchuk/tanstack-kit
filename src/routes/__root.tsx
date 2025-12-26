import * as React from 'react'
import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/integrations/tanstack-query'
import { Toaster } from '@/components/ui/sonner'
import { authClient } from '@/utils/auth-client'

import appCss from '../styles.css?url'

export const Route = createRootRoute({
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
        title: 'TanStack Start Starter',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),

  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
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
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          {children}
          <Toaster />
          <TanStackDevtools
            config={{
              position: 'bottom-right',
            }}
            plugins={[
              {
                name: 'Tanstack Router',
                render: <TanStackRouterDevtoolsPanel />,
              },
            ]}
          />
        </QueryClientProvider>
        <Scripts />
      </body>
    </html>
  )
}
