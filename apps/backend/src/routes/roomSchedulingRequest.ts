import express, { Router, Request, Response } from "express";
//import { Prisma } from "database"; helo sean :3
import PrismaClient from "../bin/database-connection.ts";
import { roomSchedulerFields } from "common/src/roomScheduler.ts";

const router: Router = express.Router();

router.post("/", async function (req: Request, res: Response) {
  const input: roomSchedulerFields = req.body;
  try {
    const roomStuff = await PrismaClient.nodes.findMany({
      where: {
        long_name: input.roomNum,
      },
    });

    // const id1 = await PrismaClient.generalService.findMany({
    //   where: {
    //     type: "Room Scheduling",
    //     location: roomStuff[0].node_id,
    //     status: input.reqStatus,
    //     emp_name: input.employName,
    //     priority: input.priority,
    //   },
    // });
    //
    // const subID = await PrismaClient.roomScheduler.findMany({
    //   where: {
    //     id: id1[0].id,
    //   },
    // });
    //
    // if (id1.length >= 1 && subID.length > 1) {
    //   console.log("SOMETHING BAD!!!!!!");
    //   res.sendStatus(400);
    //   return;
    // }

    const findIDInit = await PrismaClient.generalService.findMany({
      where: {
        type: "Room Scheduling",
        location: roomStuff[0].node_id,
        status: input.reqStatus,
        emp_name: input.employName,
        priority: input.priority,
      },
    });

    if (findIDInit.length >= 1) {
      console.log("DUPLICATES!!!");
      res.sendStatus(400);
      return;
    }

    //Check if there are timing conflicts
    const sentTime = input.startTime.toString();

    const allTimes = await PrismaClient.roomScheduler.findMany({});
    let false_true: boolean = true;
    for (let i = 0; i < allTimes.length; i++) {
      if (
        !checkTime(
          sentTime,
          allTimes[i].startTime,
          parseInt(input.lengthRes),
          parseInt(allTimes[i].lengthRes),
        )
      ) {
        false_true = false;
        break;
      }
    }

    if (!false_true) {
      console.log("BAD STUFF FIRST!!!!!");
      res.sendStatus(400);
      return;
    }

    await PrismaClient.generalService.create({
      data: {
        type: "Room Scheduling",
        location: roomStuff[0].node_id,
        status: input.reqStatus,
        long_name_loc: input.roomNum,
        emp_name: input.employName,
        priority: input.priority,
      },
    });

    //
    const findID = await PrismaClient.generalService.findMany({
      where: {
        type: "Room Scheduling",
        location: roomStuff[0].node_id,
        status: input.reqStatus,
        emp_name: input.employName,
        priority: input.priority,
      },
    });

    if (input.startTime != undefined) {
      await PrismaClient.roomScheduler.create({
        data: {
          id: findID[0]?.id,
          startTime: input.startTime?.toString(),
          lengthRes: input.lengthRes,
          // endTime: input.startTime?.toString(),
          room_name: input.roomNum,
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
          type: "Room Scheduling",
        },
        include: {
          roomSched: true,
        },
      }),
    );
  } catch (e) {
    console.log(e);
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

function parseTime(input: string) {
  const dateStuff = input.split("T");
  const timeStuff = dateStuff[1].split(":");

  const hours: number = parseInt(timeStuff[0]);
  const minutes: number = parseInt(timeStuff[1]);

  console.log("HOURS " + hours + " MINUTES " + minutes);
  return hours * 60 + minutes;
}

function checkTime(
  date_one: string, //this is what is sent by the request
  date_two: string, //This is what is in the backend
  duration_one: number, //This is what is sent by the request
  duration_two: number, //This is what is in the current DB
): boolean {
  const date_one_date = date_one.split("T");
  const date_two_date = date_two.split("T");
  const date_one_time = parseTime(date_one); //given by form
  const date_two_time = parseTime(date_two); //given by db

  console.log(date_one_date);
  console.log(date_two_date);
  console.log("GIVEN BY FORM DATES AND TIMES: " + date_one_time);
  console.log("GIVEN BY DB DATES AND TIMES: " + date_two_time);
  if (date_one_date[0] == date_two_date[0]) {
    console.log("DATES ARE EQUAL");
    if (
      date_one_time < date_two_time + duration_two &&
      date_one_time >= date_two_time
    ) {
      console.log("IN BETWEEN FIRST");
      return false;
    } else if (
      date_two_time < date_one_time + duration_one &&
      date_two_time > date_one_time
    ) {
      console.log("IN BETWEEN SECOND");
      return false;
    }
    //if (date_one_time <= date_two_time || date_one_time <= date_two_time + duration_two) {return false;}
  }
  return true;
}
export default router;
