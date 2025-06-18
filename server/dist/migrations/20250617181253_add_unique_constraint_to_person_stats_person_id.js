"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
async function up(knex) {
    await knex.schema.alterTable('person_stats', table => {
        table.unique(['person_id'], 'person_stats_person_id_unique');
    });
}
async function down(knex) {
    await knex.schema.alterTable('person_stats', table => {
        table.dropUnique(['person_id'], 'person_stats_person_id_unique');
    });
}
//# sourceMappingURL=20250617181253_add_unique_constraint_to_person_stats_person_id.js.map