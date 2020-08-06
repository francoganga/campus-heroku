import { Request, Response } from 'express';
import { createGraph, Graph } from '../db/queries';

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

export async function createGraphRequest(req: Request, res: Response) {
  if (req.body.graph === undefined) {
    res.status(400).json({
      success: false,
      message: 'Bad request',
    });
  }

  const { graph }: { graph: Graph } = req.body;

  createGraph(graph.description, graph.points);

  res.status(200).json({
    success: true,
    msg: 'exito',
  });
}
