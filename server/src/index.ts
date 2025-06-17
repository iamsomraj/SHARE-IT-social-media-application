import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import colors from 'colors';

// Import database configuration
import './config/db-config';

// Import middleware
import { pageNotFound, errorHandler } from './middlewares/error';

// Import constants
import { IS_PRODUCTION } from './utils/constants/environments';

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// CORS configuration
const corsOrigins = [
  IS_PRODUCTION
    ? process.env.PRODUCTION_CLIENT_ORIGIN
    : process.env.DEVELOPMENT_CLIENT_ORIGIN,
].filter((origin): origin is string => Boolean(origin));

app.use(
  cors({
    origin: corsOrigins.length > 0 ? corsOrigins : true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
    optionsSuccessStatus: 200,
  }),
);

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Security headers
app.use((_req: Request, res: Response, next: NextFunction) => {
  res.header('X-Content-Type-Options', 'nosniff');
  res.header('X-Frame-Options', 'DENY');
  res.header('X-XSS-Protection', '1; mode=block');
  next();
});

// Import routes
import personRoutes from '@/routes/personRoutes';
import postRoutes from '@/routes/postRoutes';
import authRoutes from '@/routes/authRoutes';

// Define API routes
app.use('/api/v1/persons', personRoutes);
app.use('/api/v1/posts', postRoutes);
app.use('/api/v1/auth', authRoutes);

// Health check endpoint
app.get('/', (_req: Request, res: Response) => {
  res.json({
    message: 'SHARE IT Social Media API is running',
    version: '2.1.0',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  });
});

// Health check endpoint
app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
  });
});

// Error handling middleware (must be last)
app.use(pageNotFound);
app.use(errorHandler);

// Server configuration
const PORT = parseInt(process.env.PORT || '4500', 10);
const NODE_ENV = process.env.NODE_ENV || 'development';

// Start server
const server = app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(
    colors.bold.blue.bgWhite(
      `🚀 Server running in ${NODE_ENV} mode on port ${PORT}`,
    ),
  );
  // eslint-disable-next-line no-console
  console.log(colors.bold.green(`📱 API URL: http://localhost:${PORT}`));
  // eslint-disable-next-line no-console
  console.log(
    colors.bold.cyan(`🏥 Health Check: http://localhost:${PORT}/health`),
  );
});

// Graceful shutdown
process.on('SIGTERM', () => {
  // eslint-disable-next-line no-console
  console.log(colors.yellow('SIGTERM signal received. Closing HTTP server.'));
  server.close(() => {
    // eslint-disable-next-line no-console
    console.log(colors.red('HTTP server closed.'));
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  // eslint-disable-next-line no-console
  console.log(colors.yellow('SIGINT signal received. Closing HTTP server.'));
  server.close(() => {
    // eslint-disable-next-line no-console
    console.log(colors.red('HTTP server closed.'));
    process.exit(0);
  });
});

// Handle uncaught exceptions
process.on('uncaughtException', (error: Error) => {
  // eslint-disable-next-line no-console
  console.error(colors.red('Uncaught Exception:'), error);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on(
  'unhandledRejection',
  (reason: unknown, promise: Promise<unknown>) => {
    // eslint-disable-next-line no-console
    console.error(
      colors.red('Unhandled Rejection at:'),
      promise,
      'reason:',
      reason,
    );
    process.exit(1);
  },
);

export { app };
export default app;
