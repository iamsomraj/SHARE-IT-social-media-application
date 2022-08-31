exports.up = function (knex) {
  return Promise.all([
    knex.schema.createTable('stories', (table) => {
      table.increments('id').primary();
      table.integer('post_id').references('posts.id');
      table.integer('person_id').references('persons.id');
      table.string('created_at');
    }),
  ]);
};

exports.down = function (knex) {
  return Promise.all([knex.schema.dropTable('stories')]);
};
