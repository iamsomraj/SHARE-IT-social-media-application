exports.up = function (knex) {
  return Promise.all([
    knex.schema.createTable('person_stats', (table) => {
      table.increments('id').primary().comment('Unique identifier for the person_stats record');
      table.integer('person_id').references('persons.id').comment('Foreign key referencing the persons table');
      table.integer('post_count').defaultTo(0).comment('Number of posts by the person');
      table.integer('follower_count').defaultTo(0).comment('Number of followers for the person');
      table.integer('following_count').defaultTo(0).comment('Number of people the person is following');
    }),
  ]);
};

exports.down = function (knex) {
  return Promise.all([knex.schema.dropTable('person_stats')]);
};
