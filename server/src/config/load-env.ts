/**
 * Side-effect module: import it first in local entry points
 * (dev server, seeder, knexfile) so `.env` is loaded before anything reads it.
 */
import { existsSync } from 'node:fs';

if (existsSync('.env')) {
  process.loadEnvFile('.env');
}
