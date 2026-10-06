import {
  randomBytes,
  scrypt as scryptCallback,
  timingSafeEqual,
  type BinaryLike,
} from 'node:crypto';
import { promisify } from 'node:util';
import jwt, { type SignOptions } from 'jsonwebtoken';
import { env } from '../../config/env';
import type { TokenPayload } from '../../types';

const scrypt = promisify(scryptCallback) as (
  password: BinaryLike,
  salt: BinaryLike,
  keylen: number,
) => Promise<Buffer>;

const KEY_LENGTH = 64;
const SALT_BYTES = 16;
const JWT_ISSUER = 'share-it-api';
const JWT_AUDIENCE = 'share-it-client';

/**
 * Hashes a password with scrypt and a per-password random salt.
 * Output format: `<salt-hex>:<hash-hex>`.
 */
export const hashPassword = async (password: string): Promise<string> => {
  const salt = randomBytes(SALT_BYTES).toString('hex');
  const derivedKey = await scrypt(password, salt, KEY_LENGTH);
  return `${salt}:${derivedKey.toString('hex')}`;
};

/** Constant-time comparison of a password against a stored scrypt hash. */
export const verifyPassword = async (
  password: string,
  storedHash: string,
): Promise<boolean> => {
  const [salt, key] = storedHash.split(':');
  if (!salt || !key) {
    return false;
  }
  const storedKey = Buffer.from(key, 'hex');
  const derivedKey = await scrypt(password, salt, storedKey.length);
  return (
    storedKey.length === derivedKey.length &&
    timingSafeEqual(storedKey, derivedKey)
  );
};

export const generateToken = (userId: number): string => {
  const payload: TokenPayload = { id: userId };
  return jwt.sign(payload, env().JWT_SECRET, {
    expiresIn: env().JWT_EXPIRATION_DURATION as NonNullable<
      SignOptions['expiresIn']
    >,
    issuer: JWT_ISSUER,
    audience: JWT_AUDIENCE,
  });
};

/**
 * Verifies a JWT and returns its payload.
 * @throws when the token is invalid, expired or malformed
 */
export const verifyToken = (token: string): TokenPayload => {
  const decoded = jwt.verify(token, env().JWT_SECRET, {
    issuer: JWT_ISSUER,
    audience: JWT_AUDIENCE,
  });

  if (
    typeof decoded !== 'object' ||
    typeof (decoded as Partial<TokenPayload>).id !== 'number'
  ) {
    throw new Error('Invalid token payload');
  }

  return { id: (decoded as TokenPayload).id };
};
