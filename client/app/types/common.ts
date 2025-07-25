export interface BaseEntity {
  id: number
  created_at: string
  updated_at: string
}

export interface EntityWithUuid extends BaseEntity {
  uuid: string
}

export interface AuditableEntity extends BaseEntity {
  created_by: number
  updated_by: number
}

export interface LoadingState {
  loading: boolean
}

export interface ErrorState {
  error: string | null
}

export interface ApiResponse<T = never> {
  success: boolean
  data?: T
  error?: string
  message?: string
  state?: boolean
}

export interface SuccessApiResponse<T> extends ApiResponse<T> {
  success: true
  data: T
  state: true
}

export interface ErrorApiResponse extends ApiResponse<never> {
  success: false
  error: string
  state: false
}

export type ApiResult<T> = SuccessApiResponse<T> | ErrorApiResponse

export interface AsyncOperation<T = void> {
  success: boolean
  data?: T
  error?: string
}

export interface PaginationMeta {
  page: number
  limit: number
  total: number
  totalPages: number
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  meta?: PaginationMeta
}

// Generic form state
export interface FormState<T = Record<string, unknown>> {
  data: T
  errors: Partial<Record<keyof T, string>>
  loading: boolean
  touched: Partial<Record<keyof T, boolean>>
}

// Event types for better type safety
export type InputEvent = Event & {
  target: HTMLInputElement
}

export type TextAreaEvent = Event & {
  target: HTMLTextAreaElement
}

export type FormEvent = Event & {
  target: HTMLFormElement
}

export type ClickEvent = MouseEvent & {
  target: HTMLElement
}

// Theme types
export type ThemeMode = 'light' | 'dark'

// Toast types
export type ToastType = 'success' | 'error' | 'warning' | 'info'

export interface ToastMessage {
  id: string
  message: string
  type: ToastType
  duration?: number
}

// Component prop types
export interface BaseComponentProps {
  class?: string
  id?: string
}

export interface LoadableComponentProps extends BaseComponentProps {
  loading?: boolean
}

export interface DisableableComponentProps extends BaseComponentProps {
  disabled?: boolean
}

// Button variant types
export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'danger'

// Input types
export type InputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url'

// Status types
export type StatusType = 'active' | 'inactive' | 'pending' | 'deleted'

// Sort direction
export type SortDirection = 'asc' | 'desc'

// Generic key-value pair
export interface KeyValuePair<T = string> {
  key: string
  value: T
}

// Date range
export interface DateRange {
  startDate: string
  endDate: string
}

// Filter types
export interface BaseFilter {
  search?: string
  sortBy?: string
  sortDirection?: SortDirection
  page?: number
  limit?: number
}

// Component emit types
export interface EmitFunction<T extends Record<string, unknown[]>> {
  <K extends keyof T>(event: K, ...args: T[K]): void
}

// Server response interfaces for better type safety
export interface ServerResponse<T = never> {
  data?: T
  state: boolean
  message: string
}

export interface ServerSuccessResponse<T> extends ServerResponse<T> {
  data: T
  state: true
}

export interface ServerErrorResponse extends ServerResponse<never> {
  state: false
  message: string
}

// Union type for server responses
export type ServerResult<T> = ServerSuccessResponse<T> | ServerErrorResponse

// Enhanced error handling types
export interface TypedError {
  name: string
  message: string
  stack?: string
  cause?: unknown
}

// Store method result types for better type safety
export interface StoreMethodResult<TData = void> {
  success: boolean
  data?: TData
  error?: string
  message?: string
}

// Async store operation wrapper
export type AsyncStoreResult<TData = void> = Promise<StoreMethodResult<TData>>

// Generic store state interface
export interface BaseStoreState {
  loading: boolean
  error: string | null
  initialized: boolean
}

// API call configuration
export interface ApiCallConfig {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  headers?: Record<string, string>
  body?: unknown
  timeout?: number
  retries?: number
}

// Data validation result
export interface ValidationResult {
  isValid: boolean
  errors: string[]
  warnings?: string[]
}

// File upload types
export interface FileUploadConfig {
  maxSize: number
  allowedTypes: string[]
  multiple?: boolean
}

export interface UploadResult {
  success: boolean
  fileUrl?: string
  error?: string
}

// HTTP request types
export interface RequestHeaders {
  headers: {
    Authorization: string
    [key: string]: string
  }
}

// HTTP response types
export interface HttpResponse<T = unknown> {
  data: T
  status: number
  statusText: string
  headers: Record<string, string>
}
