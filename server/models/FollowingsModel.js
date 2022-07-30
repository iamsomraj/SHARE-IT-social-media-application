const { Model } = require("objection");

class FollowingsModel extends Model {
  static get tableName() {
    return "public.followings";
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

  static get followerIdColumn() {
    return "follower_id";
  }

  static get followedIdColumn() {
    return "followed_id";
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
      required: ["follower_id", "followed_id"],
      properties: {
        id: { type: "integer" },
        follower_id: { type: "integer" },
        followed_id: { type: "integer" },
        created_at: { type: "string" },
        updated_at: { type: "string" },
        created_by: { type: "integer" },
        updated_by: { type: "integer" },
      },
    };
  }

  static get relationMappings() {
    const PersonsModel = require("./PersonsModel.js");
    return {
      followed_from: {
        relation: Model.BelongsToOneRelation,
        modelClass: PersonsModel,
        join: {
          from: "public.followings.followed_id",
          to: "public.persons.id",
        },
      },
      followed_to: {
        relation: Model.BelongsToOneRelation,
        modelClass: PersonsModel,
        join: {
          from: "public.followings.follower_id",
          to: "public.persons.id",
        },
      },
      creator: {
        relation: Model.BelongsToOneRelation,
        modelClass: PersonsModel,
        join: {
          from: "public.followings.created_by",
          to: "public.persons.id",
        },
      },
      updater: {
        relation: Model.BelongsToOneRelation,
        modelClass: PersonsModel,
        join: {
          from: "public.followings.updated_by",
          to: "public.persons.id",
        },
      },
    };
  }
}

module.exports = FollowingsModel;
