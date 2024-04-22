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

router.post("/editNodeInfo", async function (req: Request, res: Response) {
  const input: {
    node_id: string;
    longName: string;
    floor: string;
    nodeType: string;
    shortName: string;
  } = req.body;
  try {
    await PrismaClient.nodes.update({
      where: {
        node_id: input.node_id,
      },
      data: {
        long_name: input.longName,
        floor: input.floor,
        node_type: input.nodeType,
        short_name: input.shortName,
      },
    });
  } catch (e) {
    res.sendStatus(400);
    return;
  }
  res.sendStatus(200);
});

router.post("/addEdge", async function (req: Request, res: Response) {
  const input: { id: string; start_node: string; end_node: string } = req.body;
  try {
    await PrismaClient.edges.create({
      data: {
        id: input.id,
        start_node: input.start_node,
        end_node: input.end_node,
      },
    });
  } catch (e) {
    res.sendStatus(400);
    return;
  }
  res.sendStatus(200);
});

export default router;
