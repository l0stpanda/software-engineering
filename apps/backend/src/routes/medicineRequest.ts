import express, { Router, Request, Response } from "express";
import PrismaClient from "../bin/database-connection.ts";
import { MedicineDelivery } from "../../../frontend/src/common/MedicineDelivery.ts";

const router: Router = express.Router();

router.post("/", async function (req: Request, res: Response) {
  const input: MedicineDelivery = req.body;

  try {
    //Subtraction set value
    const num = await PrismaClient.inventory.findMany({
      where: {
        name: input.medicineName,
        type: "Medicine",
      },
    });
    const newQuant = num[0].quant - parseInt(input.quantity);

    if (newQuant < 0) {
      console.log("Asking for too much");
      res.sendStatus(416);
    }

    const roomStuff = await PrismaClient.nodes.findMany({
      where: {
        long_name: input.location,
      },
    });

    const id1 = await PrismaClient.generalService.findMany({
      where: {
        type: "Medicine Request",
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
        type: "Medicine Request",
        location: roomStuff[0].node_id,
        status: input.status,
        long_name_loc: input.location,
        emp_name: input.employeeName,
        priority: input.priority,
      },
    });

    const findID = await PrismaClient.generalService.findMany({
      where: {
        type: "Medicine Request",
        location: roomStuff[0].node_id,
        status: input.status,
        emp_name: input.employeeName,
        priority: input.priority,
      },
    });

    await PrismaClient.medicineRequest.create({
      data: {
        id: findID[0].id,
        medicine_name: input.medicineName,
        quantity: parseInt(input.quantity),
        room_name: input.location,
      },
    });

    if (newQuant >= 0) {
      await PrismaClient.inventory.update({
        where: {
          name: input.medicineName,
        },
        data: {
          quant: newQuant,
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
      type: "Medicine Request",
    },
    include: {
      medicineReqID: true,
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
