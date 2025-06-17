import { Request, Response } from 'express';

// =========================
// BASE ENTITY TYPES
// =========================

export interface BaseEntity {
  id: number;
  created_at: string;
  updated_at: string;
}

export interface EntityWithUuid extends BaseEntity {
  uuid: string;
}

export interface AuditableEntity extends BaseEntity {
  created_by: number;
  updated_by: number;
}

// =========================
// AUTH TYPES
// =========================

export interface AuthRequest extends Request {
  user?: {
    id: number;
    uuid: string;
    name: string;
    email: string;
  };
}

export interface AuthCredentials {
  uuid: string;
  token: string;
}

export interface TokenPayload {
  id: number;
  iat?: number;
  exp?: number;
}

// =========================
// PERSON TYPES
// =========================

export interface Person extends EntityWithUuid {
  name: string;
  email: string;
  password: string;
  is_deleted: boolean;
}

export interface PersonStats extends BaseEntity {
  person_id: number;
  post_count: number;
  follower_count: number;
  following_count: number;
}

export interface PersonWithStats extends Omit<Person, 'password'> {
  person_stats: PersonStats;
}

export interface PersonFollower extends AuditableEntity {
  follower_id: number;
  followed_id: number;
}

export interface PersonFollowing extends AuditableEntity {
  follower_id: number;
  followed_id: number;
}

// =========================
// POST TYPES
// =========================

export interface Post extends EntityWithUuid, AuditableEntity {
  content: string;
  is_deleted: boolean;
}

export interface PostStats extends BaseEntity {
  post_id: number;
  like_count: number;
  comment_count: number;
  story_count: number;
}

export interface PostLike extends AuditableEntity {
  post_id: number;
  person_id: number;
}

export interface PostStory extends BaseEntity {
  post_id: number;
  person_id: number;
}

export interface PostWithDetails extends Post {
  creator: Omit<Person, 'password'>;
  post_likes: PostLike[];
  post_stats: PostStats;
  post_stories?: PostStory[];
}

// =========================
// API RESPONSE TYPES
// =========================

export interface ApiResponse<T = unknown> {
  state: boolean;
  message: string;
  data?: T;
}

export interface SuccessResponse<T> extends ApiResponse<T> {
  state: true;
  data: T;
}

export interface ErrorResponse extends ApiResponse<never> {
  state: false;
}

export type ApiResult<T> = SuccessResponse<T> | ErrorResponse;

// =========================
// REQUEST/RESPONSE TYPES
// =========================

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  user: Omit<Person, 'password'>;
  token: string;
}

export interface FollowRequest {
  uuid: string;
}

export interface CreatePostRequest {
  content: string;
}

export interface PostActionRequest {
  postUUID: string;
}

export interface SearchRequest {
  query: string;
}

export interface PaginationQuery {
  page?: number;
  limit?: number;
}

// =========================
// SERVICE LAYER TYPES
// =========================

export interface ServiceResponse<T = unknown> {
  success: boolean;
  data?: T;
  message: string;
  statusCode?: number;
}

export interface ServiceError {
  message: string;
  statusCode: number;
}

// =========================
// ENVIRONMENT TYPES
// =========================

export interface Environment {
  NODE_ENV: 'development' | 'production' | 'test';
  PORT: string;
  DATABASE_URL: string;
  JWT_SECRET: string;
  SALT: string;
  PRODUCTION_CLIENT_ORIGIN?: string;
  DEVELOPMENT_CLIENT_ORIGIN?: string;
}

// =========================
// DATABASE TYPES
// =========================

export interface DatabaseConfig {
  client: 'pg';
  connection: string;
}

export interface QueryResult<T = unknown> {
  rows: T[];
  rowCount: number;
}

// =========================
// UTILITY TYPES
// =========================

export type OptionalExcept<T, K extends keyof T> = Partial<T> & Pick<T, K>;

export type WithoutTimestamps<T> = Omit<T, 'created_at' | 'updated_at'>;

export type CreateEntity<T extends BaseEntity> = Omit<
  T,
  'id' | 'created_at' | 'updated_at'
>;

export type UpdateEntity<T extends BaseEntity> = Partial<
  Omit<T, 'id' | 'created_at' | 'updated_at'>
>;

// =========================
// MIDDLEWARE TYPES
// =========================

export interface CustomRequest extends Request {
  user?: {
    id: number;
    uuid: string;
    name: string;
    email: string;
  };
}

export interface CustomResponse extends Response {
  // Add any custom response properties if needed
}

export type AsyncMiddleware = (
  req: CustomRequest,
  res: CustomResponse,
  next: (error?: Error) => void,
) => Promise<void>;

export type Controller = (
  req: CustomRequest,
  res: CustomResponse,
) => Promise<void>;

// =========================
// ERROR TYPES
// =========================

export interface AppError extends Error {
  statusCode: number;
  isOperational: boolean;
}

export interface ValidationErrorDetail {
  field: string;
  message: string;
  value?: unknown;
}

export interface ValidationError extends AppError {
  details: ValidationErrorDetail[];
}

// =========================
// CONSTANTS
// =========================

export const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
} as const;

export type HttpMethod = (typeof HTTP_METHODS)[keyof typeof HTTP_METHODS];

export const CONTENT_TYPES = {
  JSON: 'application/json',
  TEXT: 'text/plain',
  HTML: 'text/html',
} as const;

export type ContentType = (typeof CONTENT_TYPES)[keyof typeof CONTENT_TYPES];
