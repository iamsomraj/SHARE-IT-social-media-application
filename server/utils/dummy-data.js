const { hash } = require("./index.js");

const person_data = [
  { name: "johndoe", email: "johndoe@example.com", password: hash("1234") },
  { name: "janedoe", email: "janedoe@example.com", password: hash("1234") },
  { name: "amydoe", email: "amydoe@example.com", password: hash("1234") },
];
module.exports = {
  person_data,
};
