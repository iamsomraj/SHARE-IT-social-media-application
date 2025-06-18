"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonsModel = void 0;
const objection_1 = require("objection");
const crypto_1 = require("crypto");
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
        this.uuid = (0, crypto_1.randomUUID)();
    }
    $beforeUpdate() {
        this.updated_at = new Date().toISOString();
    }
    static get idColumn() {
        return 'id';
    }
    static get nameColumn() {
        return 'name';
    }
    static get emailColumn() {
        return 'email';
    }
    static get passwordColumn() {
        return 'password';
    }
    static get createdAtColumn() {
        return 'created_at';
    }
    static get updatedAtColumn() {
        return 'updated_at';
    }
    static get isDeletedColumn() {
        return 'is_deleted';
    }
    static get jsonSchema() {
        return {
            type: 'object',
            required: ['name', 'email', 'password'],
            properties: {
                id: { type: 'integer' },
                uuid: { type: 'string' },
                name: { type: 'string', minLength: 3, maxLength: 255 },
                email: { type: 'string', minLength: 5, maxLength: 50 },
                password: { type: 'string', minLength: 4, maxLength: 255 },
                created_at: { type: 'string' },
                updated_at: { type: 'string' },
                is_deleted: { type: 'boolean' },
            },
        };
    }
    static get relationMappings() {
        const FollowingsModel = require('@/models/FollowingsModel').default;
        const PostsModel = require('@/models/PostsModel').default;
        const PostLikesModel = require('@/models/PostLikesModel').default;
        const PersonStatsModel = require('@/models/PersonStatsModel').default;
        const StoriesModel = require('@/models/StoriesModel').default;
        return {
            person_followers: {
                relation: objection_1.Model.HasManyRelation,
                modelClass: FollowingsModel,
                join: {
                    from: 'public.persons.id',
                    to: 'public.followings.follower_id',
                },
            },
            person_followings: {
                relation: objection_1.Model.HasManyRelation,
                modelClass: FollowingsModel,
                join: {
                    from: 'public.persons.id',
                    to: 'public.followings.followed_id',
                },
            },
            person_posts: {
                relation: objection_1.Model.HasManyRelation,
                modelClass: PostsModel,
                join: {
                    from: 'public.persons.id',
                    to: 'public.posts.created_by',
                },
            },
            person_stories: {
                relation: objection_1.Model.HasManyRelation,
                modelClass: StoriesModel,
                join: {
                    from: 'public.persons.id',
                    to: 'public.stories.person_id',
                },
            },
            person_post_likes: {
                relation: objection_1.Model.HasManyRelation,
                modelClass: PostLikesModel,
                join: {
                    from: 'public.persons.id',
                    to: 'public.post_likes.created_by',
                },
            },
            person_stats: {
                relation: objection_1.Model.HasOneRelation,
                modelClass: PersonStatsModel,
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
    static async getPersonDetailsByEmail(email) {
        const personRecord = await PersonsModel.query()
            .findOne({ email })
            .withGraphFetched('[person_followers, person_followings, person_stats, person_posts.[post_likes.creator(defaultSelects), post_stats, creator(defaultSelects)]]');
        if (personRecord) {
            const { password, ...personWithoutPassword } = personRecord;
            return personWithoutPassword;
        }
        return undefined;
    }
    static async checkIfPersonExistsByEmail(email) {
        return await PersonsModel.query().findOne({
            email,
            is_deleted: false,
        });
    }
    static async checkIfPersonExistsById(id) {
        return await PersonsModel.query().findOne({
            id,
            is_deleted: false,
        });
    }
    static async checkIfPersonExistsByUUID(uuid) {
        return await PersonsModel.query().findOne({
            uuid,
            is_deleted: false,
        });
    }
    static async getPersonDetailsByUUID(uuid) {
        const personRecord = await PersonsModel.query()
            .findOne({ uuid, is_deleted: false })
            .withGraphFetched('[person_followers, person_followings, person_stats, person_posts.[post_likes.creator(defaultSelects), post_stats, creator(defaultSelects)]]');
        if (personRecord) {
            const { password, ...personWithoutPassword } = personRecord;
            return personWithoutPassword;
        }
        return undefined;
    }
}
exports.PersonsModel = PersonsModel;
exports.default = PersonsModel;
//# sourceMappingURL=PersonsModel.js.map