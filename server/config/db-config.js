const Knex = require("knex");
const { Model } = require("objection");

require("dotenv").config();

const knex = Knex({
  client: "pg",
  connection: process.env.DATABASE_URL,
});

Model.knex(knex);

module.exports = knex;
