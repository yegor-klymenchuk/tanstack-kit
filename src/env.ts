import z from 'zod'

export const envSchema = z.object({
  // Better Auth
  BETTER_AUTH_URL: z.string(),
  BETTER_AUTH_SECRET: z.string(),

  // Google OAuth
  VITE_GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),

  // Database
  DATABASE_HOST: z.string(),
  DATABASE_PORT: z.coerce.number(),
  DATABASE_USERNAME: z.string(),
  DATABASE_PASSWORD: z.string(),
  DATABASE_NAME: z.string(),
})

export const env = envSchema.parse(process.env)