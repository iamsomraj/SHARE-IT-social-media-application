const knex = require("../config/db-config.js");
const FollowingsModel = require("../models/FollowingsModel.js");
const PostLikesModel = require("../models/PostLikesModel.js");
const PersonsModel = require("../models/PersonsModel.js");
const PostStatsModel = require("../models/PostStatsModel.js");
const PostsModel = require("../models/PostsModel.js");
const { person_data } = require("../utils/data/dummy-data.js");
const _ = require("colors");
const PersonStatsModel = require("../models/PersonStatsModel.js");
const PersonPostFavouritesModel = require("../models/PersonPostFavouritesModel.js");

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

  /* BEGIN: FOLLOWINGS MODEL HANDLING */
  /* INSERT FOLLOWINGS RECORDS */
  const followings = [
    { follower_id: insertedPersons[0].id, followed_id: insertedPersons[1].id, created_by: insertedPersons[0].id, updated_by: insertedPersons[0].id },
    { follower_id: insertedPersons[0].id, followed_id: insertedPersons[2].id, created_by: insertedPersons[0].id, updated_by: insertedPersons[0].id },
    { follower_id: insertedPersons[1].id, followed_id: insertedPersons[2].id, created_by: insertedPersons[1].id, updated_by: insertedPersons[1].id },
    { follower_id: insertedPersons[1].id, followed_id: insertedPersons[0].id, created_by: insertedPersons[1].id, updated_by: insertedPersons[1].id },
    { follower_id: insertedPersons[2].id, followed_id: insertedPersons[0].id, created_by: insertedPersons[2].id, updated_by: insertedPersons[2].id },
    { follower_id: insertedPersons[2].id, followed_id: insertedPersons[1].id, created_by: insertedPersons[2].id, updated_by: insertedPersons[2].id },
  ];
  const insertedFollowings = await FollowingsModel.query().insert(followings);
  /* END: FOLLOWINGS MODEL HANDLING */

  /* BEGIN: PERSON STATS MODEL HANDLING */
  /* INSERT PERSON STATS RECORDS */
  const personStats = [
    { person_id: insertedPersons[0].id, follower_count: 2, following_count: 2, post_count: 3 },
    { person_id: insertedPersons[1].id, follower_count: 2, following_count: 2, post_count: 3 },
    { person_id: insertedPersons[2].id, follower_count: 2, following_count: 2, post_count: 3 },
  ];
  const insertedPersonStats = await PersonStatsModel.query().insert(personStats);
  /* END: PERSON STATS MODEL HANDLING */

  /* BEGIN: POSTS MODEL HANDLING */
  /* INSERT POST RECORDS */
  const post_data = [
    {
      content: "Scissors cuts paper, paper covers rock, rock crushes lizard, lizard poisons Spock, Spock smashes scissors, scissors decapitates lizard, lizard eats paper, paper disproves Spock, Spock vaporizes rock, and as it always has, rock crushes scissors.",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      created_by: insertedPersons[0].id,
      updated_by: insertedPersons[0].id,
      is_deleted: false,
    },
    {
      content: "For the record, it could kill us to meet new people. They could be murderers or the carriers of unusual pathogens. And I'm not insane, my mother had me tested",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      created_by: insertedPersons[0].id,
      updated_by: insertedPersons[0].id,
      is_deleted: false,
    },
    {
      content: "Then it's settled. Amy's birthday present will be my genitals.",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      created_by: insertedPersons[0].id,
      updated_by: insertedPersons[0].id,
      is_deleted: false,
    },
    {
      content: "Penny. We are made of particles that have existed since the moment the universe began. I like to think those atoms traveled fourteen billion years through time and space to create us, so that we could be together and make each other whole.",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      created_by: insertedPersons[1].id,
      updated_by: insertedPersons[1].id,
      is_deleted: false,
    },
    {
      content: "People get things they don't deserve all the time. Like me with you.",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      created_by: insertedPersons[1].id,
      updated_by: insertedPersons[1].id,
      is_deleted: false,
    },
    {
      content: "Penny, you don't want to get into it with Sheldon. The guy's one lab accident away from being a super villain.",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      created_by: insertedPersons[1].id,
      updated_by: insertedPersons[1].id,
      is_deleted: false,
    },
    {
      content: "Yeah Sheldon, well your Ken can kiss my Barbie.",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      created_by: insertedPersons[2].id,
      updated_by: insertedPersons[2].id,
      is_deleted: false,
    },
    {
      content: "All right, Howard Wolowitz, listen up! You sign anything she puts in front of you, because you are the luckiest man alive. If you let her go, there is no way you can find anyone else. Speaking on behalf of all women, it is not going to happen, we had a meeting.",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      created_by: insertedPersons[2].id,
      updated_by: insertedPersons[2].id,
      is_deleted: false,
    },
    {
      content: "No, mom. It's the same guy I've been going out with for the past two years. Yeah, the scientist. Well, it's complicated. He works with lasers and atomic magnets. No, I did not see it coming. No, we have not set a date. No, I am not pregnant. Yeah, this is a first for our family.",
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
      like_count: 2,
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
    {
      post_id: insertedPosts[8].id,
      like_count: 0,
      comment_count: 0,
    },
  ];
  const insertedPostStats = await PostStatsModel.query().insert(stats_data);
  /* END: POST STATS MODEL HANDLING */

  /* BEGIN: PERSON POST FAVORITES MODEL HANDLING */
  /* INSERT PERSON POST FAVORITES RECORDS */
  const person_post_favorites_data = [
    {
      person_id: insertedPersons[0].id,
      post_id: insertedPosts[0].id,
    },
    {
      person_id: insertedPersons[1].id,
      post_id: insertedPosts[1].id,
    },
    {
      person_id: insertedPersons[2].id,
      post_id: insertedPosts[1].id,
    },
  ];
  const insertedPersonPostFavorites = await PersonPostFavouritesModel.query().insert(person_post_favorites_data);
  /* END: PERSON POST FAVORITES MODEL HANDLING */
}

main()
  .then(() => {
    console.log("Database seeded successfully!".green.bgWhite.underline.bold);
    knex.destroy();
    process.exit(0);
  })
  .catch((err) => {
    console.log(err.message.red.underline.bold);
    return knex.destroy();
  });
