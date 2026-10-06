import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('persons', table => {
    table.unique(['email'], { indexName: 'persons_email_unique' });
    table.unique(['uuid'], { indexName: 'persons_uuid_unique' });
  });
  await knex.schema.alterTable('posts', table => {
    table.unique(['uuid'], { indexName: 'posts_uuid_unique' });
    table.index(['created_by'], 'posts_created_by_index');
  });
  await knex.schema.alterTable('followings', table => {
    table.unique(['follower_id', 'followed_id'], {
      indexName: 'followings_follower_followed_unique',
    });
    table.index(['followed_id'], 'followings_followed_id_index');
  });
  await knex.schema.alterTable('post_likes', table => {
    table.unique(['post_id', 'created_by'], {
      indexName: 'post_likes_post_creator_unique',
    });
  });
  await knex.schema.alterTable('stories', table => {
    table.unique(['post_id', 'person_id'], {
      indexName: 'stories_post_person_unique',
    });
    table.index(['person_id'], 'stories_person_id_index');
  });
  await knex.schema.alterTable('post_stats', table => {
    table.unique(['post_id'], { indexName: 'post_stats_post_id_unique' });
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('post_stats', table => {
    table.dropUnique(['post_id'], 'post_stats_post_id_unique');
  });
  await knex.schema.alterTable('stories', table => {
    table.dropIndex(['person_id'], 'stories_person_id_index');
    table.dropUnique(['post_id', 'person_id'], 'stories_post_person_unique');
  });
  await knex.schema.alterTable('post_likes', table => {
    table.dropUnique(
      ['post_id', 'created_by'],
      'post_likes_post_creator_unique',
    );
  });
  await knex.schema.alterTable('followings', table => {
    table.dropIndex(['followed_id'], 'followings_followed_id_index');
    table.dropUnique(
      ['follower_id', 'followed_id'],
      'followings_follower_followed_unique',
    );
  });
  await knex.schema.alterTable('posts', table => {
    table.dropIndex(['created_by'], 'posts_created_by_index');
    table.dropUnique(['uuid'], 'posts_uuid_unique');
  });
  await knex.schema.alterTable('persons', table => {
    table.dropUnique(['uuid'], 'persons_uuid_unique');
    table.dropUnique(['email'], 'persons_email_unique');
  });
}
