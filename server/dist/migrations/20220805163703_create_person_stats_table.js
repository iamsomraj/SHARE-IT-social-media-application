"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
async function up(knex) {
    await Promise.all([
        knex.schema.createTable('person_stats', table => {
            table
                .increments('id')
                .primary()
                .comment('Unique identifier for the person_stats record');
            table
                .integer('person_id')
                .references('persons.id')
                .comment('Foreign key referencing the persons table');
            table
                .integer('post_count')
                .defaultTo(0)
                .comment('Number of posts by the person');
            table
                .integer('follower_count')
                .defaultTo(0)
                .comment('Number of followers for the person');
            table
                .integer('following_count')
                .defaultTo(0)
                .comment('Number of people the person is following');
        }),
    ]);
}
async function down(knex) {
    await Promise.all([knex.schema.dropTable('person_stats')]);
}
//# sourceMappingURL=20220805163703_create_person_stats_table.js.map