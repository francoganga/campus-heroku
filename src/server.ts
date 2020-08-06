import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import api from './routes/api';
import {
  createGraph,
  Point,
  getPoints2,
  arrayToMultipleInsert,
} from './db/queries';

dotenv.config({ path: '.env' });

const app = express();

app.use(express.json());

const parr: Point[] = [
  {
    point_label: '12:32',
    point_value: 45,
  },
  {
    point_label: '12:32',
    point_value: 45,
  },
  {
    point_label: '12:32',
    point_value: 45,
  },
  {
    point_label: '12:32',
    point_value: 45,
  },
  {
    point_label: '12:32',
    point_value: 45,
  },
  {
    point_label: '12:32',
    point_value: 45,
  },
];

// const res = arrayToMultipleInsert(parr, 'asd');
// console.log(res);

createGraph('asddd', parr);

// const res = getPoints2('d393f9ce-91e1-4f44-88f2-4c9590027275').then((r) =>
//   console.log(r)
// );

const PORT = process.env.PORT || 8000;

app.use('/api', api);

app.listen(PORT, () => {
  console.log(`Server running in ${PORT} on ${process.env.NODE_ENV}`);
});
