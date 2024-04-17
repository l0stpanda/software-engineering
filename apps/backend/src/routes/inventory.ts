import express, { Router, Request, Response } from "express";
import PrismaClient from "../bin/database-connection.ts";
import { inventoryType } from "common/src/inventoryType.ts";
const router: Router = express.Router();

//Add an item to the inventory
router.post("/", async (req: Request, res: Response) => {
  const received: inventoryType = req.body;
  try {
    await PrismaClient.inventory.create({
      data: {
        name: received.name,
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
router.delete("/:id", async (req: Request, res: Response) => {
  const received: number = parseInt(req.params.id);
  try {
    await PrismaClient.inventory.delete({
      where: {
        id: received,
      },
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
    return;
  }
  res.sendStatus(200);
});

//Edit the quantity of the medicine inventory
router.post("/", async (req: Request, res: Response) => {
  const received: inventoryType = req.body;
  try {
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

export default router;
