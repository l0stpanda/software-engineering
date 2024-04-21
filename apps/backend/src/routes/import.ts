import express, { Router, Request, Response } from "express";
import PrismaClient from "../bin/database-connection.ts";
import { edgeType } from "common/src/edgesType.ts";
import { nodeType } from "common/src/nodeType.ts";
import { checkRequiredPermissions } from "./auth0Perms.ts";

const router: Router = express.Router();

//EDGES STUFF

//POST edges from the frontend to the database
router.post(
  "/edgesPost",
  checkRequiredPermissions(["create:edges"]),
  async function (req: Request, res: Response) {
    const received: edgeType[] = req.body;
    try {
      await PrismaClient.edges.createMany({ data: received });
    } catch (e) {
      //Console log error if the data can't be stored
      console.log(e);
      res.sendStatus(400);
      return;
    }
    //Console log "Ok" if the database successfully collects the data
    res.sendStatus(200);
  },
);

//DELETE edges from the database
router.delete(
  "/edgesDelete",
  checkRequiredPermissions(["delete:edges"]),
  async function (req: Request, res: Response) {
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
  },
);

//GET edges from the database to the frontend as a JSON type
router.get("/edgesGet", async function (req: Request, res: Response) {
  try {
    res.send(await PrismaClient.edges.findMany());
    return;
  } catch (error) {
    //Console log error if the data can't be stored
    console.log(error);
    res.sendStatus(400);
    return;
  }
});

//NODES STUFF
router.post(
  "/nodesPost",
  checkRequiredPermissions(["create:nodes"]),
  async function (req: Request, res: Response) {
    const received: nodeType[] = req.body;
    try {
      await PrismaClient.nodes.createMany({ data: received });
    } catch (e) {
      //Console log error if the data can't be stored
      console.log(e);
      res.sendStatus(400);
      return;
    }
    //Console log "Ok" if the database successfully collects the data
    res.sendStatus(200);
  },
);

//DELETE nodes from the database
router.delete(
  "/nodesDelete",
  checkRequiredPermissions(["delete:nodes"]),
  async function (req: Request, res: Response) {
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
  },
);

//GET nodes from the database to the frontend as a JSON type
router.get("/nodesGet", async function (req: Request, res: Response) {
  try {
    res.send(await PrismaClient.nodes.findMany());
    return;
  } catch (error) {
    console.log(error);
    //Console log error if the data can't be stored
    res.sendStatus(400);
    return;
  }
});

//Will give the list of long names
router.get("/nodeLongNames", async function (req: Request, res: Response) {
  try {
    const response = await PrismaClient.nodes.findMany({
      orderBy: [
        {
          long_name: "asc",
        },
      ],
      where: {
        NOT: {
          node_type: "HALL",
        },
      },
      select: {
        long_name: true,
      },
    });

    res.send(response);
    //const stuff = JSON.stringify(response).replaceAll("long_name", "label");
    //console.log(stuff);
    //const json_data = eval(stuff);
    //console.log(json_data);
    //res.send(json_data);
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
    return;
  }
  //res.sendStatus(200);
});

export default router;
