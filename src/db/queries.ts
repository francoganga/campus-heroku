import knex from 'knex';
import dotenv from 'dotenv';
import { cs } from 'date-fns/locale';

dotenv.config({ path: '.env' });

let configOptions: knex.Config;
if (process.env.NODE_ENV === 'development') {
  configOptions = {
    client: 'pg',
    connection: {
      database: process.env.DBNAME,
      user: process.env.DBUSER,
      password: process.env.DBPASS,
      host: process.env.DBHOST,
      port: Number(process.env.DBPORT),
    },
    migrations: {
      directory: 'src/migrations',
    },
    seeds: { directory: 'src/seeds' },
  };
} else {
  configOptions = {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: 'src/migrations',
    },
    seeds: { directory: 'src/seeds' },
  };
}

const knexClient = knex(configOptions);

export interface Point {
  id: string;
  date: string;
  navigation: number;
  login: number;
  click_1: number;
  click_2: number;
}

export async function getPoints(from: string, to: string) {
  try {
    const results = await knexClient('points')
      .select()
      .whereBetween('date', [from, to]);
    return results;
  } catch (e) {
    console.error(e.message);
  }
}

export async function createPoint(point: Point) {
  await knexClient('points').insert(point);
}
