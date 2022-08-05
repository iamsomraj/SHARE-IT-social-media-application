const PERSON_SUCCESS_MESSAGES = Object.freeze({
  LOGIN_SUCCESS: "Login successful!",
  FETCH_PEOPLE_SUCCESS: "People fetched successfully!",
  FETCH_USER_DATA_SUCCESS: "User data fetched successfully!",
  REGISTER_SUCCESS: "Registration successful!",
  FETCH_PERSON_PROFILE_SUCCESS: "Person profile fetched successfully!",
  FOLLOW_SUCCESS: "Follow successful!",
  LIKE_SUCCESS: "Like successful!",
  POST_SUCCESS: "Post successful!",
  PERSON_FEED_SUCCESS: "Person feed fetched successfully!",
});

const PERSON_ERROR_MESSAGES = Object.freeze({
  LOGIN_FAILURE: "Login failed!",
  PROVIDE_EMAIL_AND_PASSWORD: "Please, provide Email and Password!",
  PROVIDE_NAME_EMAIL_AND_PASSWORD: "Please, provide Name, Email and Password!",
  INVALID_NAME_EMAIL_OR_PASSWORD: "Name, Email or Password has less than 4 characters!",
  PROVIDE_USER_DETAILS: "Please, provide User details!",
  INVALID_USER_DETAILS: "Invalid User details!",
  USER_NOT_FOUND: "User not found!",
  USER_ALREADY_EXISTS: "User already exists!",
  REGISTER_FAILURE: "Registration failed!",
  FOLLOWING_FAILURE: "Following failed!",
  LIKE_FAILURE: "Like failed!",
  FETCH_USER_DATA_FAILURE: "Fetching user data failed!",
  REGISTER_USER_FAILURE: "Registration failed!",
  POST_FAILURE: "Post failed!",
  UPDATE_PERSON_STATS_FAILURE: "Updating person stats failed!",
  NO_PEOPLE_FOUND: "No people found!",
  WRONG_CREDENTIALS: "Wrong Credentials!",
  POST_FEED_FAILURE: "Post feed failed!",
});

const AUTH_ERROR_MESSAGES = Object.freeze({
  NO_AUTHORIZATION_HEADER: "No Authorization Header provided!",
  INVALID_TOKEN_FORMAT: "Invalid token format!",
  INVALID_TOKEN: "Invalid token!",
  PROVIDE_TOKEN: "Please, provide token!",
  VERIFY_TOKEN_FAILURE: "Token verification failed!",
});

const GENERAL_MESSAGES = Object.freeze({
  INVALID_REQUEST: "Request is invalid!",
  POST_NOT_FOUND: "Post not found!",
  SOMETHING_WENT_WRONG: "Something went wrong!",
  PROVIDE_POST_DETAILS: "Please, provide post details!",
  ALREADY_LIKED_POST: "You already liked this post!",
});

module.exports = {
  PERSON_SUCCESS_MESSAGES,
  PERSON_ERROR_MESSAGES,
  GENERAL_MESSAGES,
  AUTH_ERROR_MESSAGES,
};
