import type { NextFunction, Request, Response } from 'express';
import type { ApiResponse, AuthUser } from '../types';
import { HTTP_CODES } from '../utils/constants/http-codes';
import { GENERAL_MESSAGES } from '../utils/constants/messages';
import { HttpError } from '../utils/errors';
import { verifyToken } from '../utils/helpers';

const BEARER_PREFIX = 'Bearer ';

const extractBearerToken = (authHeader?: string): string | null =>
  authHeader?.startsWith(BEARER_PREFIX)
    ? authHeader.slice(BEARER_PREFIX.length)
    : null;

/** Rejects the request unless it carries a valid bearer JWT. */
export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const token = extractBearerToken(req.headers.authorization);

  try {
    if (!token) {
      throw new Error('Missing token');
    }
    req.user = { id: verifyToken(token).id };
    next();
  } catch {
    const result: ApiResponse = {
      state: false,
      message: GENERAL_MESSAGES.UNAUTHORIZED,
    };
    res.status(HTTP_CODES.UNAUTHORIZED).json(result);
  }
};

/** Returns the authenticated user; use only behind `authenticateToken`. */
export const requireUser = (req: Request): AuthUser => {
  if (!req.user) {
    throw new HttpError(HTTP_CODES.UNAUTHORIZED, GENERAL_MESSAGES.UNAUTHORIZED);
  }
  return req.user;
};
