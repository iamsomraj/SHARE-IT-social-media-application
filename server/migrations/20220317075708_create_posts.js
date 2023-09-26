exports.up = function (knex) {
  return Promise.all([
    knex.schema.createTable('posts', (table) => {
      table.increments('id').primary().comment('Unique identifier for the post');
      table.string('uuid').comment('Universally unique identifier for the post');
      table.string('content', 500).comment('Content of the post, limited to 500 characters');
      table.string('created_at').comment('Timestamp of when the post was created');
      table.string('updated_at').comment('Timestamp of when the post was last updated');
      table.integer('created_by').references('persons.id').comment('ID of the person who created the post');
      table.integer('updated_by').references('persons.id').comment('ID of the person who last updated the post');
      table.boolean('is_deleted').notNullable().defaultTo(false).comment('Indicates if the post is deleted or not');
    }),
  ]);
};

exports.down = function (knex) {
  return Promise.all([knex.schema.dropTable('posts')]);
};
