const { Model } = require("objection");
const Person = require("./Person.js");
const { randomUUID } = require("crypto");

class Post extends Model {
  static get tableName() {
    return "posts";
  }

  $beforeInsert() {
    this.createdAt = new Date().toISOString();
    this.uuid = randomUUID();
  }

  $beforeUpdate() {
    this.updatedAt = new Date().toISOString();
  }

  static get contentColumn() {
    return "content";
  }

  static get ownerIdColumn() {
    return "owner_id";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["content", "owner_id"],
      properties: {
        id: { type: "integer" },
        uuid: { type: "string" },
        content: { type: "string", minLength: 1, maxLength: 255 },
        owner_id: { type: "integer" },
        createdAt: { type: "string" },
        updatedAt: { type: "string" },
        createdBy: { type: "integer" },
        updatedBy: { type: "integer" },
      },
    };
  }

  static get relationMappings() {
    const Person = require("./Person.js");
    return {
      owner: {
        relation: Model.BelongsToOneRelation,
        modelClass: Person,
        join: {
          from: "posts.owner_id",
          to: "persons.id",
        },
      },
      createdPerson: {
        relation: Model.BelongsToOneRelation,
        modelClass: Person,
        join: {
          from: "posts.createdBy",
          to: "persons.id",
        },
      },
      updatedPerson: {
        relation: Model.BelongsToOneRelation,
        modelClass: Person,
        join: {
          from: "posts.updatedBy",
          to: "persons.id",
        },
      },
    };
  }
}

module.exports = Post;
