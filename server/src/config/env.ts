import { z } from 'zod';

const EnvSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  PORT: z.coerce.number().int().positive().default(4500),
  DATABASE_URL: z.url(),
  JWT_SECRET: z.string().min(32, 'JWT_SECRET must be at least 32 characters'),
  JWT_EXPIRATION_DURATION: z.string().default('7d'),
  /**
   * Comma-separated list of allowed client origins.
   * A `*` wildcard is supported, e.g. `https://share-it-social-*.vercel.app`.
   */
  CLIENT_ORIGINS: z
    .string()
    .default('http://localhost:3000')
    .transform(value =>
      value
        .split(',')
        .map(origin => origin.trim())
        .filter(Boolean),
    ),
});

export type Env = z.infer<typeof EnvSchema>;

let cachedEnv: Env | undefined;

export const env = (): Env => {
  if (!cachedEnv) {
    const result = EnvSchema.safeParse(process.env);
    if (!result.success) {
      throw new Error(
        `Invalid environment variables:\n${z.prettifyError(result.error)}`,
      );
    }
    cachedEnv = result.data;
  }
  return cachedEnv;
};

export const isProduction = (): boolean => env().NODE_ENV === 'production';
