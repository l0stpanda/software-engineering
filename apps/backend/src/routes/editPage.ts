import express, { Router, Request, Response } from "express";
//import { Prisma } from "database";
import PrismaClient from "../bin/database-connection.ts";

const router: Router = express.Router();

router.post("/editNode", async function (req: Request, res: Response) {
  const input: { node_id: string; x: number; y: number } = req.body;
  try {
    await PrismaClient.nodes.update({
      where: {
        node_id: input.node_id,
      },
      data: {
        x_c: input.x.toString(),
        y_c: input.y.toString(),
      },
    });
  } catch (e) {
    res.sendStatus(400);
    return;
  }
  res.sendStatus(200);
});

export default router;
