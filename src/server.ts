import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import api from './routes/api';
import { createGraph, Point, getPoints } from './db/queries';

dotenv.config({ path: '.env' });

const app = express();

app.use(express.json());

// const pool = new Pool({
//   user: process.env.DBUSER,
//   host: process.env.DBHOST,
//   database: process.env.DBNAME,
//   port: Number(process.env.DBPORT),
// });
//

// pool.query(
//   "INSERT INTO graphs(description) VALUES('this is another graph2') RETURNING graph_id",
//   (err, res) => {
//     if (err) throw err;
//     if (res.rows.length > 0) {
//       const [{ graph_id }] = res.rows;
//       console.log(graph_id);
//     }
//     console.log(JSON.stringify(res.rows));
//   }
// );

// const parr: Point[] = [
//   {
//     point_label: '12:32',
//     point_value: 45,
//   },
//   {
//     point_label: '12:32',
//     point_value: 45,
//   },
//   {
//     point_label: '12:32',
//     point_value: 45,
//   },
//   {
//     point_label: '12:32',
//     point_value: 45,
//   },
//   {
//     point_label: '12:32',
//     point_value: 45,
//   },
//   {
//     point_label: '12:32',
//     point_value: 45,
//   },
// ];

// createGraph('asddd', parr);

const res = getPoints('b204ad66-9f24-417a-a6a2-ebb1a85c5348').then((r) =>
  console.log(r)
);

const PORT = process.env.PORT || 8000;

app.use('/api', api);

app.listen(PORT, () => {
  console.log(`Server running in ${PORT} on ${process.env.NODE_ENV}`);
});
