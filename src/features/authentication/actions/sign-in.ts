import { auth } from '@/utils/auth'
import { createServerFn } from '@tanstack/react-start'
import { getRequestHeaders } from '@tanstack/react-start/server'
import { z } from 'zod'

const signInSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
})

export const signIn = createServerFn()
  .inputValidator((data) => signInSchema.parse(data))
  .handler(async ({ data }) => {
    const user = await auth.api.signInEmail({
      body: {
        email: data.email,
        password: data.password,
        rememberMe: true,
      },
      headers: getRequestHeaders(),
    })
    return user
  })
