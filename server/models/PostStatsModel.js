const { Model } = require("objection");

class PostStatsModel extends Model {
  static get tableName() {
    return "public.post_stats";
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

  static get postIdColumn() {
    return "post_id";
  }

  static get createdAtColumn() {
    return "like_count";
  }

  static get updatedAtColumn() {
    return "comment_count";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["post_id"],
      properties: {
        id: { type: "integer" },
        post_id: { type: "integer" },
        comment_count: { type: "integer" },
        like_count: { type: "integer" },
      },
    };
  }

  static get relationMappings() {
    const PostsModel = require("./PostsModel.js");
    return {
      post: {
        relation: Model.BelongsToOneRelation,
        modelClass: PostsModel,
        join: {
          from: "public.post_stats.post_id",
          to: "public.posts.id",
        },
      },
    };
  }
}

module.exports = PostStatsModel;
