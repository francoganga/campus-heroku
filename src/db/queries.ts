import { Pool } from 'pg';

const pool = new Pool({
  user: 'franco',
  host: 'localhost',
  database: 'graphs',
  port: 5432,
});

export async function getPoints(graph_id: string) {
  try {
    const res = await pool.query(
      `SELECT point_label, point_value from points where graph_id='${graph_id}'`
    );
    const { rows } = res;

    if (rows.length > 0) {
      return rows;
    }
  } catch (error) {
    console.error(error);
  }
}

export interface Point {
  point_label: string;
  point_value: number;
}
export function createGraph(description: string, points: Point[]) {
  pool.query(
    `INSERT INTO graphs(description) VALUES(${description}) RETURNING graph_id`,
    (err, res) => {
      if (err) throw err;
      const { rows } = res;
      if (rows.length > 0) {
        const [{ graph_id }] = rows;

        const values = arrayToMultipleInsert(points, graph_id);

        pool.query(
          `
          INSERT INTO points(graph_id, point_label, point_value)
          VALUES ${values}
          `
        );
      } else {
        throw new Error('there was an error');
      }

      pool.query(`INSERT INTO points`);
    }
  );
}

function arrayToMultipleInsert(values: Point[], graph_id: string) {
  return values
    .map((e) => `('${graph_id}', ${e.point_label},'${e.point_value}')`)
    .join(',')
    .concat(';');
}
