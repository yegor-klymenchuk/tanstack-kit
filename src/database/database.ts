import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import { user } from './schema/user'
import { session } from './schema/session'
import { account } from './schema/account'
import { verification } from './schema/verification'

const pool = new Pool({
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT || '5432'),
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
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
