// Error types for better error handling throughout the application

export interface BaseError {
  message: string
  code?: string | number
  timestamp?: string
}

export interface ApiError extends BaseError {
  status?: number
  statusText?: string
  data?: unknown
}

export interface ValidationError extends BaseError {
  field?: string
  value?: unknown
}

export interface NetworkError extends BaseError {
  isNetworkError: true
  status?: number
}

export interface AuthError extends BaseError {
  isAuthError: true
  needsReauth?: boolean
}

// Union type for all possible errors
export type AppError =
  | ApiError
  | ValidationError
  | NetworkError
  | AuthError
  | BaseError

// Error handler function type
export type ErrorHandler = (error: AppError) => void

// Result type for operations that can fail
export type Result<T, E = AppError> =
  | { success: true; data: T }
  | { success: false; error: E }

// Promise that resolves to a Result
export type SafePromise<T, E = AppError> = Promise<Result<T, E>>

// Error boundary state
export interface ErrorBoundaryState {
  hasError: boolean
  error: AppError | null
  errorInfo?: string
}

// HTTP status codes enum for better type safety
export enum HttpStatusCode {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405,
  CONFLICT = 409,
  UNPROCESSABLE_ENTITY = 422,
  INTERNAL_SERVER_ERROR = 500,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503,
  GATEWAY_TIMEOUT = 504,
}

// Error factory functions
export const createApiError = (
  message: string,
  status?: number,
  data?: unknown
): ApiError => ({
  message,
  status,
  data,
  timestamp: new Date().toISOString(),
})

export const createValidationError = (
  message: string,
  field?: string,
  value?: unknown
): ValidationError => ({
  message,
  field,
  value,
  timestamp: new Date().toISOString(),
})

export const createNetworkError = (
  message: string,
  status?: number
): NetworkError => ({
  message,
  status,
  isNetworkError: true,
  timestamp: new Date().toISOString(),
})

export const createAuthError = (
  message: string,
  needsReauth = false
): AuthError => ({
  message,
  isAuthError: true,
  needsReauth,
  timestamp: new Date().toISOString(),
})

// Type guards for error types
export const isApiError = (error: unknown): error is ApiError =>
  typeof error === 'object' &&
  error !== null &&
  'message' in error &&
  ('status' in error || 'data' in error)

export const isValidationError = (error: unknown): error is ValidationError =>
  typeof error === 'object' &&
  error !== null &&
  'message' in error &&
  'field' in error

export const isNetworkError = (error: unknown): error is NetworkError =>
  typeof error === 'object' &&
  error !== null &&
  'isNetworkError' in error &&
  (error as NetworkError).isNetworkError === true

export const isAuthError = (error: unknown): error is AuthError =>
  typeof error === 'object' &&
  error !== null &&
  'isAuthError' in error &&
  (error as AuthError).isAuthError === true
