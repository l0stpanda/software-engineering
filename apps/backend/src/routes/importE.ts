import express, { Router, Request, Response } from "express";
//import { Prisma } from "database";
import PrismaClient from "../bin/database-connection.ts";
import { edgeType } from "common/src/edgesType.ts";

const router: Router = express.Router();

// Put the POST PUT GET DELETE REQUESTS HERE
//THIS IS FOR THE EDGES
/*
formula: router.COMMAND(req, res)...
 */
router.post("/", async function (req: Request, res: Response) {
  const received: edgeType = req.body;
  if (received.type == "Edges") {
    try {
      await PrismaClient.edges.create({
        data: {
          end_node: received.end_node,
          start_node: received.start_node,
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
    await PrismaClient.edges.deleteMany();
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
  res.sendStatus(200);
});
export default router;
