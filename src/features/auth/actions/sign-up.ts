import { auth } from '@/utils/auth'
import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'

const signUpSchema = z.object({
  name: z.string().min(1),
  email: z.email(),
  password: z.string().min(8),
})

export const signUp = createServerFn()
  .inputValidator((data) => signUpSchema.parse(data))
  .handler(async ({ data }) => {
    const user = await auth.api.signUpEmail({
      body: {
        name: data.name,
        email: data.email,
        password: data.password,
      },
    })

    return user
  })
