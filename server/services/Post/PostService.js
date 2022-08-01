const PersonsModel = require("../../models/PersonsModel");
const { generateToken, validateHash, hash } = require("../../utils/helpers");
const RootService = require("../Root/RootService");
const HTTP_CODES = require("../../utils/constants/http-codes");
const { PERSON_ERROR_MESSAGES, GENERAL_MESSAGES } = require("../../utils/constants/messages");

/**
 * CLASS FOR HANDLING REQUESTS MADE BY ALL POST RELATED CONTROLLERS
 */
class PostService extends RootService {
  constructor() {
    super();
  }

  /**
   * @description ADDS ONE LIKE FOR ONE POST
   * @route POST /api/v1/posts/:uuid
   * @param {{ id }} user - logged in user
   * @param {string} uuid - post's uuid
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
    /* END: DATABASE OPERATIONS */

    if (!likeRecord) this.raiseError(HTTP_CODES.INTERNAL_SERVER_ERROR, PERSON_ERROR_MESSAGES.LIKE_FAILURE);

    return likeRecord;
  }
}

module.exports = PostService;
