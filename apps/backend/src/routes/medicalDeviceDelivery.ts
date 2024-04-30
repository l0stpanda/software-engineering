import express, { Router, Request, Response } from "express";
import PrismaClient from "../bin/database-connection.ts";
const router: Router = express.Router();
import { medicalDeviceDelivery } from "common/src/medicalDeviceDelivery.ts";
//Creates record in the general db and the specific db for medical device service requests
router.post("/", async function (req: Request, res: Response) {
  const input: medicalDeviceDelivery = req.body;
  try {
    //Subtraction set value
    const num = await PrismaClient.inventory.findMany({
      where: {
        name: input.medicalDeviceName,
        type: "Medical Device",
      },
    });
    console.log(input);
    console.log(num);
    const newQuant = num[0].quant - input.quantity;

    if (newQuant < 0) {
      console.log("Asking for too much");
      res.sendStatus(416);
      return;
    }

    const roomStuff = await PrismaClient.nodes.findMany({
      where: {
        long_name: input.roomName,
      },
    });

    const id1 = await PrismaClient.generalService.findMany({
      where: {
        type: "Medical Device Delivery",
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
        type: "Medical Device Delivery",
        location: roomStuff[0].node_id,
        status: input.status,
        long_name_loc: input.roomName,
        emp_name: input.employeeName,
        priority: input.priority,
      },
    });

    const id = await PrismaClient.generalService.findMany({
      where: {
        type: "Medical Device Delivery",
        location: roomStuff[0].node_id,
        status: input.status,
        emp_name: input.employeeName,
        priority: input.priority,
      },
    });

    if (id.length > 1) {
      res.sendStatus(400);
      return;
    }

    if (input.deliveryDate != undefined) {
      //This willa always be the case so don't worry about it being here.
      console.log("ID I AM FINDING IS " + id[0].id);
      await PrismaClient.medicalDevice.create({
        data: {
          id: id[0].id,
          device: input.medicalDeviceName,
          quantity: Number(input.quantity),
          date: input.deliveryDate?.toString(),
          room_name: input.roomName,
        },
      });
    }

    if (newQuant >= 0) {
      await PrismaClient.inventory.update({
        where: {
          name: input.medicalDeviceName,
        },
        data: {
          quant: newQuant,
        },
      });
    }
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
          type: "Medical Device Delivery",
        },
        include: {
          medicalDeviceCheck: true,
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
