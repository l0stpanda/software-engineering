import express, { Router } from "express";
//import { Prisma } from "database";
import PrismaClient from "../bin/database-connection.ts";
//import { edgeType } from "common/src/edgesType.ts";

const router: Router = express.Router();

// Put the POST PUT GET DELETE REQUESTS HERE
/*
formula: router.COMMAND(req, res)...
 */

// API endpoints: Read the edges table in the database and return data
router.get("/", async (req, res) => {
  try {
    // Use the Prisma client to query the 'edges' table in the database
    const edges = await PrismaClient.edges.findMany(); //
    res.status(200).json(edges);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the data." });
  }
});
export default router;
