import { Request, Response, NextFunction } from 'express';
import { Schema } from 'joi';
import { HTTP_CODES } from '../utils/constants/http-codes';
import { GENERAL_MESSAGES } from '../utils/constants/messages';
import { ApiResponse } from '../types';

export const validateRequest = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.body);

    if (error) {
      const result: ApiResponse = {
        state: false,
        message: error.details[0]?.message || GENERAL_MESSAGES.INVALID_REQUEST,
      };

      res.status(HTTP_CODES.BAD_REQUEST).json(result);
      return;
    }

    next();
  };
};

export const validateQuery = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.query);

    if (error) {
      const result: ApiResponse = {
        state: false,
        message: error.details[0]?.message || GENERAL_MESSAGES.INVALID_REQUEST,
      };

      res.status(HTTP_CODES.BAD_REQUEST).json(result);
      return;
    }

    next();
  };
};

export const validateParams = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.params);

    if (error) {
      const result: ApiResponse = {
        state: false,
        message: error.details[0]?.message || GENERAL_MESSAGES.INVALID_REQUEST,
      };

      res.status(HTTP_CODES.BAD_REQUEST).json(result);
      return;
    }

    next();
  };
};
