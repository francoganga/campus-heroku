import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('graphs', (table) => {
      table
        .uuid('graph_id')
        .primary()
        .notNullable()
        .defaultTo(knex.raw('uuid_generate_v4()'));
      table.string('description');
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('graphs');
}
