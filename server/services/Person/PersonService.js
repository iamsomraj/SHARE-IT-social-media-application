const PostLikesModel = require("../../models/PostLikesModel");
const PersonsModel = require("../../models/PersonsModel");
const { generateToken, validateHash } = require("../../utils/helpers");
const RootService = require("../Root/RootService");
const HTTP_CODES = require("../../utils/constants/http-codes");
const { PERSON_ERROR_MESSAGES } = require("../../utils/constants/messages");
const PostsModel = require("../../models/PostsModel");

/**
 * CLASS FOR HANDLING REQUESTS MADE BY ALL PERSON RELATED CONTROLLERS
 */
class PersonService extends RootService {
  constructor() {
    super();
  }

  /**
   * @description LOGS IN A PERSON
   * @param {string} email
   * @param {string} password
   */
  async loginPerson(email, password) {
    /* BEGIN: VALIDATIONS */
    if (!email || !password) {
      this.raiseError(HTTP_CODES.BAD_REQUEST, PERSON_ERROR_MESSAGES.PROVIDE_EMAIL_AND_PASSWORD);
    }
    /* END: VALIDATIONS */

    /* BEGIN: DATABASE VALIDATIONS */
    let personRecord = await PersonsModel.query().findOne({
      email,
      is_deleted: false,
    });
    /* CHECKING IF PERSON RECORD EXISTS OR NOT */
    if (!personRecord) this.raiseError(HTTP_CODES.NOT_FOUND, PERSON_ERROR_MESSAGES.USER_NOT_FOUND);
    /* CHECKING IF PASSWORD MATCHES OR NOT */
    if (!validateHash(password, personRecord.password)) this.raiseError(HTTP_CODES.UNAUTHORIZED, PERSON_ERROR_MESSAGES.WRONG_CREDENTIALS);
    /* END: DATABASE VALIDATIONS */

    /* BEGIN: PERSON DETAILS FETCHING */
    personRecord = await PersonsModel.query()
      .select("persons.id", "persons.uuid", "persons.name", "persons.email", "persons.created_at", "persons.updated_at")
      .findOne({
        email,
      })
      .withGraphFetched("[person_followers, person_followings, person_posts.[post_likes.creator, post_stats]]");
    /* END: PERSON DETAILS FETCHING */

    /* BEGIN: TOKEN GENERATION */
    const token = generateToken(personRecord.id);
    /* END: TOKEN GENERATION */

    const result = {
      ...personRecord,
      token,
    };

    return result;
  }
}

module.exports = PersonService;
