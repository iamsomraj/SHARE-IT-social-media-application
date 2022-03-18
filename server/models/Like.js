const { Model } = require("objection");
const Person = require("./Person.js");
const Post = require("./Post.js");

class Like extends Model {
  static get tableName() {
    return "likes";
  }

  $beforeInsert() {
    this.createdAt = new Date();
  }

  $beforeUpdate() {
    this.updatedAt = new Date();
  }

  static get masterIdColumn() {
    return "master_id";
  }

  static get ownerIdColumn() {
    return "owner_id";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["master_id", "owner_id"],
      properties: {
        id: { type: "integer" },
        master_id: { type: "integer" },
        owner_id: { type: "integer" },
        createdAt: { type: "string" },
        updatedAt: { type: "string" },
      },
    };
  }

  static relationMappings = {
    owner: {
      relation: Model.BelongsToOneRelation,
      modelClass: Person,
      join: {
        from: "likes.owner_id",
        to: "persons.id",
      },
    },
    master: {
      relation: Model.BelongsToOneRelation,
      modelClass: Post,
      join: {
        from: "likes.master_id",
        to: "posts.id",
      },
    },
  };
}

module.exports = Like;
