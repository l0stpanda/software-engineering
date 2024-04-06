import express, { Router, Request, Response } from "express";
//import { Prisma } from "database";
import PrismaClient from "../bin/database-connection.ts";
import { flowerReqFields } from "common/src/flowerRequest.ts";

const router: Router = express.Router();
router.post("/", async function (req: Request, res: Response) {
  const input: flowerReqFields = req.body;
  try {
    await PrismaClient.flowers.create({
      data: {
        room: input.roomNum,
        sent_by: input.senderName,
        sent_to: input.sendTo,
        note: input.attachedNote,
        status: "Pending",
      },
    });
  } catch (e) {
    console.log(e);
    return res.sendStatus(400);
  }
  return res.sendStatus(200);
});

//Used to give all of the information in the flowers table
router.get("/", async function (req: Request, res: Response) {
  try {
    res.send(await PrismaClient.flowers.findMany());
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
    return;
  }
  res.sendStatus(200);
});

export default router;
