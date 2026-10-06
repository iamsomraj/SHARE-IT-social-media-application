import './config/load-env';
import app from './app';
import knex from './config/db-config';
import { env } from './config/env';

const { PORT, NODE_ENV } = env();

const server = app.listen(PORT, () => {
  console.info(`🚀 Server running in ${NODE_ENV} mode on port ${PORT}`);
  console.info(`🏥 Health check: http://localhost:${PORT}/health`);
});

const shutdown = (signal: NodeJS.Signals): void => {
  console.info(`${signal} received, closing HTTP server.`);
  server.close(() => {
    void knex.destroy().finally(() => process.exit(0));
  });
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
