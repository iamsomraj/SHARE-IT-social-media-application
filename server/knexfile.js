require("dotenv").config();

const knex = {
  client: "pg",
  connection: process.env.DATABASE_URL,
};

module.exports = knex;
