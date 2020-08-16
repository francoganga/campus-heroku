import { Request, Response } from 'express';
import { getPoints, createPoint } from '../db/queries';

// const client = new Client({
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false,
//   },
// });

export async function test(req: Request, res: Response) {
  const response = await createPoint({
    date: new Date().toISOString(),
    navigation: 56,
    login: 57,
    click_1: 123,
    click_2: 1231,
  });

  res.status(200).json({
    success: true,
    msg: 'exito',
  });
}

export async function getGraphData(req: Request, res: Response) {
  if (req.query.fromDate === undefined || req.query.toDate === undefined) {
    return res.status(400).json({
      success: false,
      message: 'Bad request',
    });
  }
  const { fromDate, toDate } = req.query;

  if (typeof fromDate !== 'string' || typeof toDate !== 'string') {
    throw new Error('values fromDate and toDate have to be a single string');
  }

  const points = await getPoints(fromDate, toDate);
  console.log(points);

  return res.status(200).json({
    success: true,
    data: points,
  });
}
