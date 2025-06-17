const knex = require('../config/db-config.js');
const FollowingsModel = require('../models/FollowingsModel.js');
const PostLikesModel = require('../models/PostLikesModel.js');
const PersonsModel = require('../models/PersonsModel.js');
const PostStatsModel = require('../models/PostStatsModel.js');
const PostsModel = require('../models/PostsModel.js');
const { person_data } = require('../utils/data/dummy-data.js');
const _ = require('colors');
const PersonStatsModel = require('../models/PersonStatsModel.js');
const StoriesModel = require('../models/StoriesModel.js');

async function main() {
  /* DELETE ALL THE DATA THAT IS PRESENT IN DATABASE */
  await FollowingsModel.query().delete();
  await PostLikesModel.query().delete();
  await PostStatsModel.query().delete();
  await PostsModel.query().delete();
  await PersonStatsModel.query().delete();
  await StoriesModel.query().delete();
  await PersonsModel.query().delete();

  /* BEGIN: PERSON MODEL HANDLING */
  /* INSERT PERSON RECORDS */
  const insertedPersons = await PersonsModel.query().insert(person_data);
  /* END: PERSON MODEL HANDLING */

  /* BEGIN: FOLLOWINGS MODEL HANDLING */
  /* INSERT FOLLOWINGS RECORDS */
  // Creating a more complex follower network
  let followings = [];

  // Each person follows at least 2-3 others
  for (let i = 0; i < insertedPersons.length; i++) {
    for (let j = 0; j < insertedPersons.length; j++) {
      // Don't follow self and make following somewhat random
      if (i !== j && Math.random() > 0.3) {
        followings.push({
          follower_id: insertedPersons[i].id,
          followed_id: insertedPersons[j].id,
          created_by: insertedPersons[i].id,
          updated_by: insertedPersons[i].id,
        });
      }
    }
  }

  const insertedFollowings = await FollowingsModel.query().insert(followings);
  /* END: FOLLOWINGS MODEL HANDLING */

  /* BEGIN: PERSON STATS MODEL HANDLING */
  /* Compute actual stats based on data */
  const personStats = [];

  for (const person of insertedPersons) {
    const followerCount = followings.filter((f) => f.followed_id === person.id).length;
    const followingCount = followings.filter((f) => f.follower_id === person.id).length;

    personStats.push({
      person_id: person.id,
      follower_count: followerCount,
      following_count: followingCount,
      post_count: Math.floor(Math.random() * 10) + 2, // Will update after posts created
    });
  }

  const insertedPersonStats = await PersonStatsModel.query().insert(personStats);
  /* END: PERSON STATS MODEL HANDLING */

  /* BEGIN: POSTS MODEL HANDLING */
  /* INSERT POST RECORDS */
  const quotes = [
    'Scissors cuts paper, paper covers rock, rock crushes lizard, lizard poisons Spock, Spock smashes scissors, scissors decapitates lizard, lizard eats paper, paper disproves Spock, Spock vaporizes rock, and as it always has, rock crushes scissors.',
    "For the record, it could kill us to meet new people. They could be murderers or the carriers of unusual pathogens. And I'm not insane, my mother had me tested",
    "Then it's settled. Amy's birthday present will be my genitals.",
    'Penny. We are made of particles that have existed since the moment the universe began. I like to think those atoms traveled fourteen billion years through time and space to create us, so that we could be together and make each other whole.',
    "People get things they don't deserve all the time. Like me with you.",
    "Penny, you don't want to get into it with Sheldon. The guy's one lab accident away from being a super villain.",
    'Yeah Sheldon, well your Ken can kiss my Barbie.',
    'All right, Howard Wolowitz, listen up! You sign anything she puts in front of you, because you are the luckiest man alive. If you let her go, there is no way you can find anyone else. Speaking on behalf of all women, it is not going to happen, we had a meeting.',
    "No, mom. It's the same guy I've been going out with for the past two years. Yeah, the scientist. Well, it's complicated. He works with lasers and atomic magnets. No, I did not see it coming. No, we have not set a date. No, I am not pregnant. Yeah, this is a first for our family.",
    "I'm not crazy. My mother had me tested.",
    "I'm not insane, my mother had me tested.",
    "It's a warm summer evening in Ancient Greece...",
    "That's no reason to cry. One cries because one is sad. For example, I cry because others are stupid, and that makes me sad.",
    "I'm a physicist. I have a working knowledge of the entire universe and everything it contains.",
    'Bazinga!',
    'I believe the appropriate metaphor here involves a river of excrement and a Native American water vessel without any means of propulsion.',
    "I'm not crazy, my mother had me tested.",
    'I would have been here earlier but the bus kept stopping for other people to get on it.',
    "Why do we have a Swiss Army knife in the picnic basket? I don't recall packing any hardware that would require scissors, a screwdriver, or a magnifying glass.",
    'I am aware of the way humans usually reproduce, which is messy, unsanitary, and involves loud and unnecessary appeals to a deity.',
    "Interesting. You're afraid of insects and women. Ladybugs must render you catatonic.",
    "I'm a physicist, not a hippie.",
    "I'm not insane. My mother had me tested.",
    "I'm a physicist, I have a working knowledge of the entire universe and everything it contains.",
  ];

  let post_data = [];

  // Generate 3-5 posts per user with random content
  for (const person of insertedPersons) {
    const postCount = Math.floor(Math.random() * 3) + 3; // 3-5 posts per person

    for (let i = 0; i < postCount; i++) {
      // Pick random quotes for content
      const randomQuoteIndex = Math.floor(Math.random() * quotes.length);

      // Create posts with dates spread over last 30 days
      const postDate = new Date();
      postDate.setDate(postDate.getDate() - Math.floor(Math.random() * 30));

      post_data.push({
        content: quotes[randomQuoteIndex],
        created_at: postDate.toISOString(),
        updated_at: postDate.toISOString(),
        created_by: person.id,
        updated_by: person.id,
        is_deleted: false,
      });
    }
  }

  const insertedPosts = await PostsModel.query().insert(post_data);
  /* END: POSTS MODEL HANDLING */

  /* BEGIN: POST LIKES MODEL HANDLING */
  /* INSERT POST LIKE RECORDS */
  let like_data = [];

  // Each person likes several random posts
  for (const person of insertedPersons) {
    // Get random number of posts to like
    const postsToLike = Math.floor(Math.random() * insertedPosts.length * 0.7);

    // Shuffle posts and select first few
    const shuffledPosts = [...insertedPosts].sort(() => 0.5 - Math.random());
    const selectedPosts = shuffledPosts.slice(0, postsToLike);

    for (const post of selectedPosts) {
      // Don't like own posts
      if (post.created_by !== person.id) {
        // Create like with dates slightly after post date
        const likeDate = new Date(post.created_at);
        likeDate.setHours(likeDate.getHours() + Math.floor(Math.random() * 48));

        like_data.push({
          post_id: post.id,
          created_at: likeDate.toISOString(),
          updated_at: likeDate.toISOString(),
          created_by: person.id,
          updated_by: person.id,
        });
      }
    }
  }

  const insertedPostLikes = await PostLikesModel.query().insert(like_data);
  /* END: POST LIKES MODEL HANDLING */

  /* BEGIN: STORIES MODEL HANDLING */
  /* INSERT STORIES RECORDS */
  let stories_data = [];

  // Users add some posts to stories
  for (const person of insertedPersons) {
    // Each user marks a few random posts as stories
    const postsToStory = Math.floor(Math.random() * 5) + 1;

    // Shuffle posts and select some
    const shuffledPosts = [...insertedPosts].sort(() => 0.5 - Math.random());
    const selectedPosts = shuffledPosts.slice(0, postsToStory);

    for (const post of selectedPosts) {
      stories_data.push({
        person_id: person.id,
        post_id: post.id,
      });
    }
  }

  const insertedStories = await StoriesModel.query().insert(stories_data);
  /* END: STORIES MODEL HANDLING */

  /* BEGIN: POST STATS MODEL HANDLING */
  /* Calculate and INSERT POST STATS RECORDS */
  let stats_data = [];

  for (const post of insertedPosts) {
    const likeCount = like_data.filter((l) => l.post_id === post.id).length;
    const storyCount = stories_data.filter((s) => s.post_id === post.id).length;

    stats_data.push({
      post_id: post.id,
      like_count: likeCount,
      comment_count: 0, // No comments yet
      story_count: storyCount,
    });
  }

  const insertedPostStats = await PostStatsModel.query().insert(stats_data);
  /* END: POST STATS MODEL HANDLING */

  /* UPDATE PERSON STATS WITH CORRECT POST COUNTS */
  for (const person of insertedPersons) {
    const postCount = post_data.filter((p) => p.created_by === person.id).length;

    await PersonStatsModel.query().where('person_id', person.id).update({ post_count: postCount });
  }
}

main()
  .then(() => {
    console.log('Database seeded successfully!'.green.bgWhite.underline.bold);
    knex.destroy();
    process.exit(0);
  })
  .catch((err) => {
    console.log(err.message.red.underline.bold);
    return knex.destroy();
  });
