const PERSON_SUCCESS_MESSAGES = Object.freeze({
  LOGIN_SUCCESS: "Login successful!",
  REGISTER_SUCCESS: "Registration successful!",
  FOLLOW_SUCCESS: "Follow successful!",
  LIKE_SUCCESS: "Like successful!",
  POST_SUCCESS: "Post successful!",
});

const PERSON_ERROR_MESSAGES = Object.freeze({
  LOGIN_FAILURE: "Login failed!",
  PROVIDE_EMAIL_AND_PASSWORD: "Please, provide email and password!",
  REGISTER_FAILURE: "Registration failed!",
  FOLLOW_FAILURE: "Follow failed!",
  LIKE_FAILURE: "Like failed!",
  POST_FAILURE: "Post failed!",
});

const GENERAL_MESSAGES = Object.freeze({
  INVALID_REQUEST: "Request is invalid!",
});

module.exports = {
  PERSON_SUCCESS_MESSAGES,
  PERSON_ERROR_MESSAGES,
  GENERAL_MESSAGES,
};
