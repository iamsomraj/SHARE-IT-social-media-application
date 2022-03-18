exports.up = function (knex) {
  return Promise.all([
    knex.schema.createTable("persons", (table) => {
      table.increments("id").primary();
      table.string("name");
      table.string("email");
      table.string("password");
      table.string("createdAt");
      table.string("updatedAt");
    }),
  ]);
};

exports.down = function (knex) {
  return Promise.all([knex.schema.dropTable("persons")]);
};
