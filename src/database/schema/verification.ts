import { pgTable, text, timestamp, index } from 'drizzle-orm/pg-core'
import { sql } from 'drizzle-orm'

export const verification = pgTable(
  'verification',
  {
    id: text().primaryKey().notNull(),
    identifier: text().notNull(),
    value: text().notNull(),
    expiresAt: timestamp({ withTimezone: true, mode: 'string' }).notNull(),
    createdAt: timestamp({ withTimezone: true, mode: 'string' })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp({ withTimezone: true, mode: 'string' })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => [index('verification_identifier_idx').using('btree', table.identifier.asc().nullsLast().op('text_ops'))],
)
