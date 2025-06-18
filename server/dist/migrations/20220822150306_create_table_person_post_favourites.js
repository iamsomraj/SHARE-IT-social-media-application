"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
async function up(knex) {
    await Promise.all([
        knex.schema.createTable('stories', table => {
            table
                .increments('id')
                .primary()
                .comment('Unique identifier for each story');
            table
                .integer('post_id')
                .references('posts.id')
                .comment('Foreign key referencing the posts table');
            table
                .integer('person_id')
                .references('persons.id')
                .comment('Foreign key referencing the persons table');
            table
                .string('created_at')
                .comment('Timestamp indicating when the story was created');
        }),
    ]);
}
async function down(knex) {
    await Promise.all([knex.schema.dropTable('stories')]);
}
//# sourceMappingURL=20220822150306_create_table_person_post_favourites.js.map