import knex from '@/config/db-config'; // Import database config first
import FollowingsModel from '@/models/FollowingsModel';
import PostLikesModel from '@/models/PostLikesModel';
import PersonsModel from '@/models/PersonsModel';
import PostStatsModel from '@/models/PostStatsModel';
import PostsModel from '@/models/PostsModel';
import PersonStatsModel from '@/models/PersonStatsModel';
import StoriesModel from '@/models/StoriesModel';
import { person_data } from '@/utils/data/dummy-data';
import 'colors';

async function main() {
  try {
    /* DELETE ALL THE DATA THAT IS PRESENT IN DATABASE */
    await FollowingsModel.query().delete();
    await PostLikesModel.query().delete();
    await PostStatsModel.query().delete();
    await StoriesModel.query().delete();
    await PostsModel.query().delete();
    await PersonStatsModel.query().delete();
    await PersonsModel.query().delete();

    /* BEGIN: PERSON MODEL HANDLING */
    /* INSERT PERSON RECORDS */
    const insertedPersons = await PersonsModel.query().insert(person_data);

    // Ensure we have the expected number of persons
    if (!insertedPersons || insertedPersons.length < 3) {
      throw new Error('Failed to insert required person records');
    }
    /* END: PERSON MODEL HANDLING */

    /* BEGIN: FOLLOWINGS MODEL HANDLING */
    /* INSERT FOLLOWINGS RECORDS */
    const [person1, person2, person3] = insertedPersons;

    if (!person1 || !person2 || !person3) {
      throw new Error('Failed to get all required person records');
    }

    const followings = [
      {
        follower_id: person1.id,
        followed_id: person2.id,
        created_by: person1.id,
        updated_by: person1.id,
      },
      {
        follower_id: person1.id,
        followed_id: person3.id,
        created_by: person1.id,
        updated_by: person1.id,
      },
      {
        follower_id: person2.id,
        followed_id: person3.id,
        created_by: person2.id,
        updated_by: person2.id,
      },
      {
        follower_id: person2.id,
        followed_id: person1.id,
        created_by: person2.id,
        updated_by: person2.id,
      },
      {
        follower_id: person3.id,
        followed_id: person1.id,
        created_by: person3.id,
        updated_by: person3.id,
      },
      {
        follower_id: person3.id,
        followed_id: person2.id,
        created_by: person3.id,
        updated_by: person3.id,
      },
    ];
    await FollowingsModel.query().insert(followings);
    /* END: FOLLOWINGS MODEL HANDLING */

    /* BEGIN: PERSON STATS MODEL HANDLING */
    /* INSERT PERSON STATS RECORDS */
    const personStats = [
      {
        person_id: person1.id,
        follower_count: 2,
        following_count: 2,
        post_count: 3,
      },
      {
        person_id: person2.id,
        follower_count: 2,
        following_count: 2,
        post_count: 3,
      },
      {
        person_id: person3.id,
        follower_count: 2,
        following_count: 2,
        post_count: 3,
      },
    ];
    await PersonStatsModel.query().insert(personStats);
    /* END: PERSON STATS MODEL HANDLING */

    /* BEGIN: POSTS MODEL HANDLING */
    /* INSERT POST RECORDS */
    const post_data = [
      {
        content:
          'Scissors cuts paper, paper covers rock, rock crushes lizard, lizard poisons Spock, Spock smashes scissors, scissors decapitates lizard, lizard eats paper, paper disproves Spock, Spock vaporizes rock, and as it always has, rock crushes scissors.',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        created_by: person1.id,
        updated_by: person1.id,
        is_deleted: false,
      },
      {
        content:
          "For the record, it could kill us to meet new people. They could be murderers or the carriers of unusual pathogens. And I'm not insane, my mother had me tested",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        created_by: person1.id,
        updated_by: person1.id,
        is_deleted: false,
      },
      {
        content:
          "Then it's settled. Amy's birthday present will be my genitals.",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        created_by: person1.id,
        updated_by: person1.id,
        is_deleted: false,
      },
      {
        content:
          'Penny. We are made of particles that have existed since the moment the universe began. I like to think those atoms traveled fourteen billion years through time and space to create us, so that we could be together and make each other whole.',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        created_by: person2.id,
        updated_by: person2.id,
        is_deleted: false,
      },
      {
        content:
          "People get things they don't deserve all the time. Like me with you.",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        created_by: person2.id,
        updated_by: person2.id,
        is_deleted: false,
      },
      {
        content:
          "Penny, you don't want to get into it with Sheldon. The guy's one lab accident away from being a super villain.",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        created_by: person2.id,
        updated_by: person2.id,
        is_deleted: false,
      },
      {
        content: 'Yeah Sheldon, well your Ken can kiss my Barbie.',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        created_by: person3.id,
        updated_by: person3.id,
        is_deleted: false,
      },
      {
        content:
          'All right, Howard Wolowitz, listen up! You sign anything she puts in front of you, because you are the luckiest man alive. If you let her go, there is no way you can find anyone else. Speaking on behalf of all women, it is not going to happen, we had a meeting.',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        created_by: person3.id,
        updated_by: person3.id,
        is_deleted: false,
      },
      {
        content:
          "No, mom. It's the same guy I've been going out with for the past two years. Yeah, the scientist. Well, it's complicated. He works with lasers and atomic magnets. No, I did not see it coming. No, we have not set a date. No, I am not pregnant. Yeah, this is a first for our family.",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        created_by: person3.id,
        updated_by: person3.id,
        is_deleted: false,
      },
    ];
    const insertedPosts = await PostsModel.query().insert(post_data);

    // Ensure we have the expected number of posts
    if (!insertedPosts || insertedPosts.length < 9) {
      throw new Error('Failed to insert required post records');
    }

    const [post1, post2, post3, post4, post5, post6, post7, post8, post9] =
      insertedPosts;

    if (
      !post1 ||
      !post2 ||
      !post3 ||
      !post4 ||
      !post5 ||
      !post6 ||
      !post7 ||
      !post8 ||
      !post9
    ) {
      throw new Error('Failed to get all required post records');
    }
    /* END: POSTS MODEL HANDLING */

    /* BEGIN: POST LIKES MODEL HANDLING */
    /* INSERT POST LIKE RECORDS */
    const like_data = [
      {
        post_id: post1.id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        created_by: person1.id,
        updated_by: person1.id,
      },
      {
        post_id: post1.id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        created_by: person2.id,
        updated_by: person2.id,
      },
      {
        post_id: post2.id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        created_by: person1.id,
        updated_by: person1.id,
      },
      {
        post_id: post2.id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        created_by: person2.id,
        updated_by: person2.id,
      },
    ];
    await PostLikesModel.query().insert(like_data);
    /* END: POST LIKES MODEL HANDLING */

    /* BEGIN: STORIES MODEL HANDLING */
    /* INSERT STORIES RECORDS */
    const person_post_favorites_data = [
      {
        person_id: person2.id,
        post_id: post2.id,
      },
      {
        person_id: person3.id,
        post_id: post2.id,
      },
    ];
    await StoriesModel.query().insert(person_post_favorites_data);
    /* END: STORIES MODEL HANDLING */

    /* BEGIN: POST STATS MODEL HANDLING */
    /* INSERT POST STATS RECORDS */
    const stats_data = [
      {
        post_id: post1.id,
        like_count: 2,
        comment_count: 0,
        story_count: 0,
      },
      {
        post_id: post2.id,
        like_count: 2,
        comment_count: 0,
        story_count: 2,
      },
      {
        post_id: post3.id,
        like_count: 0,
        comment_count: 0,
        story_count: 0,
      },
      {
        post_id: post4.id,
        like_count: 0,
        comment_count: 0,
        story_count: 0,
      },
      {
        post_id: post5.id,
        like_count: 0,
        comment_count: 0,
        story_count: 0,
      },
      {
        post_id: post6.id,
        like_count: 0,
        comment_count: 0,
        story_count: 0,
      },
      {
        post_id: post7.id,
        like_count: 0,
        comment_count: 0,
        story_count: 0,
      },
      {
        post_id: post8.id,
        like_count: 0,
        comment_count: 0,
        story_count: 0,
      },
      {
        post_id: post9.id,
        like_count: 0,
        comment_count: 0,
        story_count: 0,
      },
    ];
    await PostStatsModel.query().insert(stats_data);
    /* END: POST STATS MODEL HANDLING */

    // eslint-disable-next-line no-console
    console.log('Database seeded successfully!'.green.bgWhite.underline.bold);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Seeding failed:'.red, error);
    throw error;
  } finally {
    // Ensure database connection is closed
    await knex.destroy();
  }
}

main().catch(error => {
  // eslint-disable-next-line no-console
  console.error('Seeding failed:'.red, error);
  process.exit(1);
});

export default main;
