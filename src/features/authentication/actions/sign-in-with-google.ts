import { authClient } from '@/utils/auth-client'

export const signInWithGoogle = async () => {
  return await authClient.signIn.social({
    provider: 'google',
    callbackURL: "/dashboard",
  })
}
