import { Response, NextFunction } from 'express';
import { verifyToken } from '@/utils/helpers';
import { HTTP_CODES } from '@/utils/constants/http-codes';
import { GENERAL_MESSAGES } from '@/utils/constants/messages';
import { CustomRequest, ApiResponse } from '@/types';

const BEARER_PREFIX = 'Bearer ';

const createUnauthorizedResponse = (): ApiResponse => ({
  state: false,
  message: GENERAL_MESSAGES.UNAUTHORIZED,
});

const extractTokenFromHeader = (authHeader?: string): string | null => {
  if (!authHeader?.startsWith(BEARER_PREFIX)) {
    return null;
  }
  return authHeader.slice(BEARER_PREFIX.length);
};

/**
 * Authentication middleware to verify JWT tokens
 */
export const authenticateToken = (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
): void => {
  const token = extractTokenFromHeader(req.headers.authorization);

  if (!token) {
    res.status(HTTP_CODES.UNAUTHORIZED).json(createUnauthorizedResponse());
    return;
  }

  try {
    const decoded = verifyToken(token);

    req.user = {
      id: decoded.id,
      uuid: '',
      name: '',
      email: '',
    };

    next();
  } catch {
    res.status(HTTP_CODES.UNAUTHORIZED).json(createUnauthorizedResponse());
  }
};

/**
 * Optional authentication middleware - doesn't fail if no token
 */
export const optionalAuth = (
  req: CustomRequest,
  _res: Response,
  next: NextFunction,
): void => {
  const token = extractTokenFromHeader(req.headers.authorization);

  if (token) {
    try {
      const decoded = verifyToken(token);
      req.user = {
        id: decoded.id,
        uuid: '',
        name: '',
        email: '',
      };
    } catch {
      // Token is invalid, but we continue without user context
    }
  }

  next();
};

/**
 * Rate limiting middleware (simple implementation)
 */
const requestCounts = new Map<string, { count: number; resetTime: number }>();

export const rateLimit = (maxRequests = 100, windowMs = 15 * 60 * 1000) => {
  return (req: CustomRequest, res: Response, next: NextFunction): void => {
    const ip = req.ip || req.connection.remoteAddress || 'unknown';
    const now = Date.now();

    // Clean up old entries
    for (const [key, value] of requestCounts.entries()) {
      if (now > value.resetTime) {
        requestCounts.delete(key);
      }
    }

    const current = requestCounts.get(ip);

    if (!current) {
      requestCounts.set(ip, { count: 1, resetTime: now + windowMs });
      next();
      return;
    }

    if (now > current.resetTime) {
      requestCounts.set(ip, { count: 1, resetTime: now + windowMs });
      next();
      return;
    }

    if (current.count >= maxRequests) {
      const result: ApiResponse = {
        state: false,
        message: 'Too many requests, please try again later',
      };
      res.status(HTTP_CODES.BAD_REQUEST).json(result);
      return;
    }

    current.count++;
    next();
  };
};
