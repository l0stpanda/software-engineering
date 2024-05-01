import express, { Router, Request, Response } from "express";
import PrismaClient from "../bin/database-connection.ts";
const router: Router = express.Router();
import { maintenanceReqType } from "common/src/maintenanceReqType.ts";

router.post("/", async function (req: Request, res: Response) {
  const input: maintenanceReqType = req.body;
  try {
    const roomStuff = await PrismaClient.nodes.findMany({
      where: {
        long_name: input.location,
      },
    });

    const id1 = await PrismaClient.generalService.findMany({
      where: {
        type: "Maintenance Request",
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
        type: "Maintenance Request",
        location: roomStuff[0].node_id,
        status: input.status,
        long_name_loc: input.location,
        emp_name: input.name,
        priority: input.priority,
      },
    });

    const id = await PrismaClient.generalService.findMany({
      where: {
        type: "Maintenance Request",
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
    if (input.status == "Closed") {
      await PrismaClient.todo.create({
        data: {
          task: "Complete maintenance request #" + id[0].id,
          dueDate: "",
          serv_req_id: id[0].id,
          priority: input.priority,
          notes: input.maintainType + " needed at " + input.location,
          complete: true,
          email: findEmail[0].email,
        },
      });
    }
    if (input.status != "Closed") {
      await PrismaClient.todo.create({
        data: {
          task: "Complete maintenance request #" + id[0].id,
          dueDate: "",
          serv_req_id: id[0].id,
          priority: input.priority,
          notes: input.maintainType + " needed at " + input.location,
          complete: false,
          email: findEmail[0].email,
        },
      });
    }

    console.log(input);
    if (input.date != undefined) {
      await PrismaClient.maintenanceRequest.create({
        data: {
          id: id[0].id,
          date: input.date.toString(),
          maintainType: input.maintainType,
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
  try {
    res.send(
      await PrismaClient.generalService.findMany({
        where: {
          type: "Maintenance Request",
        },
        include: {
          maintainID: true,
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
    console.log(id);
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
