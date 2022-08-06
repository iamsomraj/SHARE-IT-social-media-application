const { hash } = require("../helpers/index.js");

const person_data = [
  { name: "John Doe", email: "johndoe@example.com", password: hash("1234"), created_at: new Date().toISOString(), updated_at: new Date().toISOString(), is_deleted: false },
  { name: "Jane Doe", email: "janedoe@example.com", password: hash("1234"), created_at: new Date().toISOString(), updated_at: new Date().toISOString(), is_deleted: false },
  { name: "James Doe", email: "jamesdoe@example.com", password: hash("1234"), created_at: new Date().toISOString(), updated_at: new Date().toISOString(), is_deleted: false },
  { name: "Adele Doe", email: "adeledoe@example.com", password: hash("1234"), created_at: new Date().toISOString(), updated_at: new Date().toISOString(), is_deleted: false },
];

const data = { person_data };

module.exports = data;
