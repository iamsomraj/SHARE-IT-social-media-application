exports.up = function (knex) {
  return Promise.all([
    knex.schema.createTable("post_likes", (table) => {
      table.increments("id").primary();
      table.integer("post_id").references("posts.id");
      table.string("created_at");
      table.string("updated_at");
      table.integer("created_by").references("persons.id");
      table.integer("updated_by").references("persons.id");
    }),
  ]);
};

exports.down = function (knex) {
  return Promise.all([knex.schema.dropTable("post_likes")]);
};
