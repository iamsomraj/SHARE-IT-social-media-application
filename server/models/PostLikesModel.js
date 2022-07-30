const { Model } = require("objection");

class PostLikesModel extends Model {
  static get tableName() {
    return "public.post_likes";
  }

  $beforeInsert() {
    this.created_at = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updated_at = new Date().toISOString();
  }

  static get idColumn() {
    return "id";
  }

  static get postIdColumn() {
    return "post_id";
  }

  static get createdAtColumn() {
    return "created_at";
  }

  static get updatedAtColumn() {
    return "updated_at";
  }

  static get createdByColumn() {
    return "created_by";
  }

  static get updatedByColumn() {
    return "updated_by";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["post_id", "created_by"],
      properties: {
        id: { type: "integer" },
        post_id: { type: "integer" },
        created_by: { type: "integer" },
        created_at: { type: "string" },
        updated_at: { type: "string" },
        created_by: { type: "integer" },
        updated_by: { type: "integer" },
      },
    };
  }

  static get relationMappings() {
    const PostsModel = require("./PostsModel.js");
    const PersonsModel = require("./PersonsModel.js");
    return {
      post: {
        relation: Model.BelongsToOneRelation,
        modelClass: PostsModel,
        join: {
          from: "public.post_likes.post_id",
          to: "public.posts.id",
        },
      },
      creator: {
        relation: Model.BelongsToOneRelation,
        modelClass: PersonsModel,
        join: {
          from: "public.post_likes.created_by",
          to: "public.persons.id",
        },
      },
      updater: {
        relation: Model.BelongsToOneRelation,
        modelClass: PersonsModel,
        join: {
          from: "public.post_likes.updated_by",
          to: "public.persons.id",
        },
      },
    };
  }
}

module.exports = PostLikesModel;
