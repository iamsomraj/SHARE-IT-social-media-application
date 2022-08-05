const { Model } = require("objection");
const { randomUUID } = require("crypto");

class PostsModel extends Model {
  static get tableName() {
    return "public.posts";
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

  static get contentColumn() {
    return "content";
  }

  static get createdAtColumn() {
    return "created_at";
  }

  static get updatedAtColumn() {
    return "created_by";
  }

  static get createdByColumn() {
    return "created_by";
  }

  static get updatedByColumn() {
    return "updated_by";
  }

  static get isDeletedColumn() {
    return "is_deleted";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["content", "created_by"],
      properties: {
        id: { type: "integer" },
        uuid: { type: "string" },
        content: { type: "string", minLength: 1, maxLength: 255 },
        created_at: { type: "string" },
        updated_at: { type: "string" },
        created_by: { type: "integer" },
        updated_by: { type: "integer" },
        is_deleted: { type: "boolean" },
      },
    };
  }

  static get relationMappings() {
    const PersonsModel = require("./PersonsModel.js");
    const PostLikesModel = require("./PostLikesModel.js");
    const PostStatsModel = require("./PostStatsModel.js");

    return {
      post_stats: {
        relation: Model.HasOneRelation,
        modelClass: PostStatsModel,
        join: {
          from: "public.posts.id",
          to: "public.post_stats.post_id",
        },
      },
      post_likes: {
        relation: Model.HasManyRelation,
        modelClass: PostLikesModel,
        join: {
          from: "public.posts.id",
          to: "public.post_likes.post_id",
        },
      },
      creator: {
        relation: Model.BelongsToOneRelation,
        modelClass: PersonsModel,
        join: {
          from: "public.posts.created_by",
          to: "public.persons.id",
        },
      },
      updater: {
        relation: Model.BelongsToOneRelation,
        modelClass: PersonsModel,
        join: {
          from: "public.posts.updated_by",
          to: "public.persons.id",
        },
      },
    };
  }

  /**
   * @description fetches details of a post with the given uuid
   * @param {string} uuid
   */
  static async getPostDetails(uuid) {
    let postRecord = await PostsModel.query()
      .findOne({
        uuid,
      })
      .withGraphFetched("[post_likes.creator(defaultSelects), post_stats, creator(defaultSelects)]");
    delete postRecord.password;
    return postRecord;
  }
}

module.exports = PostsModel;
