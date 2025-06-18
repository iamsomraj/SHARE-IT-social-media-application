"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_config_1 = __importDefault(require("@/config/db-config"));
const FollowingsModel_1 = __importDefault(require("@/models/FollowingsModel"));
const PostLikesModel_1 = __importDefault(require("@/models/PostLikesModel"));
const PersonsModel_1 = __importDefault(require("@/models/PersonsModel"));
const PostStatsModel_1 = __importDefault(require("@/models/PostStatsModel"));
const PostsModel_1 = __importDefault(require("@/models/PostsModel"));
const PersonStatsModel_1 = __importDefault(require("@/models/PersonStatsModel"));
const StoriesModel_1 = __importDefault(require("@/models/StoriesModel"));
const dummy_data_1 = require("@/utils/data/dummy-data");
require("colors");
async function main() {
    try {
        await FollowingsModel_1.default.query().delete();
        await PostLikesModel_1.default.query().delete();
        await PostStatsModel_1.default.query().delete();
        await StoriesModel_1.default.query().delete();
        await PostsModel_1.default.query().delete();
        await PersonStatsModel_1.default.query().delete();
        await PersonsModel_1.default.query().delete();
        const insertedPersons = await PersonsModel_1.default.query().insert(dummy_data_1.person_data);
        if (!insertedPersons || insertedPersons.length < 3) {
            throw new Error('Failed to insert required person records');
        }
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
        await FollowingsModel_1.default.query().insert(followings);
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
        await PersonStatsModel_1.default.query().insert(personStats);
        const post_data = [
            {
                content: 'Scissors cuts paper, paper covers rock, rock crushes lizard, lizard poisons Spock, Spock smashes scissors, scissors decapitates lizard, lizard eats paper, paper disproves Spock, Spock vaporizes rock, and as it always has, rock crushes scissors.',
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                created_by: person1.id,
                updated_by: person1.id,
                is_deleted: false,
            },
            {
                content: "For the record, it could kill us to meet new people. They could be murderers or the carriers of unusual pathogens. And I'm not insane, my mother had me tested",
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                created_by: person1.id,
                updated_by: person1.id,
                is_deleted: false,
            },
            {
                content: "Then it's settled. Amy's birthday present will be my genitals.",
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                created_by: person1.id,
                updated_by: person1.id,
                is_deleted: false,
            },
            {
                content: 'Penny. We are made of particles that have existed since the moment the universe began. I like to think those atoms traveled fourteen billion years through time and space to create us, so that we could be together and make each other whole.',
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                created_by: person2.id,
                updated_by: person2.id,
                is_deleted: false,
            },
            {
                content: "People get things they don't deserve all the time. Like me with you.",
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                created_by: person2.id,
                updated_by: person2.id,
                is_deleted: false,
            },
            {
                content: "Penny, you don't want to get into it with Sheldon. The guy's one lab accident away from being a super villain.",
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
                content: 'All right, Howard Wolowitz, listen up! You sign anything she puts in front of you, because you are the luckiest man alive. If you let her go, there is no way you can find anyone else. Speaking on behalf of all women, it is not going to happen, we had a meeting.',
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                created_by: person3.id,
                updated_by: person3.id,
                is_deleted: false,
            },
            {
                content: "No, mom. It's the same guy I've been going out with for the past two years. Yeah, the scientist. Well, it's complicated. He works with lasers and atomic magnets. No, I did not see it coming. No, we have not set a date. No, I am not pregnant. Yeah, this is a first for our family.",
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                created_by: person3.id,
                updated_by: person3.id,
                is_deleted: false,
            },
        ];
        const insertedPosts = await PostsModel_1.default.query().insert(post_data);
        if (!insertedPosts || insertedPosts.length < 9) {
            throw new Error('Failed to insert required post records');
        }
        const [post1, post2, post3, post4, post5, post6, post7, post8, post9] = insertedPosts;
        if (!post1 ||
            !post2 ||
            !post3 ||
            !post4 ||
            !post5 ||
            !post6 ||
            !post7 ||
            !post8 ||
            !post9) {
            throw new Error('Failed to get all required post records');
        }
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
        await PostLikesModel_1.default.query().insert(like_data);
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
        await StoriesModel_1.default.query().insert(person_post_favorites_data);
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
        await PostStatsModel_1.default.query().insert(stats_data);
        console.log('Database seeded successfully!'.green.bgWhite.underline.bold);
    }
    catch (error) {
        console.error('Seeding failed:'.red, error);
        throw error;
    }
    finally {
        await db_config_1.default.destroy();
    }
}
main().catch(error => {
    console.error('Seeding failed:'.red, error);
    process.exit(1);
});
exports.default = main;
//# sourceMappingURL=seeder.js.map