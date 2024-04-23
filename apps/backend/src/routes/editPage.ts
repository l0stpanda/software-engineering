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

router.post("/addNode", async function (req: Request, res: Response) {
  console.log(req.body);

  const input: {
    node_id: string;
    longName: string;
    floor: string;
    nodeType: string;
    shortName: string;
    x_c: string;
    y_c: string;
    building: string;
  } = req.body;
  try {
    await PrismaClient.nodes.create({
      data: {
        node_id: input.node_id,
        long_name: input.longName,
        floor: input.floor,
        node_type: input.nodeType,
        short_name: input.shortName,
        x_c: input.x_c,
        y_c: input.y_c,
        building: input.building,
      },
    });
  } catch (e) {
    console.log(req.body);
    res.sendStatus(400);
    return;
  }
  res.sendStatus(200);
});

router.post("/deleteNode", async function (req: Request, res: Response) {
  console.log(req.body);

  const input: {
    node_id: string;
    longName: string;
    floor: string;
    nodeType: string;
    shortName: string;
    x_c: string;
    y_c: string;
    building: string;
  } = req.body;
  try {
    await PrismaClient.nodes.deleteMany({
      where: {
        node_id: input.node_id,
      },
    });

    await PrismaClient.edges.deleteMany({
      where: {
        OR: [
          {
            start_node: input.node_id,
          },
          {
            end_node: input.node_id,
          },
        ],
      },
    });
  } catch (e) {
    console.log(req.body);
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
//Delete edge based on selected nodes
router.post("/deleteEdge", async function (req: Request, res: Response) {
  const input: { id: string; id2: string } = req.body;
  try {
    console.log(input);
    await PrismaClient.edges.deleteMany({
      where: {
        OR: [
          {
            id: input.id,
          },
          {
            id: input.id2,
          },
        ],
      },
    });
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
    return;
  }
  res.sendStatus(200);
});
export default router;
