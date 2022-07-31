const { Model } = require("objection");
const { randomUUID } = require("crypto");

class PersonsModel extends Model {
  static get tableName() {
    return "public.persons";
  }

  $beforeInsert() {
    this.created_at = new Date().toISOString();
    this.uuid = randomUUID();
  }

  $beforeUpdate() {
    this.updated_at = new Date().toISOString();
  }

  static get idColumn() {
    return "id";
  }

  static get nameColumn() {
    return "name";
  }

  static get emailColumn() {
    return "email";
  }

  static get passwordColumn() {
    return "password";
  }

  static get createdAtColumn() {
    return "created_at";
  }

  static get updatedAtColumn() {
    return "updated_at";
  }

  static get isDeletedColumn() {
    return "is_deleted";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "email", "password"],
      properties: {
        id: { type: "integer" },
        uuid: { type: "string" },
        name: { type: "string", minLength: 3, maxLength: 255 },
        email: { type: "string", minLength: 5, maxLength: 50 },
        password: { type: "string", minLength: 4, maxLength: 255 },
        created_at: { type: "string" },
        updated_at: { type: "string" },
        is_deleted: { type: "boolean" },
      },
    };
  }

  static get relationMappings() {
    const FollowingsModel = require("./FollowingsModel.js");
    const PostsModel = require("./PostsModel.js");
    const PostLikesModel = require("./PostLikesModel.js");
    return {
      person_followers: {
        relation: Model.HasManyRelation,
        modelClass: FollowingsModel,
        join: {
          from: "public.persons.id",
          to: "public.followings.follower_id",
        },
      },
      person_followings: {
        relation: Model.HasManyRelation,
        modelClass: FollowingsModel,
        join: {
          from: "public.persons.id",
          to: "public.followings.followed_id",
        },
      },
      person_posts: {
        relation: Model.HasManyRelation,
        modelClass: PostsModel,
        join: {
          from: "public.persons.id",
          to: "public.posts.created_by",
        },
      },
      person_post_likes: {
        relation: Model.HasManyRelation,
        modelClass: PostLikesModel,
        join: {
          from: "public.persons.id",
          to: "public.post_likes.created_by",
        },
      },
    };
  }

  static get modifiers() {
    return {
      defaultSelects(builder) {
        builder.select("id", "uuid", "name", "email", "created_at", "updated_at");
      },
    };
  }

  static async getPersonDetailsByEmail(email) {
    let personRecord = await PersonsModel.query()
      .select("persons.id", "persons.uuid", "persons.name", "persons.email", "persons.created_at", "persons.updated_at")
      .findOne({
        email,
      })
      .withGraphFetched("[person_followers, person_followings, person_posts.[post_likes.creator, post_stats]]");
    return personRecord;
  }
}

module.exports = PersonsModel;
