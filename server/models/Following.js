const { Model } = require("objection");
const Person = require("./Person.js");

class Following extends Model {
  static get tableName() {
    return "followings";
  }

  $beforeInsert() {
    this.createdAt = new Date();
  }

  $beforeUpdate() {
    this.updatedAt = new Date();
  }

  static get followerIdColumn() {
    return "follower_id";
  }

  static get followedIdColumn() {
    return "followed_id";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["follower_id", "followed_id"],
      properties: {
        id: { type: "integer" },
        follower_id: { type: "integer" },
        followed_id: { type: "integer" },
        createdAt: { type: "string" },
        updatedAt: { type: "string" },
      },
    };
  }

  static relationMappings = {
    followed_from: {
      relation: Model.BelongsToOneRelation,
      modelClass: Person,
      join: {
        from: "followings.followed_id",
        to: "persons.id",
      },
    },
    followed_to: {
      relation: Model.BelongsToOneRelation,
      modelClass: Person,
      join: {
        from: "followings.follower_id",
        to: "persons.id",
      },
    },
  };
}

module.exports = Following;
