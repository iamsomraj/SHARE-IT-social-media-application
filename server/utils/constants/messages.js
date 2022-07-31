const PERSON_SUCCESS_MESSAGES = Object.freeze({
  LOGIN_SUCCESS: "Login successful!",
  REGISTER_SUCCESS: "Registration successful!",
  FOLLOW_SUCCESS: "Follow successful!",
  LIKE_SUCCESS: "Like successful!",
  POST_SUCCESS: "Post successful!",
});

const PERSON_ERROR_MESSAGES = Object.freeze({
  LOGIN_FAILURE: "Login failed!",
  PROVIDE_EMAIL_AND_PASSWORD: "Please, provide Email and Password!",
  PROVIDE_NAME_EMAIL_AND_PASSWORD: "Please, provide Name, Email and Password!",
  USER_NOT_FOUND: "User not found!",
  USER_ALREADY_EXISTS: "User already exists!",
  REGISTER_FAILURE: "Registration failed!",
  FOLLOW_FAILURE: "Follow failed!",
  LIKE_FAILURE: "Like failed!",
  POST_FAILURE: "Post failed!",
  WRONG_CREDENTIALS: "Wrong Credentials!",
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
  SOMETHING_WENT_WRONG: "Something went wrong!",
});

module.exports = {
  PERSON_SUCCESS_MESSAGES,
  PERSON_ERROR_MESSAGES,
  GENERAL_MESSAGES,
  AUTH_ERROR_MESSAGES,
};
