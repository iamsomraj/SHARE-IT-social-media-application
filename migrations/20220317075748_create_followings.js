exports.up = function (knex) {
  return Promise.all([
    knex.schema.createTable("followings", (table) => {
      table.increments("id").primary();
      table.integer("follower_id").references("persons.id");
      table.integer("followed_id").references("persons.id");
      table.string("created_at");
      table.string("updated_at");
      table.integer("created_by").references("persons.id");
      table.integer("updated_by").references("persons.id");
    }),
  ]);
};

exports.down = function (knex) {
  return Promise.all([knex.schema.dropTable("followings")]);
};
