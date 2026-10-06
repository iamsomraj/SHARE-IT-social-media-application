"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonsModel = void 0;
const objection_1 = require("objection");
const node_crypto_1 = require("node:crypto");
const FollowingsModel_1 = __importDefault(require("./FollowingsModel"));
const PersonStatsModel_1 = __importDefault(require("./PersonStatsModel"));
const PostLikesModel_1 = __importDefault(require("./PostLikesModel"));
const PostsModel_1 = __importDefault(require("./PostsModel"));
const StoriesModel_1 = __importDefault(require("./StoriesModel"));
const DETAILS_GRAPH = '[person_followers, person_followings, person_stats, person_posts.[post_likes.creator(defaultSelects), post_stats, creator(defaultSelects)]]';
class PersonsModel extends objection_1.Model {
    id;
    uuid;
    name;
    email;
    password;
    created_at;
    updated_at;
    is_deleted;
    person_followers;
    person_followings;
    person_posts;
    person_stories;
    person_post_likes;
    person_stats;
    static get tableName() {
        return 'public.persons';
    }
    $beforeInsert() {
        this.created_at = new Date().toISOString();
        this.uuid = (0, node_crypto_1.randomUUID)();
    }
    $beforeUpdate() {
        this.updated_at = new Date().toISOString();
    }
    static get jsonSchema() {
        return {
            type: 'object',
            required: ['name', 'email', 'password'],
            properties: {
                id: { type: 'integer' },
                uuid: { type: 'string' },
                name: { type: 'string', minLength: 3, maxLength: 255 },
                email: { type: 'string', minLength: 5, maxLength: 255 },
                password: { type: 'string', minLength: 4, maxLength: 255 },
                created_at: { type: 'string' },
                updated_at: { type: 'string' },
                is_deleted: { type: 'boolean' },
            },
        };
    }
    // Relation getters are evaluated lazily, so circular model imports are safe.
    static get relationMappings() {
        return {
            // NOTE: naming is historical and the client relies on it:
            // `person_followers` are rows where this person is the follower.
            person_followers: {
                relation: objection_1.Model.HasManyRelation,
                modelClass: FollowingsModel_1.default,
                join: {
                    from: 'public.persons.id',
                    to: 'public.followings.follower_id',
                },
            },
            person_followings: {
                relation: objection_1.Model.HasManyRelation,
                modelClass: FollowingsModel_1.default,
                join: {
                    from: 'public.persons.id',
                    to: 'public.followings.followed_id',
                },
            },
            person_posts: {
                relation: objection_1.Model.HasManyRelation,
                modelClass: PostsModel_1.default,
                join: {
                    from: 'public.persons.id',
                    to: 'public.posts.created_by',
                },
            },
            person_stories: {
                relation: objection_1.Model.HasManyRelation,
                modelClass: StoriesModel_1.default,
                join: {
                    from: 'public.persons.id',
                    to: 'public.stories.person_id',
                },
            },
            person_post_likes: {
                relation: objection_1.Model.HasManyRelation,
                modelClass: PostLikesModel_1.default,
                join: {
                    from: 'public.persons.id',
                    to: 'public.post_likes.created_by',
                },
            },
            person_stats: {
                relation: objection_1.Model.HasOneRelation,
                modelClass: PersonStatsModel_1.default,
                join: {
                    from: 'public.persons.id',
                    to: 'public.person_stats.person_id',
                },
            },
        };
    }
    static get modifiers() {
        return {
            defaultSelects(builder) {
                builder.select('id', 'uuid', 'name', 'email', 'created_at', 'updated_at');
            },
            orderByLatest(builder) {
                builder.orderBy([
                    { column: 'created_at', order: 'desc', nulls: 'last' },
                    { column: 'updated_at', order: 'desc', nulls: 'last' },
                ]);
            },
        };
    }
    /** Never serialize the password hash. */
    $formatJson(json) {
        const { password: _password, ...rest } = super.$formatJson(json);
        return rest;
    }
    /** Fetches a person with their relations (password excluded). */
    static async getPersonDetailsByEmail(email) {
        const person = await PersonsModel.query()
            .findOne({ email })
            .withGraphFetched(DETAILS_GRAPH);
        return person?.toJSON();
    }
    static async checkIfPersonExistsByEmail(email) {
        return PersonsModel.query().findOne({ email, is_deleted: false });
    }
    static async checkIfPersonExistsByUUID(uuid) {
        return PersonsModel.query().findOne({ uuid, is_deleted: false });
    }
}
exports.PersonsModel = PersonsModel;
exports.default = PersonsModel;
//# sourceMappingURL=PersonsModel.js.map