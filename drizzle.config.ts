import { defineConfig } from 'drizzle-kit'
import * as dotenv from 'dotenv'

dotenv.config()

export default defineConfig({
  out: './drizzle',
  schema: './src/schema/*',
  dialect: 'postgresql',
  dbCredentials: {
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT || '5433'),
    user: process.env.DATABASE_USERNAME || 'tanstack-kit',
    password: process.env.DATABASE_PASSWORD || '123456789',
    database: process.env.DATABASE_NAME || 'test',
    ssl: false,
  },
  verbose: true,
  strict: true,
})
