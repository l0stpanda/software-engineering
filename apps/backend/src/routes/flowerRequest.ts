import express, { Router, Request, Response } from "express";
//import { Prisma } from "database";
import PrismaClient from "../bin/database-connection.ts";
import { flowerReqFields } from "common/src/flowerRequest.ts";

const router: Router = express.Router();
router.post("/", async function (req: Request, res: Response) {
  const input: flowerReqFields = req.body;
  try {
    const roomStuff = await PrismaClient.nodes.findMany({
      where: {
        long_name: input.roomNum,
      },
    });

    console.log(roomStuff);
    //The roomStuff[0] is assuming that we are only ever going to reference unique long names
    await PrismaClient.flowers.create({
      data: {
        room: roomStuff[0].node_id,
        name: input.roomNum,
        sent_by: input.senderName,
        sent_to: input.sendTo,
        note: input.attachedNote,
        status: "unassigned",
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
    return;
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
    return;
  }
});

router.delete("/:id", async function (req: Request, res: Response) {
  console.log(req.params.id);
  const id: number = parseInt(req.params.id);
  console.log(id);
  try {
    console.log();
    await PrismaClient.flowers.delete({
      where: {
        id: id,
      },
    });
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
    return;
  }
  res.sendStatus(200);
});

//update the status
router.put("/", async function (req: Request, res: Response) {
  const id = parseInt(req.params.id);
  const status = req.params.status;

  console.log("id is: " + id + "\n" + "status is : " + status);
  try {
    await PrismaClient.flowers.update({
      where: {
        id: id,
      },
      data: {
        status: status,
      },
    });
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
    return;
  }
  res.sendStatus(200);
});

export default router;
