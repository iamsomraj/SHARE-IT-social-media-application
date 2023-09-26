const { hash } = require("../helpers/index.js");

const person_data = [
  { name: "Sheldon Cooper", email: "sheldon@example.com", password: hash("1234"), created_at: new Date().toISOString(), updated_at: new Date().toISOString(), is_deleted: false },
  { name: "Leonard Hofstadter", email: "leonard@example.com", password: hash("1234"), created_at: new Date().toISOString(), updated_at: new Date().toISOString(), is_deleted: false },
  { name: "Penny", email: "penny@example.com", password: hash("1234"), created_at: new Date().toISOString(), updated_at: new Date().toISOString(), is_deleted: false },
  { name: "Somraj Mukherjee", email: "iamsomraj@example.com", password: hash("123456"), created_at: new Date().toISOString(), updated_at: new Date().toISOString(), is_deleted: false },
];

const data = { person_data };

module.exports = data;
