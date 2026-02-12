import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

// Allow running `drizzle-kit generate` without a DATABASE_URL so migrations
// can be generated from the schema locally. Only `migrate` requires a DB URL.
const needsDatabase = process.argv.some((arg) => /migrate/.test(arg));

if (needsDatabase && !process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set in .env file (required for migrate)');
}

export default defineConfig({
  schema: './src/db/schema/index.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: process.env.DATABASE_URL
    ? { url: process.env.DATABASE_URL }
    : undefined,
});
