import { env } from '@/env'
import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import { user } from './schema/user'
import { session } from './schema/session'
import { account } from './schema/account'
import { verification } from './schema/verification'

const pool = new Pool({
  host: env.DATABASE_HOST,
  port: env.DATABASE_PORT,
  user: env.DATABASE_USERNAME,
  password: env.DATABASE_PASSWORD,
  database: env.DATABASE_NAME,
})

export const db = drizzle({
  client: pool,
  schema: {
    user,
    session,
    account,
    verification,
  },
})
