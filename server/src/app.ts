import cors, { type CorsOptions } from 'cors';
import express, { type Request, type Response } from 'express';
import helmet from 'helmet';
import './config/db-config';
import { env } from './config/env';
import { errorHandler, pageNotFound } from './middlewares/error';
import authRoutes from './routes/authRoutes';
import personRoutes from './routes/personRoutes';
import postRoutes from './routes/postRoutes';

const escapeRegExp = (value: string): string =>
  value.replace(/[.+?^${}()|[\]\\]/g, '\\$&');

const toOriginMatcher = (pattern: string): string | RegExp =>
  pattern.includes('*')
    ? new RegExp(`^${escapeRegExp(pattern).replace(/\*/g, '[a-z0-9-]+')}$`)
    : pattern;

const corsOptions: CorsOptions = {
  origin: env().CLIENT_ORIGINS.map(toOriginMatcher),
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true,
};

const app = express();

app.disable('x-powered-by');
app.set('trust proxy', 1);
app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json({ limit: '100kb' }));

app.use('/api/v1/persons', personRoutes);
app.use('/api/v1/posts', postRoutes);
app.use('/api/v1/auth', authRoutes);

app.get('/', (_req: Request, res: Response) => {
  res.json({
    message: 'SHARE IT Social Media API is running',
    version: '3.0.0',
    timestamp: new Date().toISOString(),
  });
});

app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.use(pageNotFound);
app.use(errorHandler);

export default app;
