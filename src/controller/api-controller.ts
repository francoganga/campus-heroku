import { Request, Response } from 'express';
import { Client } from 'pg';

// const client = new Client({
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false,
//   },
// });

export async function test(req: Request, res: Response) {
  res.status(200).json({
    success: true,
    msg: 'exito',
  });
}

export async function createData(req: Request, res: Response) {
  if (req.body.dates === undefined || req.body.values == undefined) {
    res.status(400).json({
      success: false,
      message: 'Bad request',
    });
  }

  const { dates, values } = req.body;

  res.status(200).json({
    success: true,
    msg: 'exito',
  });
}
