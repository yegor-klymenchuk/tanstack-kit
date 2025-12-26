import { createFileRoute, redirect } from '@tanstack/react-router'
import { authenticated } from '@/middlewares/authenticated'
import { auth } from '@/utils/auth'
import { getRequestHeaders } from '@tanstack/react-start/server'
import { createIsomorphicFn } from '@tanstack/react-start'

const getSession = createIsomorphicFn().server(async () => {
  return await auth.api.getSession({
    headers: getRequestHeaders(),
  })
})

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
