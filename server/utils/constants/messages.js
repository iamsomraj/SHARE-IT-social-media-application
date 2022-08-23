const PERSON_SUCCESS_MESSAGES = Object.freeze({
  LOGIN_SUCCESS: "Login successful!",
  FETCH_POST_SUCCESS: "Post fetched successfully!",
  FETCH_PEOPLE_SUCCESS: "People fetched successfully!",
  FETCH_USER_DATA_SUCCESS: "User data fetched successfully!",
  REGISTER_SUCCESS: "Registration successful!",
  FETCH_PERSON_PROFILE_SUCCESS: "Person profile fetched successfully!",
  FOLLOW_SUCCESS: "Follow successful!",
  SEARCH_SUCCESS: "Search successful!",
  UNFOLLOW_SUCCESS: "Unfollow successful!",
  LIKE_SUCCESS: "Like successful!",
  UNLIKE_SUCCESS: "Unlike successful!",
  FAVOURITE_SUCCESS: "Favourite successful!",
  UNFAVOURITE_SUCCESS: "Unfavourite successful!",
  POST_SUCCESS: "Post successful!",
  PERSON_FEED_SUCCESS: "Person feed fetched successfully!",
});

const PERSON_ERROR_MESSAGES = Object.freeze({
  LOGIN_FAILURE: "Login failed!",
  PROVIDE_SEARCH_QUERY: "Provide search query!",
  PROVIDE_EMAIL_AND_PASSWORD: "Please, provide Email and Password!",
  PROVIDE_NAME_EMAIL_AND_PASSWORD: "Please, provide Name, Email and Password!",
  INVALID_NAME_EMAIL_OR_PASSWORD: "Name, Email or Password has less than 4 characters!",
  PROVIDE_USER_DETAILS: "Please, provide User details!",
  INVALID_USER_DETAILS: "Invalid User details!",
  USER_NOT_FOUND: "User not found!",
  USER_ALREADY_EXISTS: "User already exists!",
  REGISTER_FAILURE: "Registration failed!",
  FOLLOWING_FAILURE: "Following failed!",
  SEARCH_FAILURE: "Search failed due to an issue!",
  UNFOLLOWING_FAILURE: "Unfollowing failed!",
  LIKE_FAILURE: "Like failed!",
  UNLIKE_FAILURE: "Unlike failed!",
  FAVOURITE_FAILURE: "Favourite failed!",
  UNFAVOURITE_FAILURE: "Unfavourite failed!",
  FETCH_USER_DATA_FAILURE: "Fetching user data failed!",
  REGISTER_USER_FAILURE: "Registration failed!",
  POST_FAILURE: "Post failed!",
  UPDATE_PERSON_STATS_FAILURE: "Updating person stats failed!",
  NO_PEOPLE_FOUND: "No people found!",
  WRONG_CREDENTIALS: "Wrong Credentials!",
  POST_FEED_FAILURE: "Post feed failed!",
  POST_FAVOURITE_FAILURE: "Post favourite failed!",
});

const AUTH_SUCCESS_MESSAGES = Object.freeze({
  AUTHORIZE_SUCCESS: "Authorization successful!",
});

const AUTH_ERROR_MESSAGES = Object.freeze({
  NO_AUTHORIZATION_HEADER: "No Authorization Header provided!",
  INVALID_TOKEN_FORMAT: "Invalid token format!",
  INVALID_TOKEN: "No token found!",
  PROVIDE_TOKEN: "Please, provide token!",
  VERIFY_TOKEN_FAILURE: "Token verification failed!",
  UUID_MISMATCH: "Credentials mismatch!",
  ID_MISMATCH: "Credentials mismatch!",
});

const GENERAL_MESSAGES = Object.freeze({
  INVALID_REQUEST: "Request is invalid!",
  POST_NOT_FOUND: "Post not found!",
  PERSON_NOT_FOUND: "Person not found!",
  SOMETHING_WENT_WRONG: "Something went wrong!",
  PROVIDE_POST_DETAILS: "Please, provide post details!",
  PROVIDE_PERSON_DETAILS: "Please, provide person details!",
  ALREADY_LIKED_POST: "You already liked this post!",
  ALREADY_FAVOURITE_POST: "You have already marked this post as favourite!",
  NOT_FAVOURITE_YET: "You have not marked this post as favourite yet!",
  NOT_LIKED_YET: "You have not liked this post yet!",
  AUTHORIZE_SUCCESS: "Authorization successful!",
  AUTHORIZE_FAILURE: "Authorization failed!",
});

module.exports = {
  PERSON_SUCCESS_MESSAGES,
  PERSON_ERROR_MESSAGES,
  GENERAL_MESSAGES,
  AUTH_ERROR_MESSAGES,
  AUTH_SUCCESS_MESSAGES,
};
