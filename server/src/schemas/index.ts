import Joi from 'joi';
import { z } from 'zod';

// =========================
// JOI VALIDATION SCHEMAS
// =========================

// Auth validation schemas
export const authSchema = Joi.object({
  uuid: Joi.string().uuid().required(),
  token: Joi.string().required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Please provide a valid email address',
    'any.required': 'Email is required',
  }),
  password: Joi.string().min(4).required().messages({
    'string.min': 'Password must be at least 4 characters long',
    'any.required': 'Password is required',
  }),
});

export const registerSchema = Joi.object({
  name: Joi.string().min(4).max(50).required().messages({
    'string.min': 'Name must be at least 4 characters long',
    'string.max': 'Name cannot exceed 50 characters',
    'any.required': 'Name is required',
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Please provide a valid email address',
    'any.required': 'Email is required',
  }),
  password: Joi.string().min(4).required().messages({
    'string.min': 'Password must be at least 4 characters long',
    'any.required': 'Password is required',
  }),
});

// Person validation schemas
export const followSchema = Joi.object({
  uuid: Joi.string().uuid().required().messages({
    'string.uuid': 'Invalid person UUID format',
    'any.required': 'Person UUID is required',
  }),
});

export const searchPersonSchema = Joi.object({
  query: Joi.string().min(1).max(100).required().messages({
    'string.min': 'Search query cannot be empty',
    'string.max': 'Search query cannot exceed 100 characters',
    'any.required': 'Search query is required',
  }),
});

// Post validation schemas
export const createPostSchema = Joi.object({
  content: Joi.string().min(1).max(500).required().messages({
    'string.min': 'Post content cannot be empty',
    'string.max': 'Post content cannot exceed 500 characters',
    'any.required': 'Post content is required',
  }),
});

export const postActionSchema = Joi.object({
  postUUID: Joi.string().uuid().required().messages({
    'string.uuid': 'Invalid post UUID format',
    'any.required': 'Post UUID is required',
  }),
});

// UUID validation schema
export const uuidSchema = Joi.string().uuid().required().messages({
  'string.uuid': 'Invalid UUID format',
  'any.required': 'UUID is required',
});

// Pagination schema
export const paginationSchema = Joi.object({
  page: Joi.number().integer().min(1).default(1).messages({
    'number.integer': 'Page must be an integer',
    'number.min': 'Page must be at least 1',
  }),
  limit: Joi.number().integer().min(1).max(100).default(10).messages({
    'number.integer': 'Limit must be an integer',
    'number.min': 'Limit must be at least 1',
    'number.max': 'Limit cannot exceed 100',
  }),
});

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

// Common schemas
export const ZodUuidSchema = z.string().uuid('Invalid UUID format');

export const ZodPaginationSchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(10),
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

// =========================
// VALIDATION HELPERS
// =========================

export const validateWithJoi = <T>(schema: Joi.Schema, data: unknown): T => {
  const { error, value } = schema.validate(data);
  if (error) {
    throw new Error(error.details[0]?.message || 'Validation failed');
  }
  return value as T;
};

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
