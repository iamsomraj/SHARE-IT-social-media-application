import '../config/load-env';
import knex from '../config/db-config';
import FollowingsModel from '../models/FollowingsModel';
import PersonsModel from '../models/PersonsModel';
import PersonStatsModel from '../models/PersonStatsModel';
import PostLikesModel from '../models/PostLikesModel';
import PostsModel from '../models/PostsModel';
import PostStatsModel from '../models/PostStatsModel';
import StoriesModel from '../models/StoriesModel';
import {
  DEFAULT_PASSWORD,
  FOLLOWINGS,
  LIKES,
  PERSONS,
  POSTS,
  STORIES,
} from '../utils/data/dummy-data';
import { hashPassword } from '../utils/helpers';

const at = <T>(items: readonly T[], index: number): T => {
  const item = items[index];
  if (item === undefined) {
    throw new Error(`Seed data references missing index ${index}`);
  }
  return item;
};

async function seed(): Promise<void> {
  await knex.transaction(async trx => {
    // Children first, to respect foreign keys.
    for (const model of [
      FollowingsModel,
      PostLikesModel,
      PostStatsModel,
      StoriesModel,
      PostsModel,
      PersonStatsModel,
      PersonsModel,
    ]) {
      await trx(model.tableName).delete();
    }

    const persons = await PersonsModel.query(trx).insert(
      await Promise.all(
        PERSONS.map(async person => ({
          ...person,
          password: await hashPassword(DEFAULT_PASSWORD),
          is_deleted: false,
        })),
      ),
    );
    const personId = (index: number): number => at(persons, index).id;

    await FollowingsModel.query(trx).insert(
      FOLLOWINGS.map(([follower, followed]) => ({
        follower_id: personId(follower),
        followed_id: personId(followed),
        created_by: personId(follower),
        updated_by: personId(follower),
      })),
    );

    const posts = await PostsModel.query(trx).insert(
      POSTS.map(({ author, content }) => ({
        content,
        created_by: personId(author),
        updated_by: personId(author),
        is_deleted: false,
      })),
    );
    const postId = (index: number): number => at(posts, index).id;

    await PostLikesModel.query(trx).insert(
      LIKES.map(([person, post]) => ({
        post_id: postId(post),
        created_by: personId(person),
        updated_by: personId(person),
      })),
    );

    await StoriesModel.query(trx).insert(
      STORIES.map(([person, post]) => ({
        post_id: postId(post),
        person_id: personId(person),
      })),
    );

    // Derive counters from the seeded rows so they always stay consistent.
    await PostStatsModel.query(trx).insert(
      posts.map(post => ({
        post_id: post.id,
        like_count: LIKES.filter(([, p]) => postId(p) === post.id).length,
        comment_count: 0,
        story_count: STORIES.filter(([, p]) => postId(p) === post.id).length,
      })),
    );

    await PersonStatsModel.query(trx).insert(
      persons.map((_person, index) => ({
        person_id: personId(index),
        post_count: POSTS.filter(post => post.author === index).length,
        follower_count: FOLLOWINGS.filter(([, followed]) => followed === index)
          .length,
        following_count: FOLLOWINGS.filter(([follower]) => follower === index)
          .length,
      })),
    );
  });
}

seed()
  .then(() => console.info('Database seeded successfully!'))
  .catch((error: unknown) => {
    console.error('Seeding failed:', error);
    process.exitCode = 1;
  })
  .finally(() => knex.destroy());
