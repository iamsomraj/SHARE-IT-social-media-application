import ENVIRONMENT from '../../server/utils/constants/environments';

/* BASE URL FOR SERVER */
export const BASE_URL = ENVIRONMENT.IS_DEVELOPMENT
  ? process.env.DEV_API
  : process.env.PROD_API;

/* BASE URL FOR PERSON ROUTES */
const PERSON_URL = `${BASE_URL}/persons`;
/* BASE URL FOR POST ROUTES */
const POST_URL = `${BASE_URL}/posts`;
/* BASE URL FOR AUTH ROUTES */
const AUTH_URL = `${BASE_URL}/auth`;

export const AUTHORIZE_USER_URL = `${AUTH_URL}/`;

export const REGISTER_URL = `${PERSON_URL}/`;
export const LOGIN_URL = `${PERSON_URL}/auth`;
export const FOLLOW_URL = `${PERSON_URL}/follow`;
export const UNFOLLOW_URL = `${PERSON_URL}/unfollow`;
export const GET_USER_PROFILE_URL = `${PERSON_URL}`;
export const SEARCH_PEOPLE_URL = `${PERSON_URL}/search`;

export const CREATE_POST_URL = `${POST_URL}/create`;
export const GET_POST_FEED_URL = `${POST_URL}/feed`;
export const GET_STORY_POSTS_URL = `${POST_URL}/stories`;
export const ADD_LIKE_URL = `${POST_URL}/like`;
export const REMOVE_LIKE_URL = `${POST_URL}/unlike`;
export const FETCH_POST_URL = `${POST_URL}`;
export const ADD_STORY_URL = `${POST_URL}/add-story`;
export const REMOVE_STORY_URL = `${POST_URL}/remove-story`;

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
});

/* ROUTES */
export const ROUTES = Object.freeze({
  FEED: 'feed',
  PROFILE: 'profile',
  SEARCH: 'search',
});

/* LOCAL STORAGE KEYS */
export const LOCAL_STORAGE_KEYS = Object.freeze({
  TOKEN: 'auth-token',
  USER: 'auth-user',
  THEME: 'color-theme',
});
