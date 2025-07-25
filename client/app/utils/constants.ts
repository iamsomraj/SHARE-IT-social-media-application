import type { ApiEndpoints } from '~/types/constants'

export const ROUTES = Object.freeze({
  FEED: 'feed',
  PROFILE: 'profile',
  SEARCH: 'search',
  HOME: 'index',
  REGISTER: 'register',
  LOGIN: 'index',
} as const)

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

export const LOCAL_STORAGE_KEYS = Object.freeze({
  TOKEN: 'share-it-token',
  USER: 'share-it-user',
  THEME: 'share-it-theme',
} as const)

const PERSON_BASE = `/persons`
const POST_BASE = `/posts`
const AUTH_BASE = `/auth`

export const getApiBaseUrl = (): string => {
  if (import.meta.client) {
    const config = useRuntimeConfig()
    return config.public.nodeEnv === 'production'
      ? config.public.prodApi
      : config.public.devApi
  }
  return ''
}

export const getApiEndpoints = (): ApiEndpoints => {
  const baseUrl = getApiBaseUrl()

  return {
    AUTHORIZE_USER: `${baseUrl}${AUTH_BASE}/`,

    LOGIN: `${baseUrl}${PERSON_BASE}/auth`,
    REGISTER: `${baseUrl}${PERSON_BASE}/`,
    GET_USER_DATA: `${baseUrl}${PERSON_BASE}/`,
    FOLLOW: `${baseUrl}${PERSON_BASE}/follow`,
    UNFOLLOW: `${baseUrl}${PERSON_BASE}/unfollow`,
    GET_USER_PROFILE: `${baseUrl}${PERSON_BASE}`,
    SEARCH_PEOPLE: `${baseUrl}${PERSON_BASE}/search/`,
    GET_PEOPLE: `${baseUrl}${PERSON_BASE}/people`,

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
