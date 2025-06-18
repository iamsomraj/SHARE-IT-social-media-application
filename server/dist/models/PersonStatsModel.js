"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const objection_1 = require("objection");
const PersonsModel_1 = __importDefault(require("./PersonsModel"));
class PersonStatsModel extends objection_1.Model {
    id;
    person_id;
    post_count;
    follower_count;
    following_count;
    created_at;
    updated_at;
    static get tableName() {
        return 'public.person_stats';
    }
    static get idColumn() {
        return 'id';
    }
    static get personIdColumn() {
        return 'person_id';
    }
    static get postCountColumn() {
        return 'post_count';
    }
    static get followerCountColumn() {
        return 'follower_count';
    }
    static get followingCountColumn() {
        return 'following_count';
    }
    static get jsonSchema() {
        return {
            type: 'object',
            required: ['person_id'],
            properties: {
                id: { type: 'integer' },
                person_id: { type: 'integer' },
                post_count: { type: 'integer' },
                follower_count: { type: 'integer' },
                following_count: { type: 'integer' },
            },
        };
    }
    static get relationMappings() {
        return {
            post: {
                relation: objection_1.Model.BelongsToOneRelation,
                modelClass: PersonsModel_1.default,
                join: {
                    from: 'public.person_stats.person_id',
                    to: 'public.persons.id',
                },
            },
        };
    }
}
exports.default = PersonStatsModel;
//# sourceMappingURL=PersonStatsModel.js.map