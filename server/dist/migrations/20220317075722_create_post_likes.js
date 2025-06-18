"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
async function up(knex) {
    await Promise.all([
        knex.schema.createTable('post_likes', table => {
            table
                .increments('id')
                .primary()
                .comment('Unique identifier for the post like');
            table
                .integer('post_id')
                .references('posts.id')
                .comment('ID of the post that was liked');
            table.string('created_at').comment('Timestamp when the like was created');
            table
                .string('updated_at')
                .comment('Timestamp when the like was last updated');
            table
                .integer('created_by')
                .references('persons.id')
                .comment('ID of the person who created the like');
            table
                .integer('updated_by')
                .references('persons.id')
                .comment('ID of the person who last updated the like');
        }),
    ]);
}
async function down(knex) {
    await Promise.all([knex.schema.dropTable('post_likes')]);
}
//# sourceMappingURL=20220317075722_create_post_likes.js.map