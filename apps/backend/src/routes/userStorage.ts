import express, { Router, Request, Response } from "express";
//import { Prisma } from "database";
import PrismaClient from "../bin/database-connection.ts";
//import { toDo } from "common/src/toDo.ts";

const router: Router = express.Router();

type toDoNow = {
  id: number;
  task: string;
  priority: string;
  email: string | undefined;
  complete: boolean;
};

//Registering the login details from the front end to the backend to be stored in the database
router.post("/", async function (req: Request, res: Response) {
  const input: toDoNow = req.body;
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
            email: input.email,
          },
        });
      }
      //then no matter what create the todo element with the same email
      await PrismaClient.todo.create({
        data: {
          task: input.task,
          priority: input.priority,
          email: input.email,
          complete: input.complete,
        },
      });
    }
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
    return;
  }
  res.sendStatus(200);
});

router.get("/:email", async function (req: Request, res: Response) {
  const email_identifier = req.params.email;
  try {
    res.send(
      await PrismaClient.todo.findMany({
        where: {
          email: email_identifier,
        },
      }),
    );
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
    return;
  }
});

router.delete("/:id", async function (req: Request, res: Response) {
  const id = parseInt(req.params.id);
  try {
    await PrismaClient.todo.delete({
      where: {
        id: id,
      },
    });
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
  res.sendStatus(200);
});

router.post("/:id", async function (req: Request, res: Response) {
  const id = parseInt(req.params.id);
  const input: { bool: boolean } = req.body;
  console.log("BOOL BACKEND IS " + input.bool);
  try {
    await PrismaClient.todo.update({
      where: {
        id: id,
      },
      data: {
        complete: input.bool,
      },
    });
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
  res.sendStatus(200);
});

export default router;
