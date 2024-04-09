import express, { Router, Request, Response } from "express";
import PrismaClient from "../bin/database-connection.ts";
import { edgeType } from "common/src/edgesType.ts";
import { nodeType } from "common/src/nodeType.ts";

const router: Router = express.Router();

//EDGES STUFF

//POST edges from the frontend to the database
router.post("/edgesPost", async function (req: Request, res: Response) {
  const received: edgeType = req.body;
  if (received.type == "Edges") {
    try {
      await PrismaClient.edges.create({
        data: {
          id: received.id,
          end_node: received.end_node,
          start_node: received.start_node,
        },
      });
    } catch (e) {
      //Console log error if the data can't be stored
      console.log(e);
      res.sendStatus(400);
      return;
    }
  }
  //Console log "Ok" if the database successfully collects the data
  res.sendStatus(200);
});

//DELETE edges from the database
router.delete("/edgesDelete", async function (req: Request, res: Response) {
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
router.get("/edgesGet", async function (req: Request, res: Response) {
  try {
    res.send(await PrismaClient.edges.findMany());
  } catch (error) {
    //Console log error if the data can't be stored
    console.log(error);
    res.sendStatus(400);
    return;
  }
  //Console log "Ok" if the database successfully collects the data
  res.sendStatus(200);
  return;
});

//NODES STUFF
router.post("/nodesPost", async function (req: Request, res: Response) {
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
router.delete("/nodesDelete", async function (req: Request, res: Response) {
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
router.get("/nodesGet", async function (req: Request, res: Response) {
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

//Will give the list of long names
router.get("/nodeLongNames", async function (req: Request, res: Response) {
  try {
    const response = await PrismaClient.nodes.findMany({
      where: {
        NOT: {
          node_type: "HALL",
        },
      },
      select: {
        long_name: true,
      },
    });

    const stuff = JSON.stringify(response).replaceAll("long_name", "label");
    console.log(stuff);
    const json_data = eval(stuff);
    console.log(json_data);
    res.send(json_data);
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
    return;
  }
  res.sendStatus(200);
});
export default router;
