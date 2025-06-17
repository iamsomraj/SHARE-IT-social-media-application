import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
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

export async function down(knex: Knex): Promise<void> {
  await Promise.all([knex.schema.dropTable('persons')]);
}
