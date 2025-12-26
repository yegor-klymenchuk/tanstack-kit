import { getRequestHeaders } from '@tanstack/react-start/server'
import { createIsomorphicFn } from '@tanstack/react-start'
import { auth } from '@/utils/auth'

export const getSession = createIsomorphicFn().server(async () => {
  return await auth.api.getSession({
    headers: getRequestHeaders(),
  })
})
