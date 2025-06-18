"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
async function up(knex) {
    await Promise.all([
        knex.schema.createTable('persons', table => {
            table
                .increments('id')
                .primary()
                .comment('Unique identifier for a person');
            table
                .string('uuid')
                .comment('Universally Unique Identifier for a person');
            table.string('name').comment('Name of the person');
            table.string('email').comment('Email address of the person');
            table.string('password').comment('Password of the person');
            table
                .string('created_at')
                .comment('Timestamp of when the record was created');
            table
                .string('updated_at')
                .comment('Timestamp of when the record was last updated');
            table
                .boolean('is_deleted')
                .notNullable()
                .defaultTo(false)
                .comment('Flag indicating whether the person is deleted');
        }),
    ]);
}
async function down(knex) {
    await Promise.all([knex.schema.dropTable('persons')]);
}
//# sourceMappingURL=20220317075541_create_persons.js.map