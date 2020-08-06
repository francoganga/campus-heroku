import * as Knex from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('points').del();
  await knex('graphs').del();

  // Inserts seed entries
  const ids = await knex('graphs')
    .returning('graph_id')
    .insert([
      { description: 'first' },
      { description: 'second' },
      { description: 'third' },
    ]);
  const res = await knex('points')
    .returning('*')
    .insert([
      { graph_id: ids[0], point_label: '12:00', point_value: 45 },
      { graph_id: ids[0], point_label: '13:00', point_value: 450 },
      { graph_id: ids[0], point_label: '15:00', point_value: 47 },
      { graph_id: ids[1], point_label: '15:00', point_value: 47 },
    ]);
  console.log(res);
}
