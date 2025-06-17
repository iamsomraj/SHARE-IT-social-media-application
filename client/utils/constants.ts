// Routes configuration
export const ROUTES = Object.freeze({
  FEED: 'feed',
  PROFILE: 'profile',
  SEARCH: 'search',
  HOME: 'index',
  REGISTER: 'register',
  LOGIN: 'index',
} as const)

// Messages configuration
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

// Local storage keys
export const LOCAL_STORAGE_KEYS = Object.freeze({
  TOKEN: 'share-it-token',
  USER: 'share-it-user',
  THEME: 'share-it-theme',
} as const)

// API Base URLs - these will be constructed dynamically using runtime config
// Use getApiEndpoints() function to get the complete API URLs
const PERSON_BASE = `/persons`
const POST_BASE = `/posts`
const AUTH_BASE = `/auth`

// Helper function to get API base URL based on environment
export const getApiBaseUrl = (): string => {
  if (import.meta.client) {
    const config = useRuntimeConfig()
    return process.env.NODE_ENV === 'production'
      ? config.public.prodApi
      : config.public.devApi
  }
  return ''
}

// Function to get complete API endpoints with base URL
export const getApiEndpoints = () => {
  const baseUrl = getApiBaseUrl()

  return {
    // Auth endpoints
    AUTHORIZE_USER: `${baseUrl}${AUTH_BASE}/`,

    // Person endpoints
    LOGIN: `${baseUrl}${PERSON_BASE}/auth`,
    REGISTER: `${baseUrl}${PERSON_BASE}/`,
    GET_USER_DATA: `${baseUrl}${PERSON_BASE}/`,
    FOLLOW: `${baseUrl}${PERSON_BASE}/follow`,
    UNFOLLOW: `${baseUrl}${PERSON_BASE}/unfollow`,
    GET_USER_PROFILE: `${baseUrl}${PERSON_BASE}`,
    SEARCH_PEOPLE: `${baseUrl}${PERSON_BASE}/search/`,
    GET_PEOPLE: `${baseUrl}${PERSON_BASE}/people`,

    // Post endpoints
    CREATE_POST: `${baseUrl}${POST_BASE}/create`,
    GET_POST_FEED: `${baseUrl}${POST_BASE}/feed`,
    GET_STORY_POSTS: `${baseUrl}${POST_BASE}/stories`,
    ADD_LIKE: `${baseUrl}${POST_BASE}/like`,
    REMOVE_LIKE: `${baseUrl}${POST_BASE}/unlike`,
    FETCH_POST: `${baseUrl}${POST_BASE}`,
    ADD_STORY: `${baseUrl}${POST_BASE}/add-story`,
    REMOVE_STORY: `${baseUrl}${POST_BASE}/remove-story`,
  }
}
