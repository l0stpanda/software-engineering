import { langInterpreterType } from "common/src/langInterpreterType.ts";
import express, { Router, Request, Response } from "express";
import PrismaClient from "../bin/database-connection.ts";

const router: Router = express.Router();

router.post("/", async function (req: Request, res: Response) {
  const input: langInterpreterType = req.body;

  try {
    const roomStuff = await PrismaClient.nodes.findMany({
      where: {
        long_name: input.location,
      },
    });

    const id1 = await PrismaClient.generalService.findMany({
      where: {
        type: "Language Interpreter",
        location: roomStuff[0].node_id,
        status: input.status,
        emp_name: input.name,
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
        type: "Language Interpreter",
        location: roomStuff[0].node_id,
        long_name_loc: input.location,
        emp_name: input.name,
        status: input.status,
        priority: input.priority,
      },
    });

    const findID = await PrismaClient.generalService.findMany({
      where: {
        type: "Language Interpreter",
        location: roomStuff[0].node_id,
        status: input.status,
        emp_name: input.name,
        priority: input.priority,
      },
    });

    const findEmail = await PrismaClient.user.findMany({
      where: {
        username: input.name,
      },
    });

    await PrismaClient.todo.create({
      data: {
        task: "Complete language interpreter request #" + findID[0].id,
        dueDate: "",
        priority: input.priority,
        notes: "",
        complete: false,
        email: findEmail[0].email,
      },
    });

    if (input.date != undefined) {
      await PrismaClient.langInterpreter.create({
        data: {
          id: findID[0].id,
          date: input.date.toString(),
          language: input.language,
          modeOfInterp: input.modeOfInterp,
          specInstruct: input.specInstruct,
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

router.get("/", async function (req: Request, res: Response) {
  const data = await PrismaClient.generalService.findMany({
    where: {
      type: "Language Interpreter",
    },
    include: {
      langInterpreterID: true,
    },
  });
  try {
    res.send(data);
  } catch (e) {
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
