import express, { Router, Request, Response } from "express";
//import { Prisma } from "database";
import PrismaClient from "../bin/database-connection.ts";

const router: Router = express.Router();

type nowUser = {
  id: string;
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
            id: input.id,
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

router.get("/", async function (req: Request, res: Response) {
  try {
    res.send(
      await PrismaClient.user.findMany({
        select: {
          email: true,
          role: true,
          username: true,
        },
      }),
    );
    return;
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
    return;
  }
});

router.post("/uploadUsers", async function (req: Request, res: Response) {
  const received: nowUser[] = req.body;

  try {
    await PrismaClient.user.deleteMany({});
    await PrismaClient.user.createMany({ data: received });
  } catch (e) {
    //Console log error if the data can't be stored
    console.log(e);
    res.sendStatus(400);
    return;
  }
  //Console log "Ok" if the database successfully collects the data
  res.sendStatus(200);
});
export default router;
