import Knex from 'knex';
import { Model } from 'objection';
import { env } from './env';

/**
 * Small pool: on Vercel each function instance holds its own pool,
 * and the Neon pooler (PgBouncer) multiplexes connections upstream.
 */
const knex = Knex({
  client: 'pg',
  connection: env().DATABASE_URL,
  pool: { min: 0, max: 5 },
});

Model.knex(knex);

export default knex;
