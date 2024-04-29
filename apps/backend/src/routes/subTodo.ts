import express, { Router, Request, Response } from "express";
//import { Prisma } from "database";
import PrismaClient from "../bin/database-connection.ts";
//import { toDo } from "common/src/toDo.ts";

const router: Router = express.Router();

router.post("/:id", async function (req: Request, res: Response) {
  const id = parseInt(req.params.id);
  try {
    await PrismaClient.subTodo.update({
      where: {
        id: id,
      },
      data: req.body,
    });
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
    return;
  }
  res.sendStatus(200);
  return;
});
export default router;
