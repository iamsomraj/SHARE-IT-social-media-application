const { Model } = require("objection");

class PersonStatsModel extends Model {
  static get tableName() {
    return "public.person_stats";
  }

  static get idColumn() {
    return "id";
  }

  static get personIdColumn() {
    return "person_id";
  }

  static get postCountColumn() {
    return "post_count";
  }

  static get followerCountColumn() {
    return "follower_count";
  }

  static get followingCountColumn() {
    return "following_count";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["person_id"],
      properties: {
        id: { type: "integer" },
        person_id: { type: "integer" },
        post_count: { type: "integer" },
        follower_count: { type: "integer" },
        following_count: { type: "integer" },
      },
    };
  }

  static get relationMappings() {
    const PersonsModel = require("./PersonsModel.js");
    return {
      post: {
        relation: Model.BelongsToOneRelation,
        modelClass: PersonsModel,
        join: {
          from: "public.person_stats.person_id",
          to: "public.persons.id",
        },
      },
    };
  }
}

module.exports = PersonStatsModel;
