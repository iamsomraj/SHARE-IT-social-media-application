import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  // Add unique constraint to person_id column in person_stats table
  await knex.schema.alterTable('person_stats', table => {
    table.unique(['person_id'], 'person_stats_person_id_unique');
  });
}

export async function down(knex: Knex): Promise<void> {
  // Remove unique constraint from person_id column in person_stats table
  await knex.schema.alterTable('person_stats', table => {
    table.dropUnique(['person_id'], 'person_stats_person_id_unique');
  });
}
