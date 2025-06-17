require('dotenv').config();
require('ts-node/register');

const knex = {
  client: 'pg',
  connection: process.env.DATABASE_URL,
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    directory: './src/migrations',
    extension: 'ts',
    loadExtensions: ['.ts'],
  },
  seeds: {
    directory: './src/seeds',
    extension: 'ts',
    loadExtensions: ['.ts'],
  },
};

module.exports = knex;
