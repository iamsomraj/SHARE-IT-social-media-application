import type { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import type { ApiResponse } from '../types';
import { HTTP_CODES } from '../utils/constants/http-codes';
import { GENERAL_MESSAGES } from '../utils/constants/messages';

// =========================
// REQUEST SCHEMAS
// =========================

export const AuthSchema = z.object({
  uuid: z.uuid('Invalid UUID format'),
  token: z.string().min(1, 'Token is required'),
});

export const LoginSchema = z.object({
  email: z.email('Please provide a valid email address').toLowerCase(),
  password: z.string().min(4, 'Password must be at least 4 characters long'),
});

export const RegisterSchema = z.object({
  name: z
    .string()
    .trim()
    .min(4, 'Name must be at least 4 characters long')
    .max(50, 'Name cannot exceed 50 characters'),
  email: z.email('Please provide a valid email address').toLowerCase(),
  password: z
    .string()
    .min(4, 'Password must be at least 4 characters long')
    .max(128, 'Password cannot exceed 128 characters'),
});

export const CreatePostSchema = z.object({
  content: z
    .string()
    .trim()
    .min(1, 'Post content cannot be empty')
    .max(500, 'Post content cannot exceed 500 characters'),
});

export const SearchSchema = z.object({
  searchQuery: z
    .string()
    .trim()
    .min(1, 'Search query cannot be empty')
    .max(100, 'Search query cannot exceed 100 characters'),
});

export const UuidParamsSchema = z.object({
  uuid: z.uuid('Invalid UUID format'),
});

export const PostUuidParamsSchema = z.object({
  post_uuid: z.uuid('Invalid post UUID format'),
});

export const PaginationQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
});

export type AuthInput = z.infer<typeof AuthSchema>;
export type LoginInput = z.infer<typeof LoginSchema>;
export type RegisterInput = z.infer<typeof RegisterSchema>;
export type CreatePostInput = z.infer<typeof CreatePostSchema>;
export type SearchInput = z.infer<typeof SearchSchema>;
export type UuidParams = z.infer<typeof UuidParamsSchema>;
export type PostUuidParams = z.infer<typeof PostUuidParamsSchema>;
export type PaginationQuery = z.infer<typeof PaginationQuerySchema>;

// =========================
// VALIDATION MIDDLEWARE
// =========================

type RequestPart = 'body' | 'params' | 'query';

const formatIssues = (error: z.ZodError): string =>
  error.issues
    .map(issue =>
      issue.path.length
        ? `${issue.path.join('.')}: ${issue.message}`
        : issue.message,
    )
    .join(', ');

/**
 * Validates one part of the request against a Zod schema and replaces it
 * with the parsed (coerced, trimmed, defaulted) value.
 */
export const validate =
  (part: RequestPart, schema: z.ZodType) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req[part]);

    if (!result.success) {
      const response: ApiResponse = {
        state: false,
        message: formatIssues(result.error) || GENERAL_MESSAGES.INVALID_REQUEST,
      };
      res.status(HTTP_CODES.BAD_REQUEST).json(response);
      return;
    }

    // `req.query` is a getter in Express 5, so it has to be redefined.
    Object.defineProperty(req, part, {
      value: result.data,
      writable: true,
      enumerable: true,
      configurable: true,
    });
    next();
  };
