const Like = require("../../models/Like");
const Person = require("../../models/Person");
const { generateToken, validateHash } = require("../../utils/helpers");
const RootService = require("../Root/RootService");

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
      this.raiseError(400, PERSON_ERROR_MESSAGES.PROVIDE_EMAIL_AND_PASSWORD);
    }
    /* END: VALIDATIONS */

    /* BEGIN: DATABASE VALIDATIONS */
    const personRecord = await Person.query()
      .findOne({
        email,
      })
      .withGraphFetched("[followings, followers, posts, likes]");
      
    /* CHECKING IF PERSON RECORD EXISTS OR NOT */
    if (!personRecord) this.raiseError("404", PERSON_ERROR_MESSAGES.USER_NOT_FOUND);
    /* CHECKING IF PASSWORD MATCHES OR NOT */
    if (!validateHash(password, personRecord.password)) this.raiseError("401", "Invalid password!");
    /* END: DATABASE VALIDATIONS */

    const posts = await Person.relatedQuery("posts").for(personRecord.id).orderBy("createdAt", "DESC");
    const followers = await Person.relatedQuery("followers").for(personRecord.id);
    const followings = await Person.relatedQuery("followings").for(personRecord.id);

    for (let post of posts) {
      const likesOnPost = await Like.query().where("master_id", "=", post.id);
      post.likesOnPost = likesOnPost;
      post.owner = { uuid: personRecord.uuid, id: personRecord.id, name: personRecord.name, email: personRecord.email };
    }

    const result = {
      id: personRecord.id,
      uuid: personRecord.uuid,
      name: personRecord.name,
      email: personRecord.email,
      token: generateToken(personRecord.id),
      posts,
      followers,
      followings,
    };
    return result;
  }
}

module.exports = PersonService;
