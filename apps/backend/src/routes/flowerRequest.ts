import express, { Router, Request, Response } from "express";
//import { Prisma } from "database";
import PrismaClient from "../bin/database-connection.ts";
const router: Router = express.Router();

type flowerReqFields = {
  roomNum: string;
  senderName: string;
  deliv: string;
  attachedNote: string;
};

router.post("/", async function (req: Request, res: Response) {
  const input: flowerReqFields = {
    roomNum: req.body.roomNum,
    senderName: req.body.senderName,
    deliv: req.body.deliv,
    attachedNote: req.body.attachedNote,
  };

  try {
    await PrismaClient.flowers.create({
      data: {
        room: input.roomNum,
        sent_by: input.senderName,
        deliverer: input.deliv,
        note: input.attachedNote,
        status: "Pending",
      },
    });
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
  res.sendStatus(200);
});

export default router;
