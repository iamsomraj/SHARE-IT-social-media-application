import type { NextFunction, Request, Response } from 'express';
import { isProduction } from '../config/env';
import type { ApiResponse } from '../types';
import { HTTP_CODES } from '../utils/constants/http-codes';
import { GENERAL_MESSAGES } from '../utils/constants/messages';
import { HttpError } from '../utils/errors';

export const pageNotFound = (
  req: Request,
  _res: Response,
  next: NextFunction,
): void => {
  next(
    new HttpError(HTTP_CODES.NOT_FOUND, `Page Not Found - ${req.originalUrl}`),
  );
};

export const errorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  // Express identifies error handlers by arity, so `next` must stay.
  _next: NextFunction,
): void => {
  const isHttpError = err instanceof HttpError;
  const statusCode = isHttpError
    ? err.status
    : HTTP_CODES.INTERNAL_SERVER_ERROR;

  if (!isHttpError) {
    console.error(err);
  }

  // Never leak internal error details (SQL, stack traces) in production.
  const message =
    isHttpError || !isProduction()
      ? (err as Error).message || GENERAL_MESSAGES.SOMETHING_WENT_WRONG
      : GENERAL_MESSAGES.SOMETHING_WENT_WRONG;

  const result: ApiResponse<string> = {
    state: false,
    message,
    ...(isProduction() ? {} : { data: (err as Error).stack ?? '' }),
  };

  res.status(statusCode).json(result);
};
