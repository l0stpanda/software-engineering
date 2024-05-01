import { AccordionDetails, AccordionSummary, Typography } from "@mui/material";

import Accordion from "@mui/material/Accordion";

import { GeneralReq } from "../routes/serviceRequests.tsx";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

interface AccordionServiceRequestsProps {
  data: GeneralReq;
}

interface flowerRequestInfo {
  note: string;
  requestDate: string;
  room_name: string;
  sent_by: string;
  sent_to: string;
}

interface maintenanceRequestInfo {
  date: string;
  maintainType: string;
}
interface sanitationRequestInfo {
  severity: string;
  hazardous: string;
  room_name: string;
}
interface langInterpreterInfo {
  date: string;
  language: string;
  modeOfInterp: string;
  specInstruct: string;
}
interface roomScheduleInfo {
  startTime: string;
  lengthRes: string;
  room_name: string;
  endTime: string;
}
interface lostItemInfo {
  date: string;
  description: string;
  type: string;
}
interface medicalDeviceInfo {
  device: string;
  quantity: number;
  date: string;
  room_name: string;
}

interface medicineRequestInfo {
  medicine_name: string;
  quantity: number;
  room_name: string;
}

// Displays the accordion for one single request
function AccordionServiceRequests(props: AccordionServiceRequestsProps) {
  const [stuffFlower, setStuffFlower] = useState<flowerRequestInfo>({
    note: "",
    requestDate: "",
    room_name: "",
    sent_by: "",
    sent_to: "",
  });

  const [stuffMaintenance, setStuffMaintenance] =
    useState<maintenanceRequestInfo>({
      date: "",
      maintainType: "",
    });

  const [stuffSanitation, setStuffSanitation] = useState<sanitationRequestInfo>(
    {
      severity: "",
      hazardous: "",
      room_name: "",
    },
  );

  const [stuffRoomSchedule, setStuffRoomSchedule] = useState<roomScheduleInfo>({
    startTime: "",
    lengthRes: "",
    room_name: "",
    endTime: "",
  });

  const [stuffLost, setStuffLost] = useState<lostItemInfo>({
    date: "",
    description: "",
    type: "",
  });

  const [stuffMedicalDevice, setStuffMedicalDevice] =
    useState<medicalDeviceInfo>({
      device: "",
      quantity: 0,
      date: "",
      room_name: "",
    });

  const [stuffMedicine, setStuffMedicine] = useState<medicineRequestInfo>({
    medicine_name: "",
    quantity: 0,
    room_name: "",
  });

  const [stuffLanguage, setStuffLanguage] = useState<langInterpreterInfo>({
    date: "",
    language: "",
    modeOfInterp: "",
    specInstruct: "",
  });

  const { getAccessTokenSilently } = useAuth0();
  const data = props.data;
  let content: React.ReactElement;

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const token = await getAccessTokenSilently();
        const allData = await axios.get(`/api/fetchAll/specific/${data.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(allData.data);
        if (data.type == "Flower Request") {
          setStuffFlower(allData.data);
        } else if (data.type == "Lost and Found") {
          setStuffLost(allData.data);
        } else if (data.type == "Maintenance Request") {
          setStuffMaintenance(allData.data);
        } else if (data.type == "Medical Device Delivery") {
          setStuffMedicalDevice(allData.data);
        } else if (data.type == "Medicine Request") {
          setStuffMedicine(allData.data);
        } else if (data.type == "Room Scheduling") {
          setStuffRoomSchedule(allData.data);
        } else if (data.type == "Sanitation Request") {
          setStuffSanitation(allData.data);
        } else if (data.type == "Language Interpeter") {
          setStuffLanguage(allData.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchDetails().then().catch();
  }, [data.id, data.type, getAccessTokenSilently]);

  let result = [];

  switch (data.type) {
    case "Language Interpreter":
      content = (
        <Typography>
          Name: {data.emp_name}
          <br />
          Location: {data.long_name_loc}
          <br />
          Date: {stuffLanguage.date}
          <br />
          Priority: {data.priority}
          <br />
          Language Requested: {stuffLanguage.language}
          <br />
          Mode of Interpretation: {stuffLanguage.modeOfInterp}
          <br />
          Special Instructions: {stuffLanguage.specInstruct}
          <br />
          Status: {data.status}
        </Typography>
      );
      break;
    case "Lost and Found":
      content = (
        <Typography>
          Date: {stuffLost.date}
          Description: {stuffLost.description}
          Type: {stuffLost.type}
        </Typography>
      );
      break;
    case "Flower Request":
      content = (
        <Typography>
          Name: {data.emp_name}
          <br />
          Priority: {data.priority}
          <br />
          Room: {stuffFlower.room_name}
          <br />
          Sent By: {stuffFlower.sent_by}
          <br />
          Send To: {stuffFlower.sent_to}
          <br />
          Note for Patient: {stuffFlower.note}
          <br />
          Status: {data.status}
        </Typography>
      );
      break;
    case "Maintenance Request":
      content = (
        <Typography>
          Name: {data.emp_name}
          <br />
          Location: {data.long_name_loc}
          <br />
          Date: {stuffMaintenance.date}
          <br />
          Priority: {data.priority}
          <br />
          Type: {stuffMaintenance.maintainType}
          <br />
          Status: {data.status}
          <br />
        </Typography>
      );
      break;
    case "Medical Device":
      content = (
        <Typography>
          Employee Name: {data.emp_name}
          <br />
          Room Name: {stuffMedicalDevice.room_name}
          <br />
          Medical Device Name: {stuffMedicalDevice.device}
          <br />
          Quantity: {stuffMedicalDevice.quantity}
          <br />
          Priority: {data.priority}
          <br />
          Status: {data.status}
          <br />
          Date: {stuffMedicalDevice.date}
        </Typography>
      );
      break;
    case "Medicine":
      content = (
        <Typography>
          Employee Name: {data.emp_name}
          <br />
          Medicine Name: {stuffMedicine.medicine_name}
          <br />
          Quantity: {stuffMedicine.quantity}
          <br />
          Room Name: {stuffMedicine.room_name}
          <br />
          Priority: {data.priority}
          <br />
          Status: {data.status}
          <br />
        </Typography>
      );
      break;
    case "Room Scheduling":
      result = getBooking(stuffRoomSchedule);
      console.log(result[0]);
      content = (
        <Typography>
          Employee Name: {data.emp_name}
          <br />
          Date: {result[4]}
          <br />
          Time: {result[0]}:{result[1]} to {result[2]}:{result[3]}
          <br />
          Reservation Length: {stuffRoomSchedule.lengthRes}
          <br />
          Room Name: {stuffRoomSchedule.room_name}
          <br />
          Priority: {data.priority}
          <br />
          Status: {data.status}
          <br />
        </Typography>
      );
      break;
    case "Sanitation Request":
      content = (
        <Typography>
          Employee Name: {data.emp_name}
          <br />
          Room Name: {stuffSanitation.room_name}
          <br />
          Severity: {stuffSanitation.severity}
          <br />
          Hazardous?: {stuffSanitation.hazardous}
          <br />
          Priority: {data.priority}
          <br />
          Status: {data.status}
          <br />
        </Typography>
      );
      break;
    default:
      content = (
        <Typography>No specific service requests available.</Typography>
      );
      break;
  }

  return (
    <div>
      <Accordion disableGutters={true}>
        <AccordionSummary>
          <b>
            {" "}
            {data.type}: {data.id}{" "}
          </b>
          <div className="right-align">
            <KeyboardArrowDownIcon />
          </div>
        </AccordionSummary>
        <AccordionDetails>{content}</AccordionDetails>
      </Accordion>
    </div>
  );
}

// Gets a variety of info about bookings at a given node and checks if the booking is today
// Still needs a useEffect to visualize changes on screen
function getBooking(data: roomScheduleInfo) {
  const result = [];
  console.log("Booking data: ", data);
  const duration = parseInt(data.lengthRes);
  const [date, time] = data.startTime.split("T"); // Splits date and time
  // Gets the separate time values
  const [startHour, startMinute] = time
    .split(":")
    .map((value: string) => parseInt(value));
  const endHour = startHour + Math.floor(duration / 60);
  const endMinute = (startMinute + duration) % 60;
  // Gets the separate date values
  const [year, month, day] = date
    .split("-")
    .map((value: string) => parseInt(value));
  // Gets current date Object
  const current = new Date();
  console.log(endHour, endMinute);
  let startString = startMinute.toString();
  let endString = endMinute.toString();

  if (
    current.getUTCDate() == day &&
    current.getUTCMonth() == month - 1 &&
    current.getUTCFullYear() == year
  ) {
    startString = startMinute.toString();
    endString = endMinute.toString();
    if (startString.length == 1) startString = "0".concat(startString);
    if (endString.length == 1) endString = "0".concat(endString);
  }
  result.push(startHour);
  result.push(startString);
  result.push(endHour);
  result.push(endString);
  result.push(date);
  return result;
}

export default AccordionServiceRequests;
