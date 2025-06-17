import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await Promise.all([
    knex.schema.createTable('stories', table => {
      table
        .increments('id')
        .primary()
        .comment('Unique identifier for each story');
      table
        .integer('post_id')
        .references('posts.id')
        .comment('Foreign key referencing the posts table');
      table
        .integer('person_id')
        .references('persons.id')
        .comment('Foreign key referencing the persons table');
      table
        .string('created_at')
        .comment('Timestamp indicating when the story was created');
    }),
  ]);
}

export async function down(knex: Knex): Promise<void> {
  await Promise.all([knex.schema.dropTable('stories')]);
}
