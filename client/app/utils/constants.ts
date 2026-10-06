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

/** API paths, relative to `runtimeConfig.public.apiBase`. */
export const API_ROUTES = Object.freeze({
  AUTHORIZE_USER: '/auth/',

  LOGIN: '/persons/auth',
  REGISTER: '/persons/',
  GET_USER_DATA: '/persons/',
  FOLLOW: (uuid: string) => `/persons/follow/${uuid}`,
  UNFOLLOW: (uuid: string) => `/persons/unfollow/${uuid}`,
  GET_USER_PROFILE: (uuid: string) => `/persons/${uuid}`,
  SEARCH_PEOPLE: '/persons/search/',
  GET_PEOPLE: '/persons/people',

  CREATE_POST: '/posts/create',
  GET_POST_FEED: '/posts/feed',
  GET_STORY_POSTS: '/posts/stories',
  ADD_LIKE: (uuid: string) => `/posts/like/${uuid}`,
  REMOVE_LIKE: (uuid: string) => `/posts/unlike/${uuid}`,
  FETCH_POST: (uuid: string) => `/posts/${uuid}`,
  ADD_STORY: (uuid: string) => `/posts/add-story/${uuid}`,
  REMOVE_STORY: (uuid: string) => `/posts/remove-story/${uuid}`,
} as const)
