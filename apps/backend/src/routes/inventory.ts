import express, { Router, Request, Response } from "express";
import PrismaClient from "../bin/database-connection.ts";
import { inventoryType } from "common/src/inventoryType.ts";
const router: Router = express.Router();

//Add an item to the inventory
router.post("/", async (req: Request, res: Response) => {
  try {
    const received: inventoryType = req.body;
    await PrismaClient.inventory.create({
      data: {
        name: received.name,
        type: received.type,
        quant: received.quant,
      },
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
    return;
  }
  res.sendStatus(200);
});

//Delete a medicine (Don't know if we'll need this)
router.post("/delete/:id", async (req: Request, res: Response) => {
  const inputs: { itemId: number; name: string } = req.body;
  try {
    const received: number = parseInt(req.params.id);
    await PrismaClient.inventory.delete({
      where: {
        id: received,
      },
    });

    const idCheckMedReq = await PrismaClient.medicineRequest.findMany({
      where: {
        medicine_name: inputs.name,
      },
    });

    const idCheckMedDev = await PrismaClient.medicalDevice.findMany({
      where: {
        device: inputs.name,
      },
    });

    //Delete the General Service Requests
    for (let i = 0; i < idCheckMedReq.length; i++) {
      await PrismaClient.generalService.deleteMany({
        where: {
          id: idCheckMedReq[i].id,
        },
      });
    }

    for (let i = 0; i < idCheckMedDev.length; i++) {
      await PrismaClient.generalService.deleteMany({
        where: {
          id: idCheckMedDev[i].id,
        },
      });
    }

    // //Delete all the instances of medicine Request that have the name
    // await PrismaClient.medicineRequest.deleteMany({
    //   where: {
    //     medicine_name: inputs.name,
    //   },
    // });
    // //Delete all the instances of medical device Request that have the name
    // await PrismaClient.medicalDevice.deleteMany({
    //   where: {
    //     device: inputs.name,
    //   },
    // });

    //Get the id
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
    return;
  }
  res.sendStatus(200);
});

//Edit the quantity of the medicine inventory
router.post("/update", async (req: Request, res: Response) => {
  try {
    const received: inventoryType = req.body;
    await PrismaClient.inventory.update({
      where: {
        name: received.name,
      },
      data: {
        quant: received.quant,
      },
    });
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
  res.sendStatus(200);
});

//Add number of quantity of medicine inventory
router.post("/add", async (req: Request, res: Response) => {
  try {
    const received: inventoryType = req.body;
    const item = await PrismaClient.inventory.findUnique({
      where: {
        name: received.name,
      },
    });
    if (item) {
      const newQuant = item.quant + received.quant;
      await PrismaClient.inventory.update({
        where: {
          name: received.name,
        },
        data: {
          quant: newQuant,
        },
      });
      res.sendStatus(200);
    } else {
      res.status(404).send("Item not found");
    }
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
});

//Reduce number of quantity of medicine inventory
router.post("/reduce", async (req: Request, res: Response) => {
  try {
    const received: inventoryType = req.body;
    const item = await PrismaClient.inventory.findUnique({
      where: {
        name: received.name,
      },
    });
    if (item) {
      const newQuant = item.quant - received.quant;
      if (newQuant >= 0) {
        await PrismaClient.inventory.update({
          where: {
            name: received.name,
          },
          data: {
            quant: newQuant,
          },
        });
        res.sendStatus(200);
      } else {
        res.status(400).send("Insufficient quantity to reduce");
      }
    } else {
      res.status(404).send("Item not found");
    }
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
});

router.get("/", async (req, res) => {
  try {
    // Use the Prisma client to query the 'edges' table in the database
    const inventory = await PrismaClient.inventory.findMany(); //
    res.status(200).send(inventory);
  } catch (error) {
    res.status(400).send("An error occurred while fetching the data.");
  }
});

//Return the number due to the medicine name entered
router.get("/getNum", async (req, res) => {
  try {
    const received: inventoryType = req.body;
    const item = await PrismaClient.inventory.findUnique({
      where: {
        name: received.name,
      },
    });
    if (item) {
      res.sendStatus(200).send(item.quant);
    } else {
      res.status(400).send(0);
    }
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
});

export default router;
