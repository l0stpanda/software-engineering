import express, { Router, Request, Response } from "express";
//import { nodeType } from "common/src/nodeType.ts";
//import { Prisma } from "database";
import PrismaClient from "../bin/database-connection.ts";

const router: Router = express.Router();

//Registering the login details from the front end to the backend to be stored in the database
router.post("/make", async function (req: Request, res: Response) {
  type loginResponse = {
    username: string;
    password: string;
    role: string;
  };
  const received: loginResponse = req.body;
  try {
    await PrismaClient.staff.create({
      //storing the username/password/role into the database
      data: {
        user_name: received.username,
        password: received.password,
        role: received.role,
      },
    });
  } catch (e) {
    //Console log error if the data can't be stored
    console.log(e);
    res.sendStatus(400);
    return;
  }
  //Console log "Ok" if the database successfully collects the data
  res.sendStatus(200);
});

//Authenticating the user by checking if the login information is stored in the database
router.post("/check", async function (req: Request, res: Response) {
  type loginResponse = {
    username: string;
    password: string;
    role: string;
  };
  const received: loginResponse = req.body;
  try {
    const check = await PrismaClient.staff.findMany({
      where: {
        user_name: received.username,
        password: received.password,
        role: received.role,
      },
    });
    //Throw error if no element is found in the array
    if (check.length == 0) {
      res.send("No Go");
      res.sendStatus(400);
    } else if (check.length == 1) {
      //If one element is found in the array then information was found in the database. Will make it more secure later
      res.sendStatus(200);
      return "Yes Authorized";
    }
  } catch (e) {
    //Console log error if an error is found when running .findMany
    console.log(e);
    res.sendStatus(400);
    return;
  }
  //Repsond with an "OK" if everything works
  res.sendStatus(200);
});

//Deleting the login details from the database
router.delete("/delete", async function (req: Request, res: Response) {
  try {
    //Delete the details from the database
    await PrismaClient.staff.deleteMany();
  } catch (e) {
    //If there is an error deleting details from the database
    console.log(e);
    res.sendStatus(400);
    return;
  }
  //If the login details can be deleted, send back an "OK"
  res.sendStatus(200);
});

export default router;
