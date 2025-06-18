"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const objection_1 = require("objection");
const PersonsModel_1 = __importDefault(require("./PersonsModel"));
class FollowingsModel extends objection_1.Model {
    id;
    follower_id;
    followed_id;
    created_at;
    updated_at;
    created_by;
    updated_by;
    static get tableName() {
        return 'public.followings';
    }
    $beforeInsert() {
        this.created_at = new Date().toISOString();
    }
    $beforeUpdate() {
        this.updated_at = new Date().toISOString();
    }
    static get idColumn() {
        return 'id';
    }
    static get followerIdColumn() {
        return 'follower_id';
    }
    static get followedIdColumn() {
        return 'followed_id';
    }
    static get createdAtColumn() {
        return 'created_at';
    }
    static get updatedAtColumn() {
        return 'updated_at';
    }
    static get createdByColumn() {
        return 'created_by';
    }
    static get updatedByColumn() {
        return 'updated_by';
    }
    static get jsonSchema() {
        return {
            type: 'object',
            required: ['follower_id', 'followed_id'],
            properties: {
                id: { type: 'integer' },
                follower_id: { type: 'integer' },
                followed_id: { type: 'integer' },
                created_at: { type: 'string' },
                updated_at: { type: 'string' },
                created_by: { type: 'integer' },
                updated_by: { type: 'integer' },
            },
        };
    }
    static get relationMappings() {
        return {
            followed_from: {
                relation: objection_1.Model.BelongsToOneRelation,
                modelClass: PersonsModel_1.default,
                join: {
                    from: 'public.followings.followed_id',
                    to: 'public.persons.id',
                },
            },
            followed_to: {
                relation: objection_1.Model.BelongsToOneRelation,
                modelClass: PersonsModel_1.default,
                join: {
                    from: 'public.followings.follower_id',
                    to: 'public.persons.id',
                },
            },
            creator: {
                relation: objection_1.Model.BelongsToOneRelation,
                modelClass: PersonsModel_1.default,
                join: {
                    from: 'public.followings.created_by',
                    to: 'public.persons.id',
                },
            },
            updater: {
                relation: objection_1.Model.BelongsToOneRelation,
                modelClass: PersonsModel_1.default,
                join: {
                    from: 'public.followings.updated_by',
                    to: 'public.persons.id',
                },
            },
        };
    }
}
exports.default = FollowingsModel;
//# sourceMappingURL=FollowingsModel.js.map