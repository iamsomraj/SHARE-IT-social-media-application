const RootService = require("../Root/RootService");
const HTTP_CODES = require("../../utils/constants/http-codes");
const { PERSON_ERROR_MESSAGES, GENERAL_MESSAGES } = require("../../utils/constants/messages");
const FollowingsModel = require("../../models/FollowingsModel");
const PostsModel = require("../../models/PostsModel");
const PostStatsModel = require("../../models/PostStatsModel");
const PersonStatsModel = require("../../models/PersonStatsModel");
const PostLikesModel = require("../../models/PostLikesModel");
const StoriesModel = require("../../models/StoriesModel");

/**
 * CLASS FOR HANDLING REQUESTS MADE BY ALL POST RELATED CONTROLLERS
 */
class PostService extends RootService {
  constructor() {
    super();
  }

  /**
   * @description ADDS LIKE ON POST
   * @param {{ id }} user - logged in user
   * @param {string} uuid - post's uuid
   * @route POST /api/v1/posts/like/:uuid
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
    /* INSERT POST LIKE RECORD */
    const likeRecord = await PostLikesModel.query().insert({
      post_id: postRecord.id,
      created_by: user.id,
      updated_by: user.id,
    });
    if (!likeRecord) this.raiseError(HTTP_CODES.INTERNAL_SERVER_ERROR, PERSON_ERROR_MESSAGES.LIKE_FAILURE);

    /* UPDATE POST STAT RECORD */
    const postStatRecord = await PostStatsModel.query().where("post_id", postRecord.id).increment("like_count", 1);
    if (!postStatRecord) this.raiseError(HTTP_CODES.INTERNAL_SERVER_ERROR, PERSON_ERROR_MESSAGES.LIKE_FAILURE);

    const result = await PostsModel.getPostDetails(postRecord.uuid);
    if (!result) this.raiseError(HTTP_CODES.INTERNAL_SERVER_ERROR, PERSON_ERROR_MESSAGES.LIKE_FAILURE);
    /* END: DATABASE OPERATIONS */

    return result;
  }

  /**
   * @description MARKS A POST AS STORY
   * @param {{ id }} user - logged in user
   * @param {string} post_uuid - post's uuid
   * @route POST /api/v1/posts/story/:post_uuid
   * @access private
   */
  async addStory(user, post_uuid) {
    /* BEGIN: VALIDATIONS */
    if (!post_uuid) this.raiseError(HTTP_CODES.BAD_REQUEST, GENERAL_MESSAGES.PROVIDE_POST_DETAILS);
    /* END: VALIDATIONS */

    /* BEGIN: DATABASE VALIDATIONS */
    /* CHECKING IF POST RECORD EXISTS OR NOT */
    const postRecord = await PostsModel.query().findOne({ uuid: post_uuid, is_deleted: false });
    if (!postRecord) this.raiseError(HTTP_CODES.NOT_FOUND, GENERAL_MESSAGES.POST_NOT_FOUND);

    /* CHECKING IF PERSON POST STORY RECORD FOR THE GIVEN USER EXISTS OR NOT */
    const storyRecord = await StoriesModel.query().findOne({ post_id: postRecord.id, person_id: user.id });
    if (storyRecord) this.raiseError(HTTP_CODES.BAD_REQUEST, GENERAL_MESSAGES.ALREADY_STORY_POST);
    /* END: DATABASE VALIDATIONS */

    /* BEGIN: DATABASE OPERATIONS */
    /* INSERT PERSON POST STORY RECORD */
    const favouriteRecord = await StoriesModel.query().insert({
      post_id: postRecord.id,
      person_id: user.id,
    });
    if (!favouriteRecord) this.raiseError(HTTP_CODES.INTERNAL_SERVER_ERROR, PERSON_ERROR_MESSAGES.STORY_FAILURE);

    /* UPDATE POST STAT RECORD */
    const postStatRecord = await PostStatsModel.query().where("post_id", postRecord.id).increment("story_count", 1);
    if (!postStatRecord) this.raiseError(HTTP_CODES.INTERNAL_SERVER_ERROR, PERSON_ERROR_MESSAGES.STORY_FAILURE);

    const result = await PostsModel.getPostDetails(postRecord.uuid);
    if (!result) this.raiseError(HTTP_CODES.INTERNAL_SERVER_ERROR, PERSON_ERROR_MESSAGES.STORY_FAILURE);
    /* END: DATABASE OPERATIONS */

    return result;
  }

  /**
   * @description REMOVES STORY MARK FROM A POST
   * @param {{ id }} user - logged in user
   * @param {string} post_uuid - post's uuid
   * @route POST /api/v1/posts/remove-story/:post_uuid
   * @access private
   */
  async removeStory(user, post_uuid) {
    /* BEGIN: VALIDATIONS */
    if (!post_uuid) this.raiseError(HTTP_CODES.BAD_REQUEST, GENERAL_MESSAGES.PROVIDE_POST_DETAILS);
    /* END: VALIDATIONS */

    /* BEGIN: DATABASE VALIDATIONS */
    /* CHECKING IF POST RECORD EXISTS OR NOT */
    const postRecord = await PostsModel.query().findOne({ uuid: post_uuid, is_deleted: false });
    if (!postRecord) this.raiseError(HTTP_CODES.NOT_FOUND, GENERAL_MESSAGES.POST_NOT_FOUND);

    /* CHECKING IF PERSON POST STORY RECORD FOR THE GIVEN USER EXISTS OR NOT */
    const storyRecord = await StoriesModel.query().findOne({ post_id: postRecord.id, person_id: user.id });
    if (!storyRecord) this.raiseError(HTTP_CODES.BAD_REQUEST, GENERAL_MESSAGES.NOT_STORY_YET);
    /* END: DATABASE VALIDATIONS */

    /* BEGIN: DATABASE OPERATIONS */
    /* DELETE PERSON POST STORY RECORD */
    const favouriteRecord = await StoriesModel.query().deleteById(storyRecord.id);
    if (!favouriteRecord) this.raiseError(HTTP_CODES.INTERNAL_SERVER_ERROR, PERSON_ERROR_MESSAGES.UNSTORY_FAILURE);

    /* UPDATE POST STAT RECORD */
    const postStatRecord = await PostStatsModel.query().where("post_id", postRecord.id).decrement("story_count", 1);
    if (!postStatRecord) this.raiseError(HTTP_CODES.INTERNAL_SERVER_ERROR, PERSON_ERROR_MESSAGES.UNSTORY_FAILURE);

    const result = await PostsModel.getPostDetails(postRecord.uuid);
    if (!result) this.raiseError(HTTP_CODES.INTERNAL_SERVER_ERROR, PERSON_ERROR_MESSAGES.UNSTORY_FAILURE);
    /* END: DATABASE OPERATIONS */

    return result;
  }

  /**
   * @description REMOVES LIKE ON POST
   * @param {{ id }} user - logged in user
   * @param {string} uuid - post's uuid
   * @route POST /api/v1/posts/unlike/:uuid
   * @access private
   */
  async removeLike(user, uuid) {
    /* BEGIN: VALIDATIONS */
    if (!uuid) this.raiseError(HTTP_CODES.BAD_REQUEST, GENERAL_MESSAGES.PROVIDE_POST_DETAILS);
    /* END: VALIDATIONS */

    /* BEGIN: DATABASE VALIDATIONS */
    /* CHECKING IF POST RECORD EXISTS OR NOT */
    const postRecord = await PostsModel.query().findOne({ uuid, is_deleted: false });
    if (!postRecord) this.raiseError(HTTP_CODES.NOT_FOUND, GENERAL_MESSAGES.POST_NOT_FOUND);

    /* CHECKING IF POST LIKE RECORD FOR THE GIVEN USER EXISTS OR NOT */
    const postLikeRecord = await PostLikesModel.query().findOne({ post_id: postRecord.id, created_by: user.id });
    if (!postLikeRecord) this.raiseError(HTTP_CODES.BAD_REQUEST, GENERAL_MESSAGES.NOT_LIKED_YET);
    /* END: DATABASE VALIDATIONS */

    /* BEGIN: DATABASE OPERATIONS */
    /* DELETE POST LIKE RECORD */
    const likeRecord = await PostLikesModel.query().deleteById(postLikeRecord.id);
    if (!likeRecord) this.raiseError(HTTP_CODES.INTERNAL_SERVER_ERROR, PERSON_ERROR_MESSAGES.UNLIKE_FAILURE);

    /* UPDATE POST STAT RECORD */
    const postStatRecord = await PostStatsModel.query().where("post_id", postRecord.id).decrement("like_count", 1);
    if (!postStatRecord) this.raiseError(HTTP_CODES.INTERNAL_SERVER_ERROR, PERSON_ERROR_MESSAGES.UNLIKE_FAILURE);

    const result = await PostsModel.getPostDetails(postRecord.uuid);
    if (!result) this.raiseError(HTTP_CODES.INTERNAL_SERVER_ERROR, PERSON_ERROR_MESSAGES.UNLIKE_FAILURE);
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

  /**
   * @description GET ALL THE POST FOR THE FEED
   * @param {{ id }} user - logged in user
   * @route GET /api/v1/posts/feed
   * @access private
   */
  async getFeedPosts(user) {
    /* BEGIN: FETCH FOLLOWINGS OF PERSON */
    const followingRecords = await FollowingsModel.query().where("follower_id", user.id);
    /* END: FETCH FOLLOWINGS OF PERSON */

    if (!followingRecords) this.raiseError(HTTP_CODES.INTERNAL_SERVER_ERROR, PERSON_ERROR_MESSAGES.POST_FEED_FAILURE);

    const followingIds = followingRecords.map((record) => record.followed_id);

    /* BEGIN: FETCH POSTS OF FOLLOWINGS */
    const postRecords = await PostsModel.query()
      .withGraphFetched("[post_likes(orderByLatest).creator(defaultSelects), post_stories(orderByLatest).creator(defaultSelects), post_stats, creator(defaultSelects)]")
      .where((buider) => {
        buider.orWhereIn("created_by", followingIds);
        buider.orWhere("created_by", user.id);
      })
      .modifiers("orderByLatest");
    /* END: FETCH POSTS OF FOLLOWINGS */

    if (!postRecords) this.raiseError(HTTP_CODES.INTERNAL_SERVER_ERROR, PERSON_ERROR_MESSAGES.POST_FEED_FAILURE);

    return postRecords;
  }

  /**
   * @description GET ALL THE STORY POSTS FOR THE USER
   * @param {{ id }} user - logged in user
   * @route GET /api/v1/posts/stories
   * @access private
   */
  async getFavouritePosts(user) {
    /* BEGIN: FETCH PERSON POST STORY RECORDS FOR A PERSON */
    const storyRecords = await StoriesModel.query().where("person_id", user.id);
    /* END: FETCH PERSON POST STORY RECORDS FOR A PERSON */

    if (!storyRecords) this.raiseError(HTTP_CODES.INTERNAL_SERVER_ERROR, PERSON_ERROR_MESSAGES.POST_STORY_FAILURE);

    const postIds = storyRecords.map((record) => record.post_id);

    /* BEGIN: FETCH POSTS OF FOLLOWINGS */
    const postRecords = await PostsModel.query()
      .withGraphFetched("[post_likes(orderByLatest).creator(defaultSelects), post_stories(orderByLatest).creator(defaultSelects), post_stats, creator(defaultSelects)]")
      .whereIn("id", postIds)
      .andWhere("is_deleted", false)
      .andWhereRaw("created_at::timestamptz >= NOW() - INTERVAL '1 DAY'")
      .modifiers("orderByLatest");
    /* END: FETCH POSTS OF FOLLOWINGS */

    if (!postRecords) this.raiseError(HTTP_CODES.INTERNAL_SERVER_ERROR, PERSON_ERROR_MESSAGES.POST_STORY_FAILURE);

    return postRecords;
  }

  /**
   * @description FETCHES A POST WITH THE GIVEN UUID OF THE POST
   * @param {string} uuid - post's UUID
   * @route POST /api/v1/posts/:uuid
   * @access private
   */
  async fetchPost(uuid) {
    /* BEGIN: VALIDATIONS */
    if (!uuid) this.raiseError(HTTP_CODES.BAD_REQUEST, GENERAL_MESSAGES.PROVIDE_POST_DETAILS);
    /* END: VALIDATIONS */

    /* BEGIN: DATABASE OPERATIONS */
    /* FETCHING POST RECORD */
    const postRecord = await PostsModel.query().findOne({
      uuid,
      is_deleted: false,
    });
    if (!postRecord) this.raiseError(HTTP_CODES.INTERNAL_SERVER_ERROR, GENERAL_MESSAGES.POST_NOT_FOUND);

    const result = await PostsModel.getPostDetails(postRecord.uuid);
    if (!result) this.raiseError(HTTP_CODES.INTERNAL_SERVER_ERROR, PERSON_ERROR_MESSAGES.POST_FAILURE);
    /* END: DATABASE OPERATIONS */

    return result;
  }
}

module.exports = PostService;
