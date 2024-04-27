import express, { Router, Request, Response } from "express";
//import { Prisma } from "database";
import PrismaClient from "../bin/database-connection.ts";
//import { toDo } from "common/src/toDo.ts";

const router: Router = express.Router();

type subTodo = {
  id_relation: number;
  task: string;
  complete: boolean;
};

type toDoNow = {
  id: number;
  user_id: string;
  task: string;
  priority: string;
  email: string;
  username: string;
  role: string;
  complete: boolean;
  subtasks: subTodo[];
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
            id: input.user_id,
            email: input.email,
            username: input.username,
            role: input.role,
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

      const findID = await PrismaClient.todo.findMany({
        where: {
          task: input.task,
          priority: input.priority,
          email: input.email,
          complete: input.complete,
        },
      });

      for (let i = 0; i < input.subtasks.length; i++) {
        input.subtasks[i].id_relation = findID[0].id;
      }

      await PrismaClient.subTodo.createMany({
        data: input.subtasks,
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
        include: {
          subtasks: true,
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
  console.log("BODY " + req.body);
  if (req.body.id) {
    try {
      await PrismaClient.todo.update({
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
  } else {
    try {
      await PrismaClient.subTodo.create({ data: req.body });
    } catch (e) {
      console.log(e);
      res.sendStatus(400);
      return;
    }
    res.sendStatus(200);
  }
});
export default router;
