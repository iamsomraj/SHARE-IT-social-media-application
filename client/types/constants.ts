// Type-safe constants for the application

// Route constants with strict typing
export const ROUTES = Object.freeze({
  FEED: 'feed',
  PROFILE: 'profile',
  SEARCH: 'search',
  HOME: 'index',
  REGISTER: 'register',
  LOGIN: 'index',
} as const)

export type RouteKey = keyof typeof ROUTES
export type RouteValue = (typeof ROUTES)[RouteKey]

// Message constants with strict typing
export const MESSAGES = Object.freeze({
  LOGIN_SUCCESS: 'You are now logged in!',
  REGISTER_SUCCESS: 'Your account is now active!',
  LOGOUT_SUCCESS: 'You have been logged out successfully!',
  POST_CREATE_SUCCESS: 'Your post has been created!',
  POST_LIKE_SUCCESS: 'You have liked this post!',
  POST_LIKE_FAILURE: 'There was an error liking this post!',
  POST_UNLIKE_SUCCESS: 'You have unliked this post!',
  POST_UNLIKE_FAILURE: 'There was an error unliking this post!',
  POST_CREATE_FAILURE: 'There was an error creating your post!',
  PERSON_FOLLOW_SUCCESS: 'You have followed this person!',
  PERSON_FOLLOW_FAILURE: 'There was an error following this person!',
  PERSON_UNFOLLOW_SUCCESS: 'You have unfollowed this person!',
  PERSON_UNFOLLOW_FAILURE: 'There was an error unfollowing this person!',
  SEARCH_SUCCESS: 'Search results found!',
  SEARCH_FAILURE: 'There was an error searching!',
  ADD_STORY_SUCCESS: 'You added this post as story!',
  ADD_STORY_FAILURE: 'Failed to add this post as story!',
  REMOVE_STORY_SUCCESS: 'Your story has been removed!',
  REMOVE_STORY_FAILURE: 'Failed to remove story!',
} as const)

export type MessageKey = keyof typeof MESSAGES
export type MessageValue = (typeof MESSAGES)[MessageKey]

// Local storage keys with strict typing
export const LOCAL_STORAGE_KEYS = Object.freeze({
  TOKEN: 'share-it-token',
  USER: 'share-it-user',
  THEME: 'share-it-theme',
} as const)

export type LocalStorageKey = keyof typeof LOCAL_STORAGE_KEYS
export type LocalStorageValue = (typeof LOCAL_STORAGE_KEYS)[LocalStorageKey]

// API endpoint structure types
export interface ApiEndpoints {
  // Auth endpoints
  AUTHORIZE_USER: string

  // Person endpoints
  LOGIN: string
  REGISTER: string
  GET_USER_DATA: string
  FOLLOW: string
  UNFOLLOW: string
  GET_USER_PROFILE: string
  SEARCH_PEOPLE: string
  GET_PEOPLE: string

  // Post endpoints
  CREATE_POST: string
  GET_POST_FEED: string
  GET_STORY_POSTS: string
  ADD_LIKE: string
  REMOVE_LIKE: string
  FETCH_POST: string
  ADD_STORY: string
  REMOVE_STORY: string
}

// API configuration
export interface ApiConfig {
  baseUrl: string
  timeout: number
  retries: number
}

// Environment types
export type Environment = 'development' | 'production' | 'staging' | 'test'

// Runtime config types
export interface RuntimeConfig {
  public: {
    devApi: string
    prodApi: string
    environment: Environment
  }
}

// HTTP methods
export const HTTP_METHODS = Object.freeze({
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
  HEAD: 'HEAD',
  OPTIONS: 'OPTIONS',
} as const)

export type HttpMethod = (typeof HTTP_METHODS)[keyof typeof HTTP_METHODS]

// Content types
export const CONTENT_TYPES = Object.freeze({
  JSON: 'application/json',
  FORM_DATA: 'multipart/form-data',
  URL_ENCODED: 'application/x-www-form-urlencoded',
  TEXT: 'text/plain',
  HTML: 'text/html',
} as const)

export type ContentType = (typeof CONTENT_TYPES)[keyof typeof CONTENT_TYPES]

// Response status types
export const RESPONSE_STATUS = Object.freeze({
  SUCCESS: 'success',
  ERROR: 'error',
  LOADING: 'loading',
  IDLE: 'idle',
} as const)

export type ResponseStatus =
  (typeof RESPONSE_STATUS)[keyof typeof RESPONSE_STATUS]

// Validation rules
export const VALIDATION_RULES = Object.freeze({
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD_MIN_LENGTH: 8,
  POST_MAX_LENGTH: 160,
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50,
} as const)

// Animation durations
export const ANIMATION_DURATION = Object.freeze({
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
} as const)

export type AnimationDuration =
  (typeof ANIMATION_DURATION)[keyof typeof ANIMATION_DURATION]

// Breakpoints
export const BREAKPOINTS = Object.freeze({
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
} as const)

export type Breakpoint = keyof typeof BREAKPOINTS

// Z-index levels
export const Z_INDEX = Object.freeze({
  DROPDOWN: 1000,
  MODAL: 1050,
  POPOVER: 1060,
  TOOLTIP: 1070,
  TOAST: 1080,
} as const)

export type ZIndex = (typeof Z_INDEX)[keyof typeof Z_INDEX]
