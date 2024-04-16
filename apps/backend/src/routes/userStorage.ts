import express, { Router, Request, Response } from "express";
//import { nodeType } from "common/src/nodeType.ts";
//import { Prisma } from "database";
//import PrismaClient from "../bin/database-connection.ts";

const router: Router = express.Router();

//Registering the login details from the front end to the backend to be stored in the database
router.post("/", async function (req: Request, res: Response) {
  res.sendStatus(200);
});

export default router;
