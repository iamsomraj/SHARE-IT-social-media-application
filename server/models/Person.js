const { Model } = require("objection");

const { randomUUID } = require("crypto");

class Person extends Model {
  static get tableName() {
    return "persons";
  }

  $beforeInsert() {
    this.createdAt = new Date();
    this.uuid = randomUUID();
  }

  $beforeUpdate() {
    this.updatedAt = new Date();
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

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "email", "password"],
      properties: {
        id: { type: "integer" },
        uuid: { type: "string" },
        name: { type: "string", minLength: 1, maxLength: 255 },
        email: { type: "string" },
        password: { type: "string" },
        createdAt: { type: "string" },
        updatedAt: { type: "string" },
      },
    };
  }

  static get relationMappings() {
    const Following = require("./Following.js");
    const Post = require("./Post.js");
    const Like = require("./Like.js");
    return {
      followings: {
        relation: Model.HasManyRelation,
        modelClass: Following,
        join: {
          from: "persons.id",
          to: "followings.followed_id",
        },
      },
      followers: {
        relation: Model.HasManyRelation,
        modelClass: Following,
        join: {
          from: "persons.id",
          to: "followings.follower_id",
        },
      },
      posts: {
        relation: Model.HasManyRelation,
        modelClass: Post,
        join: {
          from: "persons.id",
          to: "posts.owner_id",
        },
      },
      likes: {
        relation: Model.HasManyRelation,
        modelClass: Like,
        join: {
          from: "persons.id",
          to: "likes.owner_id",
        },
      },
    };
  }
}

module.exports = Person;
