import express, { Router, Request, Response } from "express";
//import { Prisma } from "database";
import PrismaClient from "../bin/database-connection.ts";
//import { toDo } from "common/src/toDo.ts";

const router: Router = express.Router();

type nowUser = {
  user_id: string;
  email: string;
  username: string;
  role: string;
};

router.post("/", async function (req: Request, res: Response) {
  const input: nowUser = req.body;
  try {
    //Check if the user already exists
    if (input.email != undefined) {
      const users_email = await PrismaClient.user.findMany({
        where: {
          email: input.email,
        },
      });

      //if not create the user
      if (users_email.length == 0) {
        await PrismaClient.user.create({
          data: {
            id: input.user_id,
            email: input.email,
            username: input.username,
            role: input.role,
          },
        });
      }
    }
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
    return;
  }
  res.sendStatus(200);
});

export default router;
