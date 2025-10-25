import type { SQLocal } from 'sqlocal';

export async function initSchema(db: SQLocal) {
	await db.sql`
    CREATE TABLE IF NOT EXISTS items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      checked INTEGER NOT NULL DEFAULT 0
    )
  `;
}
