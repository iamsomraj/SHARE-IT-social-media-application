const { hash } = require("../helpers/index.js");

const person_data = [
  { name: "johndoe", email: "johndoe@example.com", password: hash("1234"), created_at: new Date().toISOString(), updated_at: new Date().toISOString(), is_deleted: false },
  { name: "janedoe", email: "janedoe@example.com", password: hash("1234"), created_at: new Date().toISOString(), updated_at: new Date().toISOString(), is_deleted: false },
  { name: "jamesdoe", email: "jamesdoe@example.com", password: hash("1234"), created_at: new Date().toISOString(), updated_at: new Date().toISOString(), is_deleted: false },
  { name: "adeledoe", email: "adeledoe@example.com", password: hash("1234"), created_at: new Date().toISOString(), updated_at: new Date().toISOString(), is_deleted: false },
];

const data = { person_data };

module.exports = data;
