import express, { Router, Request, Response } from "express";
import prisma from "../bin/database-connection.ts";
import { securityRequest as SecurityRequestType } from "common/src/securityRequestType.ts";

const router: Router = express.Router();

router.post("/", async function (req: Request, res: Response) {
  const input: SecurityRequestType = req.body;

  try {
    const roomStuff = await prisma.nodes.findMany({
      where: {
        long_name: input.location,
      },
    });

    const id1 = await prisma.generalService.findMany({
      where: {
        type: "Security Request",
        location: roomStuff[0].node_id,
        status: input.status,
        emp_name: input.emp_name,
        priority: input.priority,
      },
    });

    if (id1.length >= 1) {
      console.log("Duplicate security request found!");
      res.sendStatus(400);
      return;
    }

    await prisma.generalService.create({
      data: {
        type: "Security Request",
        location: roomStuff[0].node_id,
        status: input.status,
        long_name_loc: input.location,
        emp_name: input.emp_name,
        priority: input.priority,
      },
    });

    const findID = await prisma.generalService.findMany({
      where: {
        type: "Security Request",
        location: roomStuff[0].node_id,
        status: input.status,
        emp_name: input.emp_name,
        priority: input.priority,
      },
    });

    await prisma.securityRequest.create({
      data: {
        id: findID[0].id,
        incidentDescription: input.incidentDescription,
        incidentTime: input.incidentTime?.toString(),
        actionTaken: input.actionTaken,
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
  const data = await prisma.generalService.findMany({
    where: {
      type: "Security Request",
    },
    include: {
      securityRequest: true,
    },
  });
  try {
    res.send(data);
  } catch (e) {
    res.sendStatus(400);
    return;
  }
});

router.delete("/:id", async function (req: Request, res: Response) {
  const id: number = parseInt(req.params.id);
  try {
    await prisma.generalService.delete({
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
    await prisma.generalService.update({
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
