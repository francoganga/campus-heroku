import * as Knex from 'knex';
import { format, parse } from 'date-fns';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('points').del();

  const results = await knex('points')
    .insert([
      {
        date: parse('2-11-2014', 'dd-MM-yyyy', new Date()),
        navigation: 9,
        login: 9,
        click_1: 2,
        click_2: 3,
      },
      {
        date: parse('2-11-2014', 'dd-MM-yyyy', new Date()),
        navigation: 9,
        login: 9,
        click_1: 2,
        click_2: 3,
      },
      {
        date: parse('3-11-2014', 'dd-MM-yyyy', new Date()),
        navigation: 10,
        login: 9,
        click_1: 2,
        click_2: 3,
      },
      {
        date: parse('2-11-2014', 'dd-MM-yyyy', new Date()),
        navigation: 11,
        login: 9,
        click_1: 2,
        click_2: 3,
      },
      {
        date: parse('2-11-2014', 'dd-MM-yyyy', new Date()),
        navigation: 12,
        login: 9,
        click_1: 2,
        click_2: 3,
      },
      {
        date: parse('2-11-2015', 'dd-MM-yyyy', new Date()),
        navigation: 13,
        login: 9,
        click_1: 2,
        click_2: 3,
      },
      {
        date: parse('2-11-2015', 'dd-MM-yyyy', new Date()),
        navigation: 14,
        login: 9,
        click_1: 2,
        click_2: 3,
      },
      {
        date: parse('2-11-2015', 'dd-MM-yyyy', new Date()),
        navigation: 15,
        login: 9,
        click_1: 2,
        click_2: 3,
      },
    ])
    .returning('*');
  console.log(results);
}
