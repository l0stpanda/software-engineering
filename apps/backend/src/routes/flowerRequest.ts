import express, { Router, Request, Response } from "express";
//import { Prisma } from "database";
import PrismaClient from "../bin/database-connection.ts";

const router: Router = express.Router();
router.post("/", async function (req: Request, res: Response) {
  type flowerReqFields = {
    roomNum: string;
    senderName: string;
    sendTo: string;
    attachedNote: string;
  };

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
export default router;
