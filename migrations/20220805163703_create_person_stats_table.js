exports.up = function (knex) {
  return Promise.all([
    knex.schema.createTable("person_stats", (table) => {
      table.increments("id").primary();
      table.integer("person_id").references("persons.id");
      table.integer("follower_count").defaultTo(0);
      table.integer("following_count").defaultTo(0);
    }),
  ]);
};

exports.down = function (knex) {
  return Promise.all([knex.schema.dropTable("person_stats")]);
};
