import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('points', (table) => {
    table.increments();
    table.uuid('graph_id').index().references('graph_id').inTable('graphs');
    table.string('point_label');
    table.integer('point_value');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('points');
}
