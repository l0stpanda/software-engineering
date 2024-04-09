import express, { Router } from "express"; //add , Request, Response
//import { Prisma } from "database";
// import PrismaClient from "../bin/database-connection.ts";
// import { roomSchedulerFields } from "common/src/roomScheduler.ts";

const router: Router = express.Router();
// router.post("/", async function (req: Request, res: Response) {
//   const input: roomSchedulerFields = req.body;
//   try {
//     await PrismaClient.RoomScheduler.create({
//       data: {
//         employName: input.employName,
//         startTime: input.startTime,
//         lengthRes: input.lengthRes,
//         roomNum: input.roomNum,
//         priority: input.priority,
//         reqStatus: input.reqStatus,
//         status: "Pending",
//       },
//     });
//   } catch (e) {
//     console.log(e);
//     return res.sendStatus(400);
//   }
//   return res.sendStatus(200);
// });
//
// router.get("/", async function (req: Request, res: Response) {
//   try {
//     res.send(await PrismaClient.roomscheduler.findMany());
//   } catch (e) {
//     console.log(e);
//     res.sendStatus(400);
//     return;
//   }
//   res.sendStatus(200);
// });
//
// router.delete("/:id", async function (req: Request, res: Response) {
//   console.log(req.params.id);
//   const id: number = parseInt(req.params.id);
//   console.log(id);
//   try {
//     console.log();
//     await PrismaClient.RoomScheduler.delete({
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
