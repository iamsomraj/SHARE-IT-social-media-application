const { Model } = require("objection");

class PostStatsModel extends Model {
  static get tableName() {
    return "public.post_stats";
  }

  static get idColumn() {
    return "id";
  }

  static get postIdColumn() {
    return "post_id";
  }

  static get likeCountColumn() {
    return "like_count";
  }

  static get commentCountColumn() {
    return "comment_count";
  }

  static get favouriteCountColumn() {
    return "favourite_count";
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
        favourite_count: { type: "integer" },
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
