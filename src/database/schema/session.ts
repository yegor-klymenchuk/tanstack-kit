import { pgTable, text, timestamp, index, foreignKey, unique } from 'drizzle-orm/pg-core'
import { relations, sql } from 'drizzle-orm'
import { user } from './user'

export const session = pgTable(
  'session',
  {
    id: text().primaryKey().notNull(),
    expiresAt: timestamp({ withTimezone: true, mode: 'string' }).notNull(),
    token: text().notNull(),
    createdAt: timestamp({ withTimezone: true, mode: 'string' })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp({ withTimezone: true, mode: 'string' }).notNull(),
    ipAddress: text(),
    userAgent: text(),
    userId: text().notNull(),
  },
  (table) => [
    index('session_userId_idx').using('btree', table.userId.asc().nullsLast().op('text_ops')),
    foreignKey({
      columns: [table.userId],
      foreignColumns: [user.id],
      name: 'session_userId_fkey',
    }).onDelete('cascade'),
    unique('session_token_key').on(table.token),
  ],
)

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}))
