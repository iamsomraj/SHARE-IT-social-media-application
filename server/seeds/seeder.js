const knex = require("../config/db-config.js");
const FollowingsModel = require("../models/FollowingsModel.js");
const PostLikesModel = require("../models/PostLikesModel.js");
const PersonsModel = require("../models/PersonsModel.js");
const PostStatsModel = require("../models/PostStatsModel.js");
const PostsModel = require("../models/PostsModel.js");
const { person_data } = require("../utils/data/dummy-data.js");

async function main() {
  /* DELETE ALL THE DATA THAT IS PRESENT IN DATABASE */
  await FollowingsModel.query().delete();
  await PostLikesModel.query().delete();
  await PostStatsModel.query().delete();
  await PostsModel.query().delete();
  await PersonsModel.query().delete();

  /* BEGIN: PERSON MODEL HANDLING */
  /* INSERT PERSON RECORDS */
  const insertedPersons = await PersonsModel.query().insert(person_data);
  /* END: PERSON MODEL HANDLING */

  /* BEGIN: POSTS MODEL HANDLING */
  /* INSERT POST RECORDS */
  const post_data = [
    {
      uuid: "post-1",
      content: "This is the first post",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      created_by: insertedPersons[0].id,
      updated_by: insertedPersons[0].id,
      is_deleted: false,
    },
    {
      uuid: "post-2",
      content: "This is the second post",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      created_by: insertedPersons[1].id,
      updated_by: insertedPersons[1].id,
      is_deleted: false,
    },
    {
      uuid: "post-3",
      content: "This is the third post",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      created_by: insertedPersons[0].id,
      updated_by: insertedPersons[0].id,
      is_deleted: false,
    },
    {
      uuid: "post-4",
      content: "This is the fourth post",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      created_by: insertedPersons[1].id,
      updated_by: insertedPersons[1].id,
      is_deleted: false,
    },
    {
      uuid: "post-5",
      content: "This is the fifth post",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      created_by: insertedPersons[0].id,
      updated_by: insertedPersons[0].id,
      is_deleted: false,
    },
    {
      uuid: "post-6",
      content: "This is the sixth post",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      created_by: insertedPersons[1].id,
      updated_by: insertedPersons[1].id,
      is_deleted: false,
    },
    {
      uuid: "post-7",
      content: "This is the seventh post",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      created_by: insertedPersons[2].id,
      updated_by: insertedPersons[2].id,
      is_deleted: false,
    },
    {
      uuid: "post-8",
      content: "This is the eighth post",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      created_by: insertedPersons[2].id,
      updated_by: insertedPersons[2].id,
      is_deleted: false,
    },
  ];
  const insertedPosts = await PostsModel.query().insert(post_data);
  /* END: POSTS MODEL HANDLING */

  /* BEGIN: POST LIKES MODEL HANDLING */
  /* INSERT POST LIKE RECORDS */
  const like_data = [
    {
      post_id: insertedPosts[0].id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      created_by: insertedPersons[0].id,
      updated_by: insertedPersons[0].id,
    },
    {
      post_id: insertedPosts[0].id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      created_by: insertedPersons[1].id,
      updated_by: insertedPersons[1].id,
    },
    {
      post_id: insertedPosts[1].id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      created_by: insertedPersons[0].id,
      updated_by: insertedPersons[0].id,
    },
    {
      post_id: insertedPosts[1].id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      created_by: insertedPersons[1].id,
      updated_by: insertedPersons[1].id,
    },
  ];
  const insertedPostLikes = await PostLikesModel.query().insert(like_data);
  /* END: POST LIKES MODEL HANDLING */

  /* BEGIN: POST STATS MODEL HANDLING */
  /* INSERT POST STATS RECORDS */
  const stats_data = [
    {
      post_id: insertedPosts[0].id,
      like_count: 2,
      comment_count: 0,
    },
    {
      post_id: insertedPosts[1].id,
      like_count: 0,
      comment_count: 0,
    },
    {
      post_id: insertedPosts[2].id,
      like_count: 0,
      comment_count: 0,
    },
    {
      post_id: insertedPosts[3].id,
      like_count: 0,
      comment_count: 0,
    },
    {
      post_id: insertedPosts[4].id,
      like_count: 0,
      comment_count: 0,
    },
    {
      post_id: insertedPosts[5].id,
      like_count: 0,
      comment_count: 0,
    },
    {
      post_id: insertedPosts[6].id,
      like_count: 0,
      comment_count: 0,
    },
    {
      post_id: insertedPosts[7].id,
      like_count: 0,
      comment_count: 0,
    },
  ];
  const insertedPostStats = await PostStatsModel.query().insert(stats_data);
  /* END: POST STATS MODEL HANDLING */
}

main()
  .then(() => {
    console.log("Database seeded successfully!");
    knex.destroy();
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    return knex.destroy();
  });
