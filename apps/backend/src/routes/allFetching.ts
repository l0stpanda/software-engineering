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

    //Medicine and Medical Device Request Things

    if (status == "Closed") {
      const findType = await PrismaClient.generalService.findMany({
        where: {
          id: id,
        },
      });

      if (findType[0].type == "Medicine Request") {
        const findServiceStuff = await PrismaClient.medicineRequest.findMany({
          where: {
            id: id,
          },
        });
        const num = await PrismaClient.inventory.findMany({
          where: {
            name: findServiceStuff[0].medicine_name,
            type: "medicine",
          },
        });
        const newQuant = num[0].quant - findServiceStuff[0].quantity;
        if (newQuant >= 0) {
          await PrismaClient.inventory.update({
            where: {
              name: findServiceStuff[0].medicine_name,
            },
            data: {
              quant: newQuant,
            },
          });
        }
        if (newQuant < 0) {
          console.log("Asking for too much");
          res.sendStatus(700);
        }
      } else if (findType[0].type == "Medical Device Delivery") {
        const findServiceStuff = await PrismaClient.medicalDevice.findMany({
          where: {
            id: id,
          },
        });
        const num = await PrismaClient.inventory.findMany({
          where: {
            name: findServiceStuff[0].device,
            type: "medical device",
          },
        });
        const newQuant = num[0].quant - findServiceStuff[0].quantity;
        if (newQuant >= 0) {
          await PrismaClient.inventory.update({
            where: {
              name: findServiceStuff[0].device,
            },
            data: {
              quant: newQuant,
            },
          });
        }
        if (newQuant < 0) {
          console.log("Asking for too much");
          res.sendStatus(700);
        }
      }
    }
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
    return;
  }
  res.sendStatus(200);
});

export default router;
