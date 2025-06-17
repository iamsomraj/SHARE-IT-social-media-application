import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await Promise.all([
    knex.schema.createTable('post_stats', table => {
      table
        .increments('id')
        .primary()
        .comment('Unique identifier for the post stats');
      table
        .integer('post_id')
        .references('posts.id')
        .comment('ID of the associated post');
      table
        .integer('like_count')
        .defaultTo(0)
        .comment('Number of likes for the post');
      table
        .integer('comment_count')
        .defaultTo(0)
        .comment('Number of comments for the post');
      table
        .integer('story_count')
        .defaultTo(0)
        .comment('Number of stories related to the post');
    }),
  ]);
}

export async function down(knex: Knex): Promise<void> {
  await Promise.all([knex.schema.dropTable('post_stats')]);
}
