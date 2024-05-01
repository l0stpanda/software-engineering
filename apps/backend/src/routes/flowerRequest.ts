import express, { Router, Request, Response } from "express";
import PrismaClient from "../bin/database-connection.ts";
import { flowerReqFields } from "common/src/flowerRequest.ts";

const router: Router = express.Router();

router.post("/", async function (req: Request, res: Response) {
  const input: flowerReqFields = req.body;

  try {
    const roomStuff = await PrismaClient.nodes.findMany({
      where: {
        long_name: input.roomNum,
      },
    });

    const id1 = await PrismaClient.generalService.findMany({
      where: {
        type: "Flower Request",
        location: roomStuff[0].node_id,
        status: input.status,
        long_name_loc: input.roomNum,
        emp_name: input.empName,
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
        type: "Flower Request",
        location: roomStuff[0].node_id,
        status: input.status,
        long_name_loc: input.roomNum,
        emp_name: input.empName,
        priority: input.priority,
      },
    });

    const findID = await PrismaClient.generalService.findMany({
      where: {
        type: "Flower Request",
        location: roomStuff[0].node_id,
        status: input.status,
        emp_name: input.empName,
        priority: input.priority,
      },
    });

    const findEmail = await PrismaClient.user.findMany({
      where: {
        username: input.empName,
      },
    });

    if (input.status == "Closed") {
      await PrismaClient.todo.create({
        data: {
          task: "Complete flower delivery request #" + findID[0].id,
          dueDate: "",
          serv_req_id: findID[0].id,
          priority: input.priority,
          notes: "Deliver flowers to " + input.sendTo + " in " + input.roomNum,
          complete: true,
          email: findEmail[0].email,
        },
      });
    }
    if (input.status != "Closed") {
      await PrismaClient.todo.create({
        data: {
          task: "Complete flower delivery request #" + findID[0].id,
          dueDate: "",
          serv_req_id: findID[0].id,
          priority: input.priority,
          notes: "Deliver flowers to " + input.sendTo + " in " + input.roomNum,
          complete: false,
          email: findEmail[0].email,
        },
      });
    }

    await PrismaClient.flowers.create({
      data: {
        id: findID[0].id,
        sent_by: input.senderName,
        sent_to: input.sendTo,
        note: input.attachedNote,
        room_name: input.roomNum,
      },
    });
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
      type: "Flower Request",
    },
    include: {
      flowerID: true,
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

    await PrismaClient.todo.deleteMany({
      where: {
        serv_req_id: id,
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

    if (status == "Closed") {
      await PrismaClient.todo.updateMany({
        where: {
          serv_req_id: id,
        },
        data: {
          complete: true,
        },
      });
    } else {
      await PrismaClient.todo.updateMany({
        where: {
          serv_req_id: id,
        },
        data: {
          complete: false,
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
export default router;
