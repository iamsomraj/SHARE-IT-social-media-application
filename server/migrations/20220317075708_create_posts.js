exports.up = function (knex) {
  return Promise.all([
    knex.schema.createTable("posts", (table) => {
      table.increments("id").primary();
      table.string("uuid");
      table.string("content", 500);
      table.string("created_at");
      table.string("updated_at");
      table.integer("created_by").references("persons.id");
      table.integer("updated_by").references("persons.id");
      table.boolean("is_deleted").defaultTo(false);
    }),
  ]);
};

exports.down = function (knex) {
  return Promise.all([knex.schema.dropTable("posts")]);
};
