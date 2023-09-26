exports.up = function (knex) {
  return Promise.all([
    knex.schema.createTable("persons", (table) => {
      table.increments("id").primary();
      table.string("uuid");
      table.string("name");
      table.string("email");
      table.string("password");
      table.string("created_at");
      table.string("updated_at");
      table.boolean("is_deleted").defaultTo(false);
    }),
  ]);
};

exports.down = function (knex) {
  return Promise.all([knex.schema.dropTable("persons")]);
};
