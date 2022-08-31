const { Model } = require('objection');

class PersonPostFavouritesModel extends Model {
  static get tableName() {
    return 'public.stories';
  }

  $beforeInsert() {
    this.created_at = new Date().toISOString();
  }

  $beforeUpdate() {
    this.created_at = new Date().toISOString();
  }

  static get idColumn() {
    return 'id';
  }

  static get postIdColumn() {
    return 'post_id';
  }

  static get personIdColumn() {
    return 'person_id';
  }

  static get createdAtColumn() {
    return 'created_at';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['post_id', 'person_id'],
      properties: {
        id: { type: 'integer' },
        post_id: { type: 'integer' },
        person_id: { type: 'integer' },
        created_at: { type: 'string' },
      },
    };
  }

  static get modifiers() {
    return {
      orderByLatest(builder) {
        builder.orderBy([{ column: 'created_at', order: 'desc', nulls: 'last' }]);
      },
    };
  }

  static get relationMappings() {
    const PostsModel = require('./PostsModel.js');
    const PersonsModel = require('./PersonsModel.js');
    return {
      post: {
        relation: Model.BelongsToOneRelation,
        modelClass: PostsModel,
        join: {
          from: 'public.post_stories.post_id',
          to: 'public.posts.id',
        },
      },
      creator: {
        relation: Model.BelongsToOneRelation,
        modelClass: PersonsModel,
        join: {
          from: 'public.post_stories.person_id',
          to: 'public.persons.id',
        },
      },
    };
  }
}

module.exports = PersonPostFavouritesModel;
