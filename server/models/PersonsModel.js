const { Model } = require('objection');
const { randomUUID } = require('crypto');

class PersonsModel extends Model {
  static get tableName() {
    return 'public.persons';
  }

  $beforeInsert() {
    this.created_at = new Date().toISOString();
    this.uuid = randomUUID();
  }

  $beforeUpdate() {
    this.updated_at = new Date().toISOString();
  }

  static get idColumn() {
    return 'id';
  }

  static get nameColumn() {
    return 'name';
  }

  static get emailColumn() {
    return 'email';
  }

  static get passwordColumn() {
    return 'password';
  }

  static get createdAtColumn() {
    return 'created_at';
  }

  static get updatedAtColumn() {
    return 'updated_at';
  }

  static get isDeletedColumn() {
    return 'is_deleted';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'email', 'password'],
      properties: {
        id: { type: 'integer' },
        uuid: { type: 'string' },
        name: { type: 'string', minLength: 3, maxLength: 255 },
        email: { type: 'string', minLength: 5, maxLength: 50 },
        password: { type: 'string', minLength: 4, maxLength: 255 },
        created_at: { type: 'string' },
        updated_at: { type: 'string' },
        is_deleted: { type: 'boolean' },
      },
    };
  }

  static get relationMappings() {
    const FollowingsModel = require('./FollowingsModel.js');
    const PostsModel = require('./PostsModel.js');
    const PostLikesModel = require('./PostLikesModel.js');
    const PersonStatsModel = require('./PersonStatsModel.js');
    const StoriesModel = require('./StoriesModel.js');

    return {
      person_followers: {
        relation: Model.HasManyRelation,
        modelClass: FollowingsModel,
        join: {
          from: 'public.persons.id',
          to: 'public.followings.follower_id',
        },
      },
      person_followings: {
        relation: Model.HasManyRelation,
        modelClass: FollowingsModel,
        join: {
          from: 'public.persons.id',
          to: 'public.followings.followed_id',
        },
      },
      person_posts: {
        relation: Model.HasManyRelation,
        modelClass: PostsModel,
        join: {
          from: 'public.persons.id',
          to: 'public.posts.created_by',
        },
      },
      person_stories: {
        relation: Model.HasManyRelation,
        modelClass: StoriesModel,
        join: {
          from: 'public.persons.id',
          to: 'public.stories.person_id',
        },
      },
      person_post_likes: {
        relation: Model.HasManyRelation,
        modelClass: PostLikesModel,
        join: {
          from: 'public.persons.id',
          to: 'public.post_likes.created_by',
        },
      },
      person_stats: {
        relation: Model.HasOneRelation,
        modelClass: PersonStatsModel,
        join: {
          from: 'public.persons.id',
          to: 'public.person_stats.person_id',
        },
      },
    };
  }

  static get modifiers() {
    return {
      defaultSelects(builder) {
        builder.select('id', 'uuid', 'name', 'email', 'created_at', 'updated_at');
      },
      orderByLatest(builder) {
        builder.orderBy([
          { column: 'created_at', order: 'desc', nulls: 'last' },
          { column: 'updated_at', order: 'desc', nulls: 'last' },
        ]);
      },
    };
  }

  /**
   * @description fetches details of a person
   * @param {string} email
   */
  static async getPersonDetailsByEmail(email) {
    let personRecord = await PersonsModel.query()
      .findOne({
        email,
      })
      .withGraphFetched('[person_followers, person_followings, person_stats, person_posts.[post_likes.creator(defaultSelects), post_stats, creator(defaultSelects)]]');
    delete personRecord.password;
    return personRecord;
  }

  /**
   * @description checks if a person exists with the given email
   * @param {string} email - person's email
   */
  static async checkIfPersonExistsByEmail(email) {
    let personRecord = await PersonsModel.query().findOne({
      email,
      is_deleted: false,
    });
    return personRecord;
  }

  /**
   * @description checks if a person exists with the given id
   * @param {number} id - person's id
   */
  static async checkIfPersonExistsById(id) {
    let personRecord = await PersonsModel.query().findOne({
      id,
      is_deleted: false,
    });
    return personRecord;
  }

  /**
   * @description checks if a person exists with the given uuid
   * @param {string} uuid - person's uuid
   */
  static async checkIfPersonExistsByUUID(uuid) {
    let personRecord = await PersonsModel.query().findOne({
      uuid,
      is_deleted: false,
    });
    return personRecord;
  }
}

module.exports = PersonsModel;
