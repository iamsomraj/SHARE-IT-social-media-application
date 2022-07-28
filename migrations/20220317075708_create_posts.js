exports.up = function (knex) {
  return Promise.all([
    knex.schema.createTable("posts", (table) => {
      table.increments("id").primary();
      table.string("uuid");
      table.string("content");
      table.integer("owner_id").references("persons.id");
      table.string("createdAt");
      table.string("updatedAt");
      table.integer("createdBy").references("persons.id");
      table.integer("updatedBy").references("persons.id");
    }),
  ]);
};

exports.down = function (knex) {
  return Promise.all([knex.schema.dropTable("posts")]);
};
