import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';
import { HTTP_CODES } from '@/utils/constants/http-codes';
import { GENERAL_MESSAGES } from '@/utils/constants/messages';
import { ApiResponse } from '@/types';

// =========================
// ZOD VALIDATION SCHEMAS
// =========================

// Auth schemas
export const ZodAuthSchema = z.object({
  uuid: z.string().uuid('Invalid UUID format'),
  token: z.string().min(1, 'Token is required'),
});

export const ZodLoginSchema = z.object({
  email: z.string().email('Please provide a valid email address'),
  password: z.string().min(4, 'Password must be at least 4 characters long'),
});

export const ZodRegisterSchema = z.object({
  name: z
    .string()
    .min(4, 'Name must be at least 4 characters long')
    .max(50, 'Name cannot exceed 50 characters'),
  email: z.string().email('Please provide a valid email address'),
  password: z.string().min(4, 'Password must be at least 4 characters long'),
});

// Person schemas
export const ZodFollowSchema = z.object({
  uuid: z.string().uuid('Invalid person UUID format'),
});

export const ZodSearchPersonSchema = z.object({
  query: z
    .string()
    .min(1, 'Search query cannot be empty')
    .max(100, 'Search query cannot exceed 100 characters'),
});

export const ZodUserDataSchema = z.object({
  id: z.number().int().positive(),
  uuid: z.string().uuid(),
  name: z.string().min(1),
  email: z.string().email(),
});

// Post schemas
export const ZodCreatePostSchema = z.object({
  content: z
    .string()
    .min(1, 'Post content cannot be empty')
    .max(500, 'Post content cannot exceed 500 characters'),
});

export const ZodPostActionSchema = z.object({
  postUUID: z.string().uuid('Invalid post UUID format'),
});

export const ZodFetchPostSchema = z.object({
  uuid: z.string().uuid('Invalid post UUID format'),
});

// Common schemas
export const ZodUuidSchema = z.string().uuid('Invalid UUID format');

export const ZodPaginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
});

// Params schemas
export const ZodUuidParamsSchema = z.object({
  uuid: z.string().uuid('Invalid UUID format'),
});

export const ZodPostUuidParamsSchema = z.object({
  post_uuid: z.string().uuid('Invalid post UUID format'),
});

// Query schemas
export const ZodPaginationQuerySchema = z.object({
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).max(100).optional().default(10),
});

export const ZodSearchQuerySchema = z.object({
  query: z
    .string()
    .min(1, 'Search query cannot be empty')
    .max(100, 'Search query cannot exceed 100 characters'),
});

// =========================
// TYPE EXPORTS
// =========================

// Infer types from Zod schemas
export type AuthInput = z.infer<typeof ZodAuthSchema>;
export type LoginInput = z.infer<typeof ZodLoginSchema>;
export type RegisterInput = z.infer<typeof ZodRegisterSchema>;
export type FollowInput = z.infer<typeof ZodFollowSchema>;
export type SearchPersonInput = z.infer<typeof ZodSearchPersonSchema>;
export type CreatePostInput = z.infer<typeof ZodCreatePostSchema>;
export type PostActionInput = z.infer<typeof ZodPostActionSchema>;
export type PaginationInput = z.infer<typeof ZodPaginationSchema>;
export type UuidParamsInput = z.infer<typeof ZodUuidParamsSchema>;
export type PostUuidParamsInput = z.infer<typeof ZodPostUuidParamsSchema>;
export type PaginationQueryInput = z.infer<typeof ZodPaginationQuerySchema>;
export type SearchQueryInput = z.infer<typeof ZodSearchQuerySchema>;
export type UserDataInput = z.infer<typeof ZodUserDataSchema>;

// =========================
// ZOD VALIDATION MIDDLEWARE
// =========================

export const validateZodRequest = <T>(schema: z.ZodSchema<T>) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      const result = schema.safeParse(req.body);

      if (!result.success) {
        const errorMessage = result.error.errors
          .map(err => `${err.path.join('.')}: ${err.message}`)
          .join(', ');

        const response: ApiResponse = {
          state: false,
          message: errorMessage || GENERAL_MESSAGES.INVALID_REQUEST,
        };

        res.status(HTTP_CODES.BAD_REQUEST).json(response);
        return;
      }

      // Attach validated data to request
      req.body = result.data;
      next();
    } catch (error) {
      const response: ApiResponse = {
        state: false,
        message: GENERAL_MESSAGES.INVALID_REQUEST,
      };

      res.status(HTTP_CODES.BAD_REQUEST).json(response);
    }
  };
};

export const validateZodQuery = <T>(schema: z.ZodSchema<T>) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      const result = schema.safeParse(req.query);

      if (!result.success) {
        const errorMessage = result.error.errors
          .map(err => `${err.path.join('.')}: ${err.message}`)
          .join(', ');

        const response: ApiResponse = {
          state: false,
          message: errorMessage || GENERAL_MESSAGES.INVALID_REQUEST,
        };

        res.status(HTTP_CODES.BAD_REQUEST).json(response);
        return;
      }

      // Attach validated data to request
      req.query = result.data as any;
      next();
    } catch (error) {
      const response: ApiResponse = {
        state: false,
        message: GENERAL_MESSAGES.INVALID_REQUEST,
      };

      res.status(HTTP_CODES.BAD_REQUEST).json(response);
    }
  };
};

export const validateZodParams = <T>(schema: z.ZodSchema<T>) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      const result = schema.safeParse(req.params);

      if (!result.success) {
        const errorMessage = result.error.errors
          .map(err => `${err.path.join('.')}: ${err.message}`)
          .join(', ');

        const response: ApiResponse = {
          state: false,
          message: errorMessage || GENERAL_MESSAGES.INVALID_REQUEST,
        };

        res.status(HTTP_CODES.BAD_REQUEST).json(response);
        return;
      }

      // Attach validated data to request
      req.params = result.data as any;
      next();
    } catch (error) {
      const response: ApiResponse = {
        state: false,
        message: GENERAL_MESSAGES.INVALID_REQUEST,
      };

      res.status(HTTP_CODES.BAD_REQUEST).json(response);
    }
  };
};

// =========================
// VALIDATION HELPERS
// =========================

export const validateWithZod = <T>(
  schema: z.ZodSchema<T>,
  data: unknown,
): T => {
  const result = schema.safeParse(data);
  if (!result.success) {
    throw new Error(result.error.errors[0]?.message || 'Validation failed');
  }
  return result.data;
};

export const safeValidateWithZod = <T>(
  schema: z.ZodSchema<T>,
  data: unknown,
): { success: true; data: T } | { success: false; error: string } => {
  const result = schema.safeParse(data);
  if (!result.success) {
    return {
      success: false,
      error: result.error.errors[0]?.message || 'Validation failed',
    };
  }
  return { success: true, data: result.data };
};

// =========================
// LEGACY JOI SCHEMAS (for backward compatibility)
// =========================
