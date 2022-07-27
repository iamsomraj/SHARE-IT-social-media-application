const crypto = require("crypto");
const dotenv = require("dotenv");
const jsonwebtoken = require("jsonwebtoken");
dotenv.config();

const BASE_RADIX_FOR_CRYPTO = "hex";
const BASE_DIGEST_ALGORITHM_FOR_CRYPTO = "sha512";
const BASE_ITERATIONS_FOR_CRYPTO = 1000;
const BASE_KEY_LENGTH_FOR_CRYPTO = 64;

const SALT = process.env.SALT.toString(BASE_RADIX_FOR_CRYPTO);

const hash = (password) => {
  return crypto.pbkdf2Sync(password, SALT, BASE_ITERATIONS_FOR_CRYPTO, BASE_KEY_LENGTH_FOR_CRYPTO, BASE_DIGEST_ALGORITHM_FOR_CRYPTO).toString(BASE_RADIX_FOR_CRYPTO);
};

const validateHash = (password, already_hashed_password) => {
  var current_hash = crypto.pbkdf2Sync(password, SALT, BASE_ITERATIONS_FOR_CRYPTO, BASE_KEY_LENGTH_FOR_CRYPTO, BASE_DIGEST_ALGORITHM_FOR_CRYPTO).toString(BASE_RADIX_FOR_CRYPTO);
  return current_hash === already_hashed_password;
};

const generateToken = (id) => {
  return jsonwebtoken.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  hash,
  validateHash,
  generateToken,
};
