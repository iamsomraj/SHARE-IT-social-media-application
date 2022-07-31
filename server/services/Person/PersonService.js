const PersonsModel = require("../../models/PersonsModel");
const { generateToken, validateHash, hash } = require("../../utils/helpers");
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
   * @param {string} email - person's email
   * @param {string} password - person's password
   * @route POST /api/v1/persons/auth
   * @access public
   */
  async loginPerson(email, password) {
    /* BEGIN: VALIDATIONS */
    if (!email || !password) {
      this.raiseError(HTTP_CODES.BAD_REQUEST, PERSON_ERROR_MESSAGES.PROVIDE_EMAIL_AND_PASSWORD);
    }
    /* END: VALIDATIONS */

    /* BEGIN: DATABASE VALIDATIONS */
    let doesPersonExist = await PersonsModel.checkIfPersonExistsByEmail(email);

    /* CHECKING IF PERSON RECORD EXISTS OR NOT */
    if (!doesPersonExist) this.raiseError(HTTP_CODES.NOT_FOUND, PERSON_ERROR_MESSAGES.USER_NOT_FOUND);
    /* CHECKING IF PASSWORD MATCHES OR NOT */
    if (!validateHash(password, doesPersonExist.password)) this.raiseError(HTTP_CODES.UNAUTHORIZED, PERSON_ERROR_MESSAGES.WRONG_CREDENTIALS);
    /* END: DATABASE VALIDATIONS */

    /* BEGIN: PERSON DETAILS FETCHING */
    let personRecord = await PersonsModel.getPersonDetailsByEmail(email);
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

  /**
   * @description REGISTERS A PERSON
   * @param {string} name - person's name
   * @param {string} email - person's email
   * @param {string} password - person's password
   * @route POST /api/v1/persons/
   * @access public
   */
  async registerPerson(name, email, password) {
    /* BEGIN: VALIDATIONS */
    if (!email || !name || !password) {
      this.raiseError(HTTP_CODES.BAD_REQUEST, PERSON_ERROR_MESSAGES.PROVIDE_NAME_EMAIL_AND_PASSWORD);
    }
    /* END: VALIDATIONS */

    /* BEGIN: DATABASE VALIDATIONS */
    const doesUserExist = await PersonsModel.checkIfPersonExistsByEmail(email);

    /* CHECKING IF PERSON RECORD EXISTS OR NOT */
    if (doesUserExist) {
      this.raiseError(HTTP_CODES.CONFLICT, PERSON_ERROR_MESSAGES.USER_ALREADY_EXISTS);
    }
    /* END: DATABASE VALIDATIONS */

    /* BEGIN: PERSON DETAILS INSERTION */
    await PersonsModel.query().insert({
      name,
      email,
      password: hash(password),
      is_deleted: false,
    });
    /* END: PERSON DETAILS INSERTION */

    /* BEGIN: PERSON DETAILS FETCHING */
    const registeredPerson = await PersonsModel.getPersonDetailsByEmail(email);
    /* END: PERSON DETAILS FETCHING */

    /* BEGIN: TOKEN GENERATION */
    const token = generateToken(registeredPerson.id);
    /* END: TOKEN GENERATION */

    const result = {
      ...registeredPerson,
      token,
    };

    return result;
  }

  /**
   * @description FETCHES LIST OF PEOPLE AVAILABLE IN THE PLATFORM
   * @param {{ id }} user - user's id
   * @param {number} page - page number
   * @param {number} limit - number of records per page
   * @route GET /api/v1/persons/people
   * @access private
   */
  async getPeople(user, page = 1, limit = 10) {
    if (!user || !user.id) {
      this.raiseError(HTTP_CODES.BAD_REQUEST, PERSON_ERROR_MESSAGES.INVALID_USER_DETAILS);
    }

    const result = await PersonsModel.query().select("uuid", "id", "name", "email").where("id", "!=", user.id).page(page, limit);

    if (!result) {
      this.raiseError(HTTP_CODES.NOT_FOUND, PERSON_ERROR_MESSAGES.NO_PEOPLE_FOUND);
    }

    return result;
  }

  /**
   * @description FETCHES DETAILS OF THE LOGGED IN USER
   * @param {{ id, email }} user - user's id, email
   * @route GET /api/v1/persons/
   * @access private
   */
  async getUserData(user) {
    if (!user || !user.id || !user.email) {
      this.raiseError(HTTP_CODES.BAD_REQUEST, PERSON_ERROR_MESSAGES.INVALID_USER_DETAILS);
    }

    /* BEGIN: PERSON DETAILS FETCHING */
    const personRecord = await PersonsModel.getPersonDetailsByEmail(email);
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
