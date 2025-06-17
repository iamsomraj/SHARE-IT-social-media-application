import Knex from 'knex';
import { Model } from 'objection';
import dotenv from 'dotenv';

dotenv.config();

// Ensure DATABASE_URL is available
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is required');
}

const knex = Knex({
  client: 'pg',
  connection: process.env.DATABASE_URL,
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    directory: '../migrations',
    extension: 'js',
  },
  seeds: {
    directory: '../seeds',
    extension: 'js',
  },
});

// Initialize Objection.js with Knex
Model.knex(knex);

export default knex;
