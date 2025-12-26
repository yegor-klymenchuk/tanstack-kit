import { createFileRoute, redirect } from '@tanstack/react-router'
import { authenticated } from '@/middlewares/authenticated'
import { getSession } from '@/features/auth/actions/get-session'

export const Route = createFileRoute('/_authenticated')({
  server: {
    middleware: [authenticated],
  },
  beforeLoad: async () => {
    const session = await getSession()

    if (!session) {
      throw redirect({ to: '/sign-in' })
    }

    return { session }
  },
})
