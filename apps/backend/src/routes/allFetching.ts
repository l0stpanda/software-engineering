import express, { Router, Request, Response } from "express";
import PrismaClient from "../bin/database-connection.ts";
//import { flowerReqFields } from "common/src/flowerRequest.ts";

const router: Router = express.Router();

router.get("/", async function (req: Request, res: Response) {
  const data = await PrismaClient.generalService.findMany({});
  try {
    res.send(data);
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
    return;
  }
});

router.delete("/:id", async function (req: Request, res: Response) {
  const id: number = parseInt(req.params.id);
  try {
    const findGenData = await PrismaClient.generalService.findMany({
      where: {
        id: id,
      },
    });

    const findDevData = await PrismaClient.medicalDevice.findMany({
      where: {
        id: id,
      },
    });

    const findMedData = await PrismaClient.medicineRequest.findMany({
      where: {
        id: id,
      },
    });

    if (
      findGenData[0].type == "Medical Device Delivery" &&
      findGenData[0].status != "Closed"
    ) {
      await PrismaClient.inventory.findMany({
        where: {
          name: findDevData[0].device,
        },
      });
      const currentCount = await PrismaClient.inventory.findMany({
        where: {
          name: findDevData[0].device,
        },
      });

      const newCount = currentCount[0].quant + findDevData[0].quantity;
      await PrismaClient.inventory.update({
        where: {
          name: findDevData[0].device,
        },
        data: {
          quant: newCount,
        },
      });
    } else if (
      findGenData[0].type == "Medicine Request" &&
      findGenData[0].status != "Closed"
    ) {
      const currentCount = await PrismaClient.inventory.findMany({
        where: {
          name: findMedData[0].medicine_name,
        },
      });

      const newCount = currentCount[0].quant + findMedData[0].quantity;
      await PrismaClient.inventory.update({
        where: {
          name: findMedData[0].medicine_name,
        },
        data: {
          quant: newCount,
        },
      });
    }

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

router.get("/specific/:id", async function (req: Request, res: Response) {
  const id: number = parseInt(req.params.id);

  //All the tables are
  /*



     */

  //Look through every single table to find the id
  //If the length of any of the tables is 1 then that is the table with the request
  //Get the information and res.send(info) back

  try {
    const flowerRequestLength = await PrismaClient.flowers.findMany({
      where: {
        id: id,
      },
    });

    const maintenanceRequestLength =
      await PrismaClient.maintenanceRequest.findMany({
        where: {
          id: id,
        },
      });

    const medicalDeviceLength = await PrismaClient.medicalDevice.findMany({
      where: {
        id: id,
      },
    });

    const lostItemLength = await PrismaClient.lostItem.findMany({
      where: {
        id: id,
      },
    });

    const medicineRequestLength = await PrismaClient.medicineRequest.findMany({
      where: {
        id: id,
      },
    });

    const langInterpreterLength = await PrismaClient.langInterpreter.findMany({
      where: {
        id: id,
      },
    });

    const sanRequest = await PrismaClient.sanitationRequest.findMany({
      where: {
        id: id,
      },
    });

    const roomRequest = await PrismaClient.roomScheduler.findMany({
      where: {
        id: id,
      },
    });

    //if one or the other then send the request info with the length of 1
    if (flowerRequestLength.length == 1) {
      res.send(flowerRequestLength[0]);
    }

    if (maintenanceRequestLength.length == 1) {
      res.send(maintenanceRequestLength[0]);
    }

    if (medicalDeviceLength.length == 1) {
      res.send(medicalDeviceLength[0]);
    }

    if (langInterpreterLength.length == 1) {
      res.send(langInterpreterLength[0]);
    }

    if (sanRequest.length == 1) {
      res.send(sanRequest[0]);
    }

    if (lostItemLength.length == 1) {
      res.send(lostItemLength[0]);
    }

    if (roomRequest.length == 1) {
      res.send(roomRequest[0]);
    }

    if (medicineRequestLength.length == 1) {
      res.send(medicineRequestLength[0]);
    }
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
    return;
  }
  res.sendStatus(200);
});

router.get("/data", async function (req: Request, res: Response) {
  const total_count: number = await PrismaClient.generalService.count();
  const flower_count: number = await PrismaClient.flowers.count();
  const lost_count: number = await PrismaClient.lostItem.count();
  const maint_count: number = await PrismaClient.maintenanceRequest.count();
  const medDev_count: number = await PrismaClient.medicalDevice.count();
  const med_count: number = await PrismaClient.medicineRequest.count();
  const sanit_count: number = await PrismaClient.sanitationRequest.count();
  const room_sched: number = await PrismaClient.roomScheduler.count();

  const unassigned_count: number = await PrismaClient.generalService.count({
    where: {
      status: "Unassigned",
    },
  });

  const assigned_count: number = await PrismaClient.generalService.count({
    where: {
      status: "Assigned",
    },
  });

  const inProg_count: number = await PrismaClient.generalService.count({
    where: {
      status: "InProgress",
    },
  });

  const closed_count: number = await PrismaClient.generalService.count({
    where: {
      status: "Closed",
    },
  });

  type totals = {
    total_count: number;
    flower_count: number;
    lost_count: number;
    maint_count: number;
    medDev_count: number;
    med_count: number;
    sanit_count: number;
    room_sched: number;
    unassigned_count: number;
    assigned_count: number;
    inProg_count: number;
    closed_count: number;
  };

  const sendThis: totals = {
    total_count: total_count,
    flower_count: flower_count,
    lost_count: lost_count,
    maint_count: maint_count,
    medDev_count: medDev_count,
    med_count: med_count,
    sanit_count: sanit_count,
    room_sched: room_sched,
    unassigned_count: unassigned_count,
    assigned_count: assigned_count,
    inProg_count: inProg_count,
    closed_count: closed_count,
  };
  res.send(sendThis);
});

export default router;
