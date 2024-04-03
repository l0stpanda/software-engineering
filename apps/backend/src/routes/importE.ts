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
//POST edges from the frontend to the database
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
      //Console log error if the data can't be stored
      console.log(e);
      res.sendStatus(400);
    }
  }
  //Console log "Ok" if the database successfully collects the data
  res.sendStatus(200);
});

//DELETE edges from the database
router.delete("/", async function (req: Request, res: Response) {
  try {
    await PrismaClient.edges.deleteMany();
  } catch (error) {
    //Console log error if the data can't be stored
    console.log(error);
    res.sendStatus(400);
    return;
  }
  //Console log "Ok" if the database successfully collects the data
  res.sendStatus(200);
});

//GET edges from the database to the frontend as a JSON type
router.get("/", async function (req: Request, res: Response) {
  try {
    res.send(await PrismaClient.edges.findMany());
  } catch (error) {
    //Console log error if the data can't be stored
    console.log(error);
    res.sendStatus(400);
  }
  //Console log "Ok" if the database successfully collects the data
  res.sendStatus(200);
  return;
});
export default router;
