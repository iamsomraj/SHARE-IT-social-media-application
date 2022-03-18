exports.up = function (knex) {
  return Promise.all([
    knex.schema.createTable("followings", (table) => {
      table.increments("id").primary();
      table.integer("follower_id").references("persons.id");
      table.integer("followed_id").references("persons.id");
      table.string("createdAt");
      table.string("updatedAt");
    }),
  ]);
};

exports.down = function (knex) {
  return Promise.all([knex.schema.dropTable("followings")]);
};
