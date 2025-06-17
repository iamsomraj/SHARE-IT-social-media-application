import crypto from 'crypto';
import * as jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Crypto configuration constants
const CRYPTO_CONFIG = {
  RADIX: 'hex' as const,
  ALGORITHM: 'sha512' as const,
  ITERATIONS: 1000,
  KEY_LENGTH: 64,
} as const;

// Environment variables validation
if (!process.env.SALT) {
  throw new Error('SALT environment variable is required');
}

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is required');
}

const SALT = process.env.SALT;
const JWT_SECRET = process.env.JWT_SECRET;

/**
 * Hash a password using PBKDF2
 * @param password - The password to hash
 * @returns The hashed password
 */
export const hash = (password: string): string => {
  return crypto
    .pbkdf2Sync(
      password,
      SALT,
      CRYPTO_CONFIG.ITERATIONS,
      CRYPTO_CONFIG.KEY_LENGTH,
      CRYPTO_CONFIG.ALGORITHM,
    )
    .toString(CRYPTO_CONFIG.RADIX);
};

/**
 * Validate a password against a hash
 * @param password - The password to validate
 * @param hashedPassword - The hash to validate against
 * @returns True if the password is valid
 */
export const validateHash = (
  password: string,
  hashedPassword: string,
): boolean => {
  const currentHash = crypto
    .pbkdf2Sync(
      password,
      SALT,
      CRYPTO_CONFIG.ITERATIONS,
      CRYPTO_CONFIG.KEY_LENGTH,
      CRYPTO_CONFIG.ALGORITHM,
    )
    .toString(CRYPTO_CONFIG.RADIX);

  return currentHash === hashedPassword;
};

/**
 * Generate a JWT token
 * @param id - The user ID to include in the token
 * @returns The JWT token
 */
export const generateToken = (id: number): string => {
  const payload = { id };

  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: '7d',
  });
};

/**
 * Verify a JWT token
 * @param token - The token to verify
 * @returns The decoded token payload
 */
export const verifyToken = (token: string): { id: number } => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: number };
    return decoded;
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};

/**
 * Generate a UUID v4
 * @returns A UUID v4 string
 */
export const generateUUID = (): string => {
  return crypto.randomUUID();
};

/**
 * Generate a secure random string
 * @param length - The length of the random string
 * @returns A secure random string
 */
export const generateSecureRandom = (length = 32): string => {
  return crypto.randomBytes(length).toString('hex');
};

/**
 * Sanitize a string for safe use in queries
 * @param input - The input string to sanitize
 * @returns The sanitized string
 */
export const sanitizeString = (input: string): string => {
  return input.trim().replace(/[<>]/g, '');
};

/**
 * Check if a string is a valid email
 * @param email - The email to validate
 * @returns True if the email is valid
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Check if a string is a valid UUID
 * @param uuid - The UUID to validate
 * @returns True if the UUID is valid
 */
export const isValidUUID = (uuid: string): boolean => {
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
};

/**
 * Format a date to ISO string
 * @param date - The date to format
 * @returns The formatted date string
 */
export const formatDate = (date: Date = new Date()): string => {
  return date.toISOString();
};

/**
 * Get current timestamp
 * @returns Current timestamp as ISO string
 */
export const getCurrentTimestamp = (): string => {
  return new Date().toISOString();
};
