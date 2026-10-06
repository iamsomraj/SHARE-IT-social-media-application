import './src/config/load-env';
import type { Knex } from 'knex';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is required to run migrations');
}

const config: Knex.Config = {
  client: 'pg',
  connection: process.env.DATABASE_URL,
  pool: { min: 0, max: 5 },
  migrations: {
    directory: './src/migrations',
    extension: 'ts',
    loadExtensions: ['.ts'],
  },
};

export default config;
