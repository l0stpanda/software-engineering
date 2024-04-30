import express, { Router, Request, Response } from "express";
import PrismaClient from "../bin/database-connection.ts";
const router: Router = express.Router();
import { sanitationRequest } from "common/src/sanitationRequest.ts";

router.post("/", async function (req: Request, res: Response) {
  const input: sanitationRequest = req.body;
  try {
    const roomStuff = await PrismaClient.nodes.findMany({
      where: {
        long_name: input.roomName,
      },
    });

    const id1 = await PrismaClient.generalService.findMany({
      where: {
        type: "Sanitation Request",
        location: roomStuff[0].node_id,
        status: input.status,
        emp_name: input.employeeName,
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
        type: "Sanitation Request",
        location: roomStuff[0].node_id,
        status: input.status,
        long_name_loc: input.roomName,
        emp_name: input.employeeName,
        priority: input.priority,
      },
    });

    const id = await PrismaClient.generalService.findMany({
      where: {
        type: "Sanitation Request",
        location: roomStuff[0].node_id,
        status: input.status,
        emp_name: input.employeeName,
        priority: input.priority,
      },
    });

    const findEmail = await PrismaClient.user.findMany({
      where: {
        username: input.employeeName,
      },
    });

    await PrismaClient.todo.create({
      data: {
        task: "Complete sanitation request #" + id[0].id,
        dueDate: "",
        priority: input.priority,
        notes: "",
        complete: false,
        email: findEmail[0].email,
      },
    });

    await PrismaClient.sanitationRequest.create({
      data: {
        id: id[0].id,
        severity: input.severity,
        hazardous: input.hazardous,
        room_name: input.roomName,
      },
    });
  } catch (e) {
    //Console log error if the data can't be stored
    console.log(e);
    res.sendStatus(400);
    return;
  }
  //Console log "Ok" if the database successfully collects the data
  res.sendStatus(200);
});

router.get("/", async function (req: Request, res: Response) {
  try {
    res.send(
      await PrismaClient.generalService.findMany({
        where: {
          type: "Sanitation Request",
        },
        include: {
          sanitationID: true,
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
    console.log(id);
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
