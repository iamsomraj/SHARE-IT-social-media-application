const Like = require("../../models/Like");
const Person = require("../../models/Person");
const { generateToken, validateHash } = require("../../utils/helpers");
const RootService = require("../Root/RootService");
const HTTP_CODES = require("../../utils/constants/http-codes");
const { PERSON_ERROR_MESSAGES } = require("../../utils/constants/messages");

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
    const personRecord = await Person.query()
      .select("id", "uuid", "name", "email", "createdAt", "updatedAt")
      .findOne({
        email,
      })
      .withGraphFetched("[followings, followers, posts.owner(defaultSelects), likes.[owner(defaultSelects), master]]");

    /* CHECKING IF PERSON RECORD EXISTS OR NOT */
    if (!personRecord) this.raiseError(HTTP_CODES.NOT_FOUND, PERSON_ERROR_MESSAGES.USER_NOT_FOUND);
    /* CHECKING IF PASSWORD MATCHES OR NOT */
    if (!validateHash(password, personRecord.password)) this.raiseError(HTTP_CODES.UNAUTHORIZED, PERSON_ERROR_MESSAGES.WRONG_CREDENTIALS);
    /* END: DATABASE VALIDATIONS */

    const result = {
      ...personRecord,
      token: generateToken(personRecord.id),
    };
    return result;
  }
}

module.exports = PersonService;
