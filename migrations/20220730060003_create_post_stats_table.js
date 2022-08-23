exports.up = function (knex) {
  return Promise.all([
    knex.schema.createTable("post_stats", (table) => {
      table.increments("id").primary();
      table.integer("post_id").references("posts.id");
      table.integer("like_count").defaultTo(0);
      table.integer("comment_count").defaultTo(0);
      table.integer("favourite_count").defaultTo(0);
    }),
  ]);
};

exports.down = function (knex) {
  return Promise.all([knex.schema.dropTable("post_stats")]);
};
