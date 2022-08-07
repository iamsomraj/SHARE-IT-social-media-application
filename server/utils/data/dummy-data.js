const { hash } = require("../helpers/index.js");

const person_data = [
  { name: "Somraj Mukherjee", email: "somraj@example.com", password: hash("1234"), created_at: new Date().toISOString(), updated_at: new Date().toISOString(), is_deleted: false },
  { name: "Rohan Dutta", email: "rohan@example.com", password: hash("1234"), created_at: new Date().toISOString(), updated_at: new Date().toISOString(), is_deleted: false },
  { name: "Souradip Ganguly", email: "soura@example.com", password: hash("1234"), created_at: new Date().toISOString(), updated_at: new Date().toISOString(), is_deleted: false },
];

const data = { person_data };

module.exports = data;
