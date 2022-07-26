const crypto = require("crypto");
const dotenv = require("dotenv");
const jsonwebtoken = require("jsonwebtoken");
dotenv.config();

const SALT = process.env.SALT.toString("hex");

const hash = (password) => {
  return crypto.pbkdf2Sync(password, SALT, 1000, 64, `sha512`).toString(`hex`);
};

const validateHash = (password, already_hashed_password) => {
  var current_hash = crypto.pbkdf2Sync(password, SALT, 1000, 64, `sha512`).toString(`hex`);
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
