import express, { Router, Request, Response } from "express";
//import { Prisma } from "database";
import PrismaClient from "../bin/database-connection.ts";
import { roomSchedulerFields } from "common/src/roomScheduler.ts";

const router: Router = express.Router();
router.post("/", async function (req: Request, res: Response) {
  const input: roomSchedulerFields = req.body;
  try {
    const roomStuff = await PrismaClient.nodes.findMany({
      where: {
        long_name: input.roomNum,
      },
    });

    const id1 = await PrismaClient.generalService.findMany({
      where: {
        type: "Room Scheduling",
        location: roomStuff[0].node_id,
        status: input.reqStatus,
        emp_name: input.employName,
        priority: input.priority,
      },
    });

    if (id1.length >= 1) {
      console.log("SOMETHING BAD!!!!!!");
      res.sendStatus(400);
      return;
    }

    await PrismaClient.generalService.create({
      data: {
        type: "Room Scheduling",
        location: roomStuff[0].node_id,
        status: input.reqStatus,
        emp_name: input.employName,
        priority: input.priority,
      },
    });

    const findID = await PrismaClient.generalService.findMany({
      where: {
        type: "Room Scheduling",
        location: roomStuff[0].node_id,
        status: input.reqStatus,
        emp_name: input.employName,
        priority: input.priority,
      },
    });

    await PrismaClient.roomScheduler.create({
      data: {
        id: findID[0].id,
        startTime: input.startTime,
        lengthRes: input.lengthRes,
        room_name: input.roomNum,
      },
    });
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
    return;
  }
  return res.sendStatus(200);
});

router.get("/", async function (req: Request, res: Response) {
  try {
    res.send(
      await PrismaClient.generalService.findMany({
        where: {
          type: "Room Scheduling",
        },
        include: {
          roomSched: true,
        },
      }),
    );
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
    return;
  }
  res.sendStatus(200);
});

router.delete("/:id", async function (req: Request, res: Response) {
  const id: number = parseInt(req.params.id);
  try {
    await PrismaClient.generalService.delete({
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

router.post("/update", async function (req: Request, res: Response) {
  const id = req.body.id;
  const status = req.body.status;

  try {
    await PrismaClient.generalService.update({
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
