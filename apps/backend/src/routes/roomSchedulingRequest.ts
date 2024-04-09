import express, { Router, Request, Response } from "express";
//import { Prisma } from "database";
import PrismaClient from "../bin/database-connection.ts";
import { roomSchedulerFields } from "common/src/roomScheduler.ts";

const router: Router = express.Router();
router.post("/", async function (req: Request, res: Response) {
  const input: roomSchedulerFields = req.body;
  try {
    await PrismaClient.roomScheduler.create({
      data: {
        employName: input.employName,
        startTime: input.startTime,
        lengthRes: input.lengthRes,
        roomNum: input.roomNum,
        priority: input.priority,
        reqStatus: input.reqStatus,
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
    res.send(await PrismaClient.roomScheduler.findMany());
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
    return;
  }
  res.sendStatus(200);
});

// router.delete("/:id", async function (req: Request, res: Response) {
//   console.log(req.params.id);
//   const id: number = parseInt(req.params.id);
//   console.log(id);
//   try {
//     console.log();
//     await PrismaClient.roomScheduler.delete({
//       where: {
//         id: id,
//       },
//     });
//   } catch (e) {
//     console.log(e);
//     res.sendStatus(400);
//     return;
//   }
//   res.sendStatus(200);
// });

export default router;
