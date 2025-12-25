import { pgTable, unique, text, boolean, timestamp } from 'drizzle-orm/pg-core'
import { relations, sql } from 'drizzle-orm'
import { session } from './session'
import { account } from './account'

export const user = pgTable(
  'user',
  {
    id: text().primaryKey().notNull(),
    name: text().notNull(),
    email: text().notNull(),
    emailVerified: boolean().notNull(),
    image: text(),
    createdAt: timestamp({ withTimezone: true, mode: 'string' })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp({ withTimezone: true, mode: 'string' })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => [unique('user_email_key').on(table.email)],
)

export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),
}))
