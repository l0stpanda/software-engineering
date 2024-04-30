import { AccordionDetails, AccordionSummary, Typography } from "@mui/material";

import Accordion from "@mui/material/Accordion";

import { GeneralReq } from "../routes/serviceRequests.tsx";
// import {RoomSchedulingReq} from "../routes/roomSchedulingRequest.tsx";

interface AccordionServiceRequestsProps {
  data: GeneralReq;
}

// Displays the accordion for one single request
function AccordionServiceRequests(props: AccordionServiceRequestsProps) {
  const data = props.data;

  const content = null;

  const specificContent = null;

  switch (data.type) {
    case "Lost and Found":
      break;
    case "Flower Request":
      break;
    case "Maintenance Request":
      break;
    case "Medical Device":
      break;
    case "Medicine":
      break;
    case "Room Scheduling":
      // specificContent =
      break;
    case "Sanitation Request":
      break;

      return specificContent;
  }

  return (
    <div>
      <Accordion>
        <AccordionSummary>
          <b>
            {" "}
            {data.type}: {data.id}{" "}
          </b>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <strong>ID:</strong> {data.id}
            <br />
            <strong>Type:</strong> {data.type}
            <br />
            <strong>By:</strong> {data.emp_name}
            <br />
            <strong>Status:</strong> {data.status}
            <br />
            <strong>Room:</strong> {data.location}
            <br />
            <strong>Priority:</strong> {data.priority} <hr />
          </Typography>
          {content}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

// Gets a variety of info about bookings at a given node and checks if the booking is today
// Still needs a useEffect to visualize changes on screen
// function getBooking(longName: string, data: RoomSchedulingReq) {
//         const duration = parseInt(data.lengthRes);
//         const [date, time] = data.startTime.split("T"); // Splits date and time
//         // Gets the separate time values
//         const [startHour, startMinute] = time
//             .split(":")
//             .map((value: string) => parseInt(value));
//         const endHour = startHour + Math.floor(duration / 60);
//         const endMinute = (startMinute + duration) % 60;
//         // Gets the separate date values
//         const [year, month, day] = date
//             .split("-")
//             .map((value: string) => parseInt(value));
//         // Gets current date Object
//         const current = new Date();
//         console.log(endHour, endMinute);
//         let startString = startMinute.toString();
//         let endString = endMinute.toString();
//
//         if (
//             current.getUTCDate() == day &&
//             current.getUTCMonth() == month - 1 &&
//             current.getUTCFullYear() == year
//         ) {
//             startString = startMinute.toString();
//             endString = endMinute.toString();
//             if (startString.length == 1) startString = "0".concat(startString);
//             if (endString.length == 1) endString = "0".concat(endString);
//         }
//     return [startHour, startString, endHour, endString];
// }

export default AccordionServiceRequests;
