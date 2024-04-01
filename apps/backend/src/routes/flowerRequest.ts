import express, { Router, Request, Response } from "express";
//import { Prisma } from "database";
import PrismaClient from "../bin/database-connection.ts";
import { flowerRequestType } from "common/src/flowerRequest.ts";

const router: Router = express.Router();
router.post("/", async function (req: Request, res: Response) {
  const input: flowerRequestType = req.body;
  try {
    PrismaClient.flowers.create({
      data: {
        room: input.room,
        sent_by: input.sent_by,
        deliverer: input.deliv,
        note: input.note,
        status: "Pending",
      },
    });
  } catch (e) {
    console.log(e);
    res.status(400);
  }
  console.log(200);
});
export default router;
