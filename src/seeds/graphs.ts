import * as Knex from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('points').del();
  // await knex('graphs').del();

  // Inserts seed entries
  // const ids = await knex('graphs')
  //   .returning('graph_id')
  //   .insert([{ description: 'campus first day log' }]);

  // await knex('test').insert([{ date: new Date().toISOString() }]);
}
