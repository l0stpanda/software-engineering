import express, { Router } from "express";
//import { Prisma } from "database";
import PrismaClient from "../bin/database-connection.ts";
//import { checkRequiredPermissions } from "./auth0Perms.ts";

const router: Router = express.Router();

// Put the POST PUT GET DELETE REQUESTS HERE
/*
formula: router.COMMAND(req, res)...
 */

// API endpoints: Read the edges table in the database and return data
router.get(
  "/edges",
  // checkRequiredPermissions(["read:csv-data"]),
  async (req, res) => {
    try {
      // Use the Prisma client to query the 'edges' table in the database
      const edges = await PrismaClient.edges.findMany(); //
      res.status(200).send(edges);
    } catch (error) {
      res
        .status(400)
        .json({ error: "An error occurred while fetching the data." });
    }
  },
);

router.get(
  "/nodes",
  // checkRequiredPermissions(["read:csv-data"]),
  async (req, res) => {
    try {
      // Use the Prisma client to query the 'edges' table in the database
      const nodes = await PrismaClient.nodes.findMany(); //
      res.status(200).send(nodes);
    } catch (error) {
      res
        .status(400)
        .json({ error: "An error occurred while fetching the data." });
      return;
    }
  },
);
export default router;
