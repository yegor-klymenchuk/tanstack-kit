import { auth } from '@/utils/auth'
import { createServerFn } from '@tanstack/react-start'
import { getRequestHeaders } from '@tanstack/react-start/server'

export const signOut = createServerFn().handler(async () => {
  return await auth.api.signOut({
    headers: getRequestHeaders(),
  })
})
