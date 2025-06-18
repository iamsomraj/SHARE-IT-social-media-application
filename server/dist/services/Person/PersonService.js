"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PersonsModel_1 = __importDefault(require("@/models/PersonsModel"));
const PersonStatsModel_1 = __importDefault(require("@/models/PersonStatsModel"));
const FollowingsModel_1 = __importDefault(require("@/models/FollowingsModel"));
const helpers_1 = require("@/utils/helpers");
const RootService_1 = __importDefault(require("@/services/Root/RootService"));
const http_codes_1 = require("@/utils/constants/http-codes");
const messages_1 = require("@/utils/constants/messages");
const schemas_1 = require("@/schemas");
class PersonService extends RootService_1.default {
    constructor() {
        super();
    }
    validateLoginInput(email, password) {
        return (0, schemas_1.validateWithZod)(schemas_1.ZodLoginSchema, { email, password });
    }
    validateRegisterInput(name, email, password) {
        return (0, schemas_1.validateWithZod)(schemas_1.ZodRegisterSchema, { name, email, password });
    }
    async loginPerson(email, password) {
        const validatedInput = this.validateLoginInput(email, password);
        const doesPersonExist = await PersonsModel_1.default.checkIfPersonExistsByEmail(validatedInput.email);
        if (!doesPersonExist) {
            this.raiseError(http_codes_1.HTTP_CODES.NOT_FOUND, messages_1.PERSON_ERROR_MESSAGES.USER_NOT_FOUND);
        }
        if (!(0, helpers_1.validateHash)(validatedInput.password, doesPersonExist.password)) {
            this.raiseError(http_codes_1.HTTP_CODES.BAD_REQUEST, messages_1.PERSON_ERROR_MESSAGES.WRONG_CREDENTIALS);
        }
        const personRecord = await PersonsModel_1.default.getPersonDetailsByEmail(validatedInput.email);
        if (!personRecord) {
            this.raiseError(http_codes_1.HTTP_CODES.INTERNAL_SERVER_ERROR, messages_1.PERSON_ERROR_MESSAGES.FETCH_USER_DATA_FAILURE);
        }
        const token = (0, helpers_1.generateToken)(personRecord.id);
        const result = {
            ...personRecord,
            token,
        };
        return result;
    }
    async registerPerson(name, email, password) {
        const validatedInput = this.validateRegisterInput(name, email, password);
        const doesUserExist = await PersonsModel_1.default.checkIfPersonExistsByEmail(validatedInput.email);
        if (doesUserExist) {
            this.raiseError(http_codes_1.HTTP_CODES.BAD_REQUEST, messages_1.PERSON_ERROR_MESSAGES.USER_ALREADY_EXISTS);
        }
        const insertedPerson = await PersonsModel_1.default.query().insertAndFetch({
            name: validatedInput.name,
            email: validatedInput.email,
            password: (0, helpers_1.hash)(validatedInput.password),
            is_deleted: false,
        });
        if (!insertedPerson) {
            this.raiseError(http_codes_1.HTTP_CODES.INTERNAL_SERVER_ERROR, messages_1.PERSON_ERROR_MESSAGES.REGISTER_PERSON_FAILURE);
        }
        const insertedStatRecord = await PersonStatsModel_1.default.query().insert({
            person_id: insertedPerson.id,
            post_count: 0,
            following_count: 0,
            follower_count: 0,
        });
        if (!insertedStatRecord) {
            this.raiseError(http_codes_1.HTTP_CODES.INTERNAL_SERVER_ERROR, messages_1.PERSON_ERROR_MESSAGES.REGISTER_PERSON_FAILURE);
        }
        const registeredPerson = await PersonsModel_1.default.getPersonDetailsByEmail(email);
        if (!registeredPerson) {
            this.raiseError(http_codes_1.HTTP_CODES.INTERNAL_SERVER_ERROR, messages_1.PERSON_ERROR_MESSAGES.REGISTER_PERSON_FAILURE);
        }
        const token = (0, helpers_1.generateToken)(registeredPerson.id);
        const result = {
            ...registeredPerson,
            token,
        };
        return result;
    }
    async getPeople(user, page = 1, limit = 10) {
        const offset = (page - 1) * limit;
        const people = await PersonsModel_1.default.query()
            .where('id', '!=', user.id)
            .where('is_deleted', false)
            .modify('defaultSelects')
            .withGraphFetched('person_stats')
            .limit(limit)
            .offset(offset)
            .modify('orderByLatest');
        return people;
    }
    async getUserData(user) {
        const userData = await PersonsModel_1.default.query()
            .findById(user.id)
            .modify('defaultSelects')
            .withGraphFetched('[person_stats, person_followers, person_followings]');
        if (!userData) {
            this.raiseError(http_codes_1.HTTP_CODES.NOT_FOUND, messages_1.PERSON_ERROR_MESSAGES.USER_NOT_FOUND);
        }
        return userData;
    }
    async getPersonProfile(uuid) {
        const personProfile = await PersonsModel_1.default.query()
            .findOne({ uuid })
            .where('is_deleted', false)
            .select('id', 'uuid', 'name', 'email', 'created_at', 'updated_at', 'is_deleted')
            .withGraphFetched('[person_stats, person_followers, person_followings, person_posts.[post_likes.creator(defaultSelects), post_stats, creator(defaultSelects)]]');
        if (!personProfile) {
            this.raiseError(http_codes_1.HTTP_CODES.NOT_FOUND, messages_1.PERSON_ERROR_MESSAGES.USER_NOT_FOUND);
        }
        return personProfile;
    }
    async followPerson(user, uuid) {
        if (!uuid) {
            this.raiseError(http_codes_1.HTTP_CODES.BAD_REQUEST, messages_1.PERSON_ERROR_MESSAGES.PROVIDE_PERSON_UUID);
        }
        const personToFollow = await PersonsModel_1.default.checkIfPersonExistsByUUID(uuid);
        if (!personToFollow) {
            this.raiseError(http_codes_1.HTTP_CODES.NOT_FOUND, messages_1.PERSON_ERROR_MESSAGES.USER_NOT_FOUND);
        }
        if (personToFollow.id === user.id) {
            this.raiseError(http_codes_1.HTTP_CODES.BAD_REQUEST, messages_1.PERSON_ERROR_MESSAGES.CANNOT_FOLLOW_YOURSELF);
        }
        const existingFollow = await FollowingsModel_1.default.query().findOne({
            follower_id: user.id,
            followed_id: personToFollow.id,
        });
        if (existingFollow) {
            this.raiseError(http_codes_1.HTTP_CODES.CONFLICT, messages_1.PERSON_ERROR_MESSAGES.ALREADY_FOLLOWING);
        }
        await FollowingsModel_1.default.query().insert({
            follower_id: user.id,
            followed_id: personToFollow.id,
            created_by: user.id,
            updated_by: user.id,
        });
        await this.updatePersonStats(personToFollow.id);
        await this.updatePersonStats(user.id);
        const updatedCurrentUserDetails = await PersonsModel_1.default.query()
            .findById(user.id)
            .modify('defaultSelects')
            .withGraphFetched('[person_stats, person_followers, person_followings]');
        if (!updatedCurrentUserDetails) {
            this.raiseError(http_codes_1.HTTP_CODES.NOT_FOUND, messages_1.PERSON_ERROR_MESSAGES.USER_NOT_FOUND);
        }
        return updatedCurrentUserDetails;
    }
    async unfollowPerson(user, uuid) {
        if (!uuid) {
            this.raiseError(http_codes_1.HTTP_CODES.BAD_REQUEST, messages_1.PERSON_ERROR_MESSAGES.PROVIDE_PERSON_UUID);
        }
        const personToUnfollow = await PersonsModel_1.default.checkIfPersonExistsByUUID(uuid);
        if (!personToUnfollow) {
            this.raiseError(http_codes_1.HTTP_CODES.NOT_FOUND, messages_1.PERSON_ERROR_MESSAGES.USER_NOT_FOUND);
        }
        const existingFollow = await FollowingsModel_1.default.query().findOne({
            follower_id: user.id,
            followed_id: personToUnfollow.id,
        });
        if (!existingFollow) {
            this.raiseError(http_codes_1.HTTP_CODES.NOT_FOUND, messages_1.PERSON_ERROR_MESSAGES.NOT_FOLLOWING);
        }
        await FollowingsModel_1.default.query().delete().where({
            follower_id: user.id,
            followed_id: personToUnfollow.id,
        });
        await this.updatePersonStats(personToUnfollow.id);
        await this.updatePersonStats(user.id);
        const updatedCurrentUserDetails = await PersonsModel_1.default.query()
            .findById(user.id)
            .modify('defaultSelects')
            .withGraphFetched('[person_stats, person_followers, person_followings]');
        if (!updatedCurrentUserDetails) {
            this.raiseError(http_codes_1.HTTP_CODES.NOT_FOUND, messages_1.PERSON_ERROR_MESSAGES.USER_NOT_FOUND);
        }
        return updatedCurrentUserDetails;
    }
    async search(user, searchQuery) {
        if (!searchQuery || searchQuery.trim().length === 0) {
            this.raiseError(http_codes_1.HTTP_CODES.BAD_REQUEST, messages_1.PERSON_ERROR_MESSAGES.PROVIDE_SEARCH_QUERY);
        }
        const searchResults = await PersonsModel_1.default.query()
            .where('id', '!=', user.id)
            .where('is_deleted', false)
            .where(builder => {
            builder
                .where('name', 'ilike', `%${searchQuery}%`)
                .orWhere('email', 'ilike', `%${searchQuery}%`);
        })
            .modify('defaultSelects')
            .withGraphFetched('person_stats')
            .limit(20)
            .modify('orderByLatest');
        return searchResults;
    }
    async updatePersonStats(personId) {
        const followerCountResult = await FollowingsModel_1.default.query()
            .where('followed_id', personId)
            .count('* as count')
            .first();
        const followingCountResult = await FollowingsModel_1.default.query()
            .where('follower_id', personId)
            .count('* as count')
            .first();
        const PostsModel = require('@/models/PostsModel').default;
        const postCountResult = await PostsModel.query()
            .where('created_by', personId)
            .where('is_deleted', false)
            .count('* as count')
            .first();
        const followerCount = Number(followerCountResult?.count || 0);
        const followingCount = Number(followingCountResult?.count || 0);
        const postCount = Number(postCountResult?.count || 0);
        await PersonStatsModel_1.default.query()
            .insert({
            person_id: personId,
            follower_count: followerCount,
            following_count: followingCount,
            post_count: postCount,
        })
            .onConflict('person_id')
            .merge({
            follower_count: followerCount,
            following_count: followingCount,
            post_count: postCount,
        });
    }
}
exports.default = PersonService;
//# sourceMappingURL=PersonService.js.map