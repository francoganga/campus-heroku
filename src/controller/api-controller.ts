import { Request, Response } from 'express';
import { getPoints, createPoint, Point } from '../db/queries';
import { format, parse } from 'date-fns';

// const client = new Client({
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false,
//   },
// });

export async function test(_: Request, res: Response) {}

export async function getGraphData(req: Request, res: Response) {
  if (req.query.fromDate === undefined || req.query.toDate === undefined) {
    return res.status(400).json({
      success: false,
      message: 'Bad request',
    });
  }
  const { fromDate, toDate } = req.query;

  if (typeof fromDate !== 'string' || typeof toDate !== 'string') {
    throw new Error('date values must be of format: dd-MM-yyyy');
  }

  const points = await getPoints(fromDate, toDate);
  console.log(points);

  const formatted = points.map((p) => {
    const fdate = format(p.date, 'dd-MM-yyyy - hh:mm:ss');
    return {
      id: p.id,
      date: fdate,
      navigation: p.navigation,
    };
  });

  return res.status(200).json({
    success: true,
    data: formatted,
  });
}
