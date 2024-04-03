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
//POST nodes from the frontend to the database
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
      //Console log error if the data can't be stored
      console.log(e);
      res.sendStatus(400);
    }
  }
  //Console log "Ok" if the database successfully collects the data
  res.sendStatus(200);
});

//DELETE nodes from the database
router.delete("/", async function (req: Request, res: Response) {
  try {
    await PrismaClient.nodes.deleteMany();
  } catch (error) {
    console.log(error);
    //Console log error if the data can't be stored
    res.sendStatus(400);
    return;
  }
  //Console log "Ok" if the database successfully collects the data
  res.sendStatus(200);
  return;
});

//GET nodes from the database to the frontend as a JSON type
router.get("/", async function (req: Request, res: Response) {
  try {
    res.send(await PrismaClient.nodes.findMany());
  } catch (error) {
    console.log(error);
    //Console log error if the data can't be stored
    res.sendStatus(400);
  }
  //Console log "Ok" if the database successfully collects the data
  res.sendStatus(200);
  return;
});
export default router;
