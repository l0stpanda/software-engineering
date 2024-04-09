// import express, { Router, Request, Response } from "express";
// //import { Prisma } from "database";
// import PrismaClient from "../bin/database-connection.ts";
//
// const router: Router = express.Router();
// router.post("/", async function (req: Request, res: Response) {
//   type medicineReqFields = {
//     roomNum: string;
//     patientName: string;
//     medicineName: string;
//     medicineNum: string;
//     attachedNote: string;
//   };
//
//   const input: medicineReqFields = req.body;
//   try {
//     await PrismaClient.medicine.create({
//       data: {
//         room: input.roomNum,
//         patient: input.patientName,
//         medicine: input.medicineName,
//         numberOfMed: input.medicineNum,
//         note: input.attachedNote,
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
// //Used to give all of the information in the medicine table
// router.get("/", async function (req: Request, res: Response) {
//   try {
//     res.send(await PrismaClient.medicine.findMany());
//   } catch (e) {
//     console.log(e);
//     res.sendStatus(400);
//     return;
//   }
//   res.sendStatus(200);
// });
//
// export default router;
