import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('points', (table) => {
      table
        .uuid('id')
        .primary()
        .notNullable()
        .defaultTo(knex.raw('uuid_generate_v4()'));
      table.dateTime('date');
      table.integer('navigation');
      table.integer('login');
      table.integer('click_1');
      table.integer('click_2');
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('points');
}
