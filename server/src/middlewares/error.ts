import { Request, Response, NextFunction } from 'express';
import { IS_PRODUCTION, IS_DEVELOPMENT } from '../utils/constants/environments';
import { HTTP_CODES } from '../utils/constants/http-codes';
import { GENERAL_MESSAGES } from '../utils/constants/messages';
import { ApiResponse } from '../types';

export const pageNotFound = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const error = new Error(`Page Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

export const errorHandler = (
  err: Error & { status?: number },
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  const statusCode = !err.status
    ? HTTP_CODES.INTERNAL_SERVER_ERROR
    : err.status;

  const result: ApiResponse = {
    state: false,
    message: err?.message || GENERAL_MESSAGES.SOMETHING_WENT_WRONG,
    data: IS_PRODUCTION ? '' : err.stack,
  };

  if (IS_DEVELOPMENT) console.error(result);

  res.status(statusCode).json(result);
};
