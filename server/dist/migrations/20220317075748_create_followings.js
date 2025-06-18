"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
async function up(knex) {
    await Promise.all([
        knex.schema.createTable('followings', table => {
            table
                .increments('id')
                .primary()
                .comment('Unique identifier for followings');
            table
                .integer('follower_id')
                .references('persons.id')
                .comment('ID of the follower');
            table
                .integer('followed_id')
                .references('persons.id')
                .comment('ID of the followed person');
            table
                .string('created_at')
                .comment('Timestamp when the following was created');
            table
                .string('updated_at')
                .comment('Timestamp when the following was last updated');
            table
                .integer('created_by')
                .references('persons.id')
                .comment('ID of the creator');
            table
                .integer('updated_by')
                .references('persons.id')
                .comment('ID of the last updater');
        }),
    ]);
}
async function down(knex) {
    await Promise.all([knex.schema.dropTable('followings')]);
}
//# sourceMappingURL=20220317075748_create_followings.js.map