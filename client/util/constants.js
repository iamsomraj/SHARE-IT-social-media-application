import ENVIRONMENT from '../../server/utils/constants/environments';

export const getHeaders = (token) => {
  return {
    headers: {
      Authorization: `Bearer ${token ? token : ''}`,
    },
  };
};

/* BASE URL FOR SERVER */
export const BASE_URL =
  process.env.NODE_ENV === ENVIRONMENT.PRODUCTION
    ? process.env.PROD_API
    : process.env.DEV_API;

/* BASE URL FOR PERSON ROUTES */
const PERSON_URL = `${BASE_URL}/persons`;
/* BASE URL FOR POST ROUTES */
const POST_URL = `${BASE_URL}/posts`;

export const REGISTER_URL = `${PERSON_URL}/`;
export const LOGIN_URL = `${PERSON_URL}/auth`;
export const FOLLOW_URL = `${PERSON_URL}/follow`;
export const GET_PEOPLE_URL = `${PERSON_URL}/people`;
export const GET_PERSON_URL = `${PERSON_URL}`;

export const CREATE_POST_URL = `${POST_URL}/create`;
export const GET_POST_FEED_URL = `${POST_URL}/feed`;
export const ADD_LIKE_URL = `${POST_URL}/like`;
export const REMOVE_LIKE_URL = `${POST_URL}/unlike`;

export const MESSAGES = Object.freeze({
  LOGIN_SUCCESS: 'You have successfully logged in!',
  REGISTER_SUCCESS: 'You have successfully registered!',
  LOGOUT_SUCCESS: 'You have been logged out successfully!',
  POST_CREATE_SUCCESS: 'Your post has been created successfully!',
  POST_LIKE_SUCCESS: 'You have liked this post!',
  POST_LIKE_FAILURE: 'There was an error liking this post!',
  POST_UNLIKE_SUCCESS: 'You have unliked this post!',
  POST_UNLIKE_FAILURE: 'There was an error unliking this post!',
  POST_CREATE_FAILURE: 'There was an error creating your post!',
});
