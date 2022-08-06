const RootService = require("../Root/RootService");
const HTTP_CODES = require("../../utils/constants/http-codes");
const { PERSON_ERROR_MESSAGES, GENERAL_MESSAGES } = require("../../utils/constants/messages");
const FollowingsModel = require("../../models/FollowingsModel");
const PostsModel = require("../../models/PostsModel");
const PostStatsModel = require("../../models/PostStatsModel");
const PersonStatsModel = require("../../models/PersonStatsModel");
const PostLikesModel = require("../../models/PostLikesModel");

/**
 * CLASS FOR HANDLING REQUESTS MADE BY ALL POST RELATED CONTROLLERS
 */
class PostService extends RootService {
  constructor() {
    super();
  }

  /**
   * @description ADDS ONE LIKE FOR ONE POST
   * @param {{ id }} user - logged in user
   * @param {string} uuid - post's uuid
   * @route POST /api/v1/posts/:uuid
   * @access private
   */
  async addLike(user, uuid) {
    /* BEGIN: VALIDATIONS */
    if (!uuid) this.raiseError(HTTP_CODES.BAD_REQUEST, GENERAL_MESSAGES.PROVIDE_POST_DETAILS);
    /* END: VALIDATIONS */

    /* BEGIN: DATABASE VALIDATIONS */
    /* CHECKING IF POST RECORD EXISTS OR NOT */
    const postRecord = await PostsModel.query().findOne({ uuid, is_deleted: false });
    if (!postRecord) this.raiseError(HTTP_CODES.NOT_FOUND, GENERAL_MESSAGES.POST_NOT_FOUND);

    /* CHECKING IF POST LIKE RECORD FOR THE GIVEN USER EXISTS OR NOT */
    const postLikeRecord = await PostLikesModel.query().findOne({ post_id: postRecord.id, created_by: user.id });
    if (postLikeRecord) this.raiseError(HTTP_CODES.BAD_REQUEST, GENERAL_MESSAGES.ALREADY_LIKED_POST);
    /* END: DATABASE VALIDATIONS */

    /* BEGIN: DATABASE OPERATIONS */
    const likeRecord = await PostLikesModel.query().insert({
      post_id: postRecord.id,
      created_by: user.id,
      updated_by: user.id,
    });
    if (!likeRecord) this.raiseError(HTTP_CODES.INTERNAL_SERVER_ERROR, PERSON_ERROR_MESSAGES.LIKE_FAILURE);

    const postStatRecord = await PostStatsModel.query().where("post_id", postRecord.id).increment("like_count", 1);
    if (!postStatRecord) this.raiseError(HTTP_CODES.INTERNAL_SERVER_ERROR, PERSON_ERROR_MESSAGES.LIKE_FAILURE);

    const result = await PostsModel.getPostDetails(postRecord.uuid);
    if (!result) this.raiseError(HTTP_CODES.INTERNAL_SERVER_ERROR, PERSON_ERROR_MESSAGES.LIKE_FAILURE);
    /* END: DATABASE OPERATIONS */

    return result;
  }

  /**
   * @description CREATES A POST
   * @param {{ id }} user - logged in user
   * @param {string} content - post's content
   * @route POST /api/v1/posts/create
   * @access private
   */
  async createPost(user, content) {
    /* BEGIN: VALIDATIONS */
    if (!content) this.raiseError(HTTP_CODES.BAD_REQUEST, GENERAL_MESSAGES.PROVIDE_POST_DETAILS);
    /* END: VALIDATIONS */

    /* BEGIN: DATABASE OPERATIONS */
    /* CREATING POST RECORD */
    const postRecord = await PostsModel.query().insert({
      content,
      created_by: user.id,
      updated_by: user.id,
    });
    if (!postRecord) this.raiseError(HTTP_CODES.INTERNAL_SERVER_ERROR, PERSON_ERROR_MESSAGES.POST_FAILURE);
    /* CREATING POST STAT RECORD */
    const postStatRecord = await PostStatsModel.query().insert({
      post_id: postRecord.id,
      like_count: 0,
      comment_count: 0,
    });
    if (!postStatRecord) this.raiseError(HTTP_CODES.INTERNAL_SERVER_ERROR, PERSON_ERROR_MESSAGES.POST_FAILURE);

    /* UPDATING PERSON STAT RECORD */
    const creatorPersonStatRecord = await PersonStatsModel.query().where("person_id", user.id).increment("post_count", 1);
    if (!creatorPersonStatRecord) this.raiseError(HTTP_CODES.INTERNAL_SERVER_ERROR, PERSON_ERROR_MESSAGES.POST_FAILURE);
    /* END: DATABASE OPERATIONS */

    const result = await PostsModel.getPostDetails(postRecord.uuid);
    if (!result) this.raiseError(HTTP_CODES.INTERNAL_SERVER_ERROR, PERSON_ERROR_MESSAGES.POST_FAILURE);
    /* END: DATABASE OPERATIONS */

    return result;
  }

  async getPostFeed(user) {
    /* BEGIN: FETCH FOLLOWINGS OF PERSON */
    const followingRecords = await FollowingsModel.query().where("follower_id", user.id);
    /* END: FETCH FOLLOWINGS OF PERSON */

    if (!followingRecords) this.raiseError(HTTP_CODES.INTERNAL_SERVER_ERROR, PERSON_ERROR_MESSAGES.POST_FEED_FAILURE);

    const followingIds = followingRecords.map((record) => record.followed_id);

    /* BEGIN: FETCH POSTS OF FOLLOWINGS */
    const postRecords = await PostsModel.query().withGraphFetched("[post_stats, post_likes]").whereIn("created_by", followingIds).orderBy("created_at", "desc");
    /* END: FETCH POSTS OF FOLLOWINGS */

    if (!postRecords) this.raiseError(HTTP_CODES.INTERNAL_SERVER_ERROR, PERSON_ERROR_MESSAGES.POST_FEED_FAILURE);

    return postRecords;
  }
}

module.exports = PostService;
