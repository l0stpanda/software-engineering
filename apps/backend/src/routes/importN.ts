import express, { Request, Response, Router } from "express";
//import { Prisma } from "database";
import PrismaClient from "../bin/database-connection.ts";

import { nodeType } from "common/src/nodeType.ts";

const router: Router = express.Router();

// Put the POST PUT GET DELETE REQUESTS HERE
/*
formula: router.COMMAND(req, res)...
//THIS IS FOR THE NODES
 */
router.post("/", async function (req: Request, res: Response) {
  const received: nodeType = req.body;
  if (received.type == "Nodes") {
    try {
      await PrismaClient.nodes.create({
        data: {
          node_id: received.node_id,
          node_type: received.node_type,
          floor: received.floor,
          x_c: received.x_c,
          y_c: received.y_c,
          building: received.building,
          short_name: received.short_name,
          long_name: received.long_name,
        },
      });
    } catch (e) {
      console.log(e);
      res.sendStatus(400);
    }
  }
  res.sendStatus(200);
});

router.delete("/", async function (req: Request, res: Response) {
  try {
    await PrismaClient.nodes.deleteMany();
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
    return;
  }
  res.sendStatus(200);
  return;
});

router.get("/", async function (req: Request, res: Response) {
  try {
    res.send(await PrismaClient.nodes.findMany());
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
    return;
  }
});
export default router;
