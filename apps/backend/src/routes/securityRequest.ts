import express, { Router, Request, Response } from "express";
import PrismaClient from "../bin/database-connection.ts";
import { securityRequest } from "common/src/securityRequestType.ts";

const router: Router = express.Router();

router.post("/", async function (req: Request, res: Response) {
  const securityRequestInput: securityRequest = req.body;

  try {
    const roomStuff = await PrismaClient.nodes.findMany({
      where: {
        long_name: securityRequestInput.location,
      },
    });

    const existingRequest = await PrismaClient.generalService.findMany({
      where: {
        type: "Security Request",
        location: roomStuff[0].node_id,
        status: securityRequestInput.status,
        emp_name: securityRequestInput.name,
        priority: securityRequestInput.priority,
      },
    });

    if (existingRequest.length >= 1) {
      console.log("SOMETHING BAD!!!!!!");
      res.sendStatus(400);
      return;
    }

    await PrismaClient.generalService.create({
      data: {
        type: "Security Request",
        location: roomStuff[0].node_id,
        status: securityRequestInput.status,
        long_name_loc: securityRequestInput.location,
        emp_name: securityRequestInput.name,
        priority: securityRequestInput.priority,
      },
    });

    const findID = await PrismaClient.generalService.findMany({
      where: {
        type: "Security Request",
        location: roomStuff[0].node_id,
        status: securityRequestInput.status,
        emp_name: securityRequestInput.name,
        priority: securityRequestInput.priority,
      },
    });

    if (securityRequestInput.date != undefined) {
      await PrismaClient.lostItem.create({
        data: {
          id: findID[0].id,
          date: securityRequestInput.date.toString(),
          description: securityRequestInput.objectDesc,
          type: securityRequestInput.type,
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
      type: "Security Request",
    },
    include: {
      lost_location: true,
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
