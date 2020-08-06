import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('graphs', (table) => {
    table.uuid('graph_id').primary();
    table.string('description');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('graphs');
}
