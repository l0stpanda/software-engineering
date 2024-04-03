import express, { Router, Request, Response } from "express";
//import { nodeType } from "common/src/nodeType.ts";
//import { Prisma } from "database";
import PrismaClient from "../bin/database-connection.ts";

const router: Router = express.Router();

router.post("/make", async function (req: Request, res: Response) {
  type loginResponse = {
    username: string;
    password: string;
    role: string;
  };
  const received: loginResponse = req.body;
  try {
    await PrismaClient.staff.create({
      data: {
        user_name: received.username,
        password: received.password,
        role: received.role,
      },
    });
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
    return;
  }
  res.sendStatus(200);
});

router.post("/check", async function (req: Request, res: Response) {
  type loginResponse = {
    username: string;
    password: string;
    role: string;
  };
  const received: loginResponse = req.body;
  try {
    const check = await PrismaClient.staff.findMany({
      where: {
        user_name: received.username,
        password: received.password,
        role: received.role,
      },
    });
    if (check.length == 0) {
      res.send("No Go");
      res.sendStatus(400);
    } else if (check.length == 1) {
      res.send("Yes Authorized");
      res.sendStatus(200);
    }
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
    return;
  }
  res.sendStatus(200);
});

router.delete("/delete", async function (req: Request, res: Response) {
  try {
    await PrismaClient.staff.deleteMany();
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
    return;
  }
  res.sendStatus(200);
});

export default router;
