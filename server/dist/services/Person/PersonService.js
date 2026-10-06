"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FollowingsModel_1 = __importDefault(require("../../models/FollowingsModel"));
const PersonsModel_1 = __importDefault(require("../../models/PersonsModel"));
const PersonStatsModel_1 = __importDefault(require("../../models/PersonStatsModel"));
const http_codes_1 = require("../../utils/constants/http-codes");
const messages_1 = require("../../utils/constants/messages");
const errors_1 = require("../../utils/errors");
const helpers_1 = require("../../utils/helpers");
const SELF_GRAPH = '[person_stats, person_followers, person_followings]';
const SEARCH_LIMIT = 20;
const notFound = () => new errors_1.HttpError(http_codes_1.HTTP_CODES.NOT_FOUND, messages_1.PERSON_ERROR_MESSAGES.USER_NOT_FOUND);
/** Escapes `%`, `_` and `\` so user input is matched literally by ILIKE. */
const escapeLike = (value) => value.replace(/[\\%_]/g, '\\$&');
/**
 * Handles all person-related business logic.
 */
class PersonService {
    /**
     * @route POST /api/v1/persons/auth
     */
    async loginPerson(email, password) {
        const person = await PersonsModel_1.default.checkIfPersonExistsByEmail(email);
        if (!person) {
            throw notFound();
        }
        if (!(await (0, helpers_1.verifyPassword)(password, person.password))) {
            throw new errors_1.HttpError(http_codes_1.HTTP_CODES.BAD_REQUEST, messages_1.PERSON_ERROR_MESSAGES.WRONG_CREDENTIALS);
        }
        return this.buildAuthResponse(email);
    }
    /**
     * @route POST /api/v1/persons/
     */
    async registerPerson(name, email, password) {
        if (await PersonsModel_1.default.checkIfPersonExistsByEmail(email)) {
            throw new errors_1.HttpError(http_codes_1.HTTP_CODES.BAD_REQUEST, messages_1.PERSON_ERROR_MESSAGES.USER_ALREADY_EXISTS);
        }
        const hashedPassword = await (0, helpers_1.hashPassword)(password);
        await PersonsModel_1.default.transaction(async (trx) => {
            const person = await PersonsModel_1.default.query(trx).insertAndFetch({
                name,
                email,
                password: hashedPassword,
                is_deleted: false,
            });
            await PersonStatsModel_1.default.query(trx).insert({
                person_id: person.id,
                post_count: 0,
                following_count: 0,
                follower_count: 0,
            });
        });
        return this.buildAuthResponse(email);
    }
    /**
     * @route GET /api/v1/persons/people
     */
    async getPeople(user, page, limit) {
        return PersonsModel_1.default.query()
            .where('id', '!=', user.id)
            .where('is_deleted', false)
            .modify('defaultSelects')
            .withGraphFetched('person_stats')
            .limit(limit)
            .offset((page - 1) * limit)
            .modify('orderByLatest');
    }
    /**
     * @route GET /api/v1/persons/
     */
    async getUserData(user) {
        return this.getSelfDetails(user.id);
    }
    /**
     * @route GET /api/v1/persons/:uuid
     */
    async getPersonProfile(uuid) {
        const profile = await PersonsModel_1.default.query()
            .findOne({ uuid, is_deleted: false })
            .select('id', 'uuid', 'name', 'email', 'created_at', 'updated_at', 'is_deleted')
            .withGraphFetched('[person_stats, person_followers, person_followings, person_posts.[post_likes.creator(defaultSelects), post_stats, creator(defaultSelects)]]');
        if (!profile) {
            throw notFound();
        }
        return profile;
    }
    /**
     * @route POST /api/v1/persons/follow/:uuid
     */
    async followPerson(user, uuid) {
        const target = await PersonsModel_1.default.checkIfPersonExistsByUUID(uuid);
        if (!target) {
            throw notFound();
        }
        if (target.id === user.id) {
            throw new errors_1.HttpError(http_codes_1.HTTP_CODES.BAD_REQUEST, messages_1.PERSON_ERROR_MESSAGES.CANNOT_FOLLOW_YOURSELF);
        }
        const existing = await FollowingsModel_1.default.query().findOne({
            follower_id: user.id,
            followed_id: target.id,
        });
        if (existing) {
            throw new errors_1.HttpError(http_codes_1.HTTP_CODES.CONFLICT, messages_1.PERSON_ERROR_MESSAGES.ALREADY_FOLLOWING);
        }
        await FollowingsModel_1.default.transaction(async (trx) => {
            await FollowingsModel_1.default.query(trx).insert({
                follower_id: user.id,
                followed_id: target.id,
                created_by: user.id,
                updated_by: user.id,
            });
            await this.refreshPersonStats(target.id, trx);
            await this.refreshPersonStats(user.id, trx);
        });
        return this.getSelfDetails(user.id);
    }
    /**
     * @route POST /api/v1/persons/unfollow/:uuid
     */
    async unfollowPerson(user, uuid) {
        const target = await PersonsModel_1.default.checkIfPersonExistsByUUID(uuid);
        if (!target) {
            throw notFound();
        }
        const existing = await FollowingsModel_1.default.query().findOne({
            follower_id: user.id,
            followed_id: target.id,
        });
        if (!existing) {
            throw new errors_1.HttpError(http_codes_1.HTTP_CODES.NOT_FOUND, messages_1.PERSON_ERROR_MESSAGES.NOT_FOLLOWING);
        }
        await FollowingsModel_1.default.transaction(async (trx) => {
            await FollowingsModel_1.default.query(trx)
                .delete()
                .where({ follower_id: user.id, followed_id: target.id });
            await this.refreshPersonStats(target.id, trx);
            await this.refreshPersonStats(user.id, trx);
        });
        return this.getSelfDetails(user.id);
    }
    /**
     * @route POST /api/v1/persons/search
     */
    async search(user, searchQuery) {
        const pattern = `%${escapeLike(searchQuery)}%`;
        return PersonsModel_1.default.query()
            .where('id', '!=', user.id)
            .where('is_deleted', false)
            .where(builder => {
            builder
                .where('name', 'ilike', pattern)
                .orWhere('email', 'ilike', pattern);
        })
            .modify('defaultSelects')
            .withGraphFetched('person_stats')
            .limit(SEARCH_LIMIT)
            .modify('orderByLatest');
    }
    async buildAuthResponse(email) {
        const person = await PersonsModel_1.default.getPersonDetailsByEmail(email);
        if (!person) {
            throw new errors_1.HttpError(http_codes_1.HTTP_CODES.INTERNAL_SERVER_ERROR, messages_1.PERSON_ERROR_MESSAGES.FETCH_USER_DATA_FAILURE);
        }
        return { ...person, token: (0, helpers_1.generateToken)(person.id) };
    }
    async getSelfDetails(personId) {
        const person = await PersonsModel_1.default.query()
            .findById(personId)
            .modify('defaultSelects')
            .withGraphFetched(SELF_GRAPH);
        if (!person) {
            throw notFound();
        }
        return person;
    }
    /**
     * Recomputes follower/following/post counters from source tables
     * in a single upsert (one round trip per person).
     */
    async refreshPersonStats(personId, trx) {
        await trx.raw(`
      INSERT INTO person_stats (person_id, follower_count, following_count, post_count)
      SELECT :personId,
        (SELECT count(*) FROM followings WHERE followed_id = :personId),
        (SELECT count(*) FROM followings WHERE follower_id = :personId),
        (SELECT count(*) FROM posts WHERE created_by = :personId AND is_deleted = false)
      ON CONFLICT (person_id) DO UPDATE SET
        follower_count = EXCLUDED.follower_count,
        following_count = EXCLUDED.following_count,
        post_count = EXCLUDED.post_count
      `, { personId });
    }
}
exports.default = new PersonService();
//# sourceMappingURL=PersonService.js.map