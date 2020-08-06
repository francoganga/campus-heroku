import knex from 'knex';
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

let configOptions: knex.Config;
if (process.env.NODE_ENV === 'development') {
  configOptions = {
    client: 'pg',
    connection: {
      database: process.env.DBNAME,
      user: process.env.DBUSER,
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

export interface Graph {
  description: string;
  points: Point[];
}

export interface Point {
  point_label: string;
  point_value: number;
}

export async function getPoints2(graph_id: string) {
  return await knexClient('points')
    .where({
      graph_id,
    })
    .select('point_label', 'point_value', 'id');
}

export async function createGraph(description: string, points: Point[]) {
  try {
    const id: string[] = await knexClient('graphs')
      .returning('graph_id')
      .insert({
        description,
      });
    const values = arrayToMultipleInsert(points, id[0]);
    const pres = await knexClient('points').returning('*').insert(values);
  } catch (error) {
    console.error(error);
  }
}

export function arrayToMultipleInsert(values: Point[], graph_id: string) {
  return values.map((e) => ({
    graph_id,
    point_label: e.point_label,
    point_value: e.point_value,
  }));
}
