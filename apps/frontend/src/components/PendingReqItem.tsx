import React, { useState } from "react";
import {
  Select,
  MenuItem,
  SelectChangeEvent,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { DeleteOutline } from "@mui/icons-material";

type GeneralReq = {
  id: number;
  type: string;
  location: string;
  long_name_loc: string;
  status: string;
  emp_name: string;
  priority: string;
};

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

interface securityRequestInfo {
  date: string;
  description: string;
  type: string;
}

function PendingFlowerReq(props: GeneralReq) {
  const { getAccessTokenSilently } = useAuth0();
  const [openFlower, setOpenFlower] = useState(false);
  const [openMaint, setOpenMaint] = useState(false);
  const [openSan, setOpenSan] = useState(false);
  const [openLang, setOpenLang] = useState(false);
  const [openRoom, setOpenRoom] = useState(false);
  const [openDevice, setOpenDevice] = useState(false);
  const [openMedicine, setOpenMedicine] = useState(false);
  const [openLost, setOpenLost] = useState(false);
  const [openSec, setOpenSec] = useState(false);

  const [stuff, setStuff] = useState<flowerRequestInfo>({
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
  console.log(stuffSanitation);

  const [stuffLanguage, setStuffLanguage] = useState<langInterpreterInfo>({
    date: "",
    language: "",
    modeOfInterp: "",
    specInstruct: "",
  });
  console.log(stuffLanguage);

  const [stuffRoomSchedule, setStuffRoomSchedule] = useState<roomScheduleInfo>({
    startTime: "",
    lengthRes: "",
    room_name: "",
  });
  console.log(stuffRoomSchedule);

  const [stuffLost, setStuffLost] = useState<lostItemInfo>({
    date: "",
    description: "",
    type: "",
  });
  console.log(stuffLost);

  const [stuffMedicalDevice, setStuffMedicalDevice] =
    useState<medicalDeviceInfo>({
      device: "",
      quantity: 0,
      date: "",
      room_name: "",
    });
  console.log(stuffMedicalDevice);

  const [stuffMedicine, setStuffMedicine] = useState<medicineRequestInfo>({
    medicine_name: "",
    quantity: 0,
    room_name: "",
  });
  console.log(stuffMedicine);

  const [stuffSecurity, setStuffSecurity] = useState<securityRequestInfo>({
    date: "",
    description: "",
    type: "",
  });
  console.log(stuffMedicine);

  const [status, setStatus] = useState<string>(props.status);
  const [confirm, setConfirm] = useState<boolean>(false);

  const handleStatusDropdown = async (e: SelectChangeEvent) => {
    const token = await getAccessTokenSilently();
    setStatus(e.target.value);
    await axios.post(
      "/api/fetchAll/update",
      {
        id: props.id,
        status: e.target.value,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  };

  const deleteData = async (idVal: number) => {
    setConfirm(false);
    try {
      const token = await getAccessTokenSilently();
      await axios.delete(`api/fetchAll/${idVal}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (e) {
      console.log(e);
      return;
    }
    alert("Successfully deleted flower request with ID number " + idVal);
    window.location.reload();
  };

  const handleExpandClick = async () => {
    try {
      const token = await getAccessTokenSilently();
      const allData = await axios.get(`/api/fetchAll/specific/${props.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (props.type == "Flower Request") {
        setStuff(allData.data);
        setOpenFlower(true);
      } else if (props.type == "Language Interpreter") {
        setStuffLanguage(allData.data);
        setOpenLang(true);
      } else if (props.type == "Lost and Found") {
        setStuffLost(allData.data);
        setOpenLost(true);
      } else if (props.type == "Maintenance Request") {
        setStuffMaintenance(allData.data);
        setOpenMaint(true);
      } else if (props.type == "Medical Device Delivery") {
        setStuffMedicalDevice(allData.data);
        setOpenDevice(true);
      } else if (props.type == "Medicine Request") {
        setStuffMedicine(allData.data);
        setOpenMedicine(true);
      } else if (props.type == "Room Scheduling") {
        setStuffRoomSchedule(allData.data);
        setOpenRoom(true);
      } else if (props.type == "Sanitation Request") {
        setStuffSanitation(allData.data);
        setOpenSan(true);
      } else if (props.type == "Security Request") {
        setStuffSecurity(allData.data);
        setOpenSec(true);
      }
      console.log("After axios: ", allData.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <tr className="bg-background border-b-2 border-secondary" key={props.id}>
      <td className="p-3 text-sm">{props.type}</td>
      <td className="p-3 text-sm">
        <Select
          name="status"
          required={true}
          label="Status"
          onChange={handleStatusDropdown}
          value={status}
          defaultValue={props.status}
          size="small"
        >
          <MenuItem value={"Unassigned"}>Unassigned</MenuItem>
          <MenuItem value={"Assigned"}>Assigned</MenuItem>
          <MenuItem value={"InProgress"}>In Progress</MenuItem>
          <MenuItem value={"Closed"}>Closed</MenuItem>
        </Select>
      </td>
      <td className="p-3 text-sm">{props.priority}</td>
      <td className="p-3 text-sm">{props.long_name_loc}</td>
      <td className="p-3 text-sm">{props.emp_name}</td>
      <td className="p-3 text-sm">
        <Button onClick={handleExpandClick}>More</Button>
      </td>

      {/*Flower Request*/}
      <Dialog
        open={openFlower}
        onClose={() => setOpenFlower(false)}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Flower Request - {props.id}</DialogTitle>
        <DialogContent>
          {stuff && (
            <>
              <strong>Here are your responses:</strong>
              <br />
              Name: {props.emp_name}
              <br />
              Priority: {props.priority}
              <br />
              Room: {stuff.room_name}
              <br />
              Sent By: {stuff.sent_by}
              <br />
              Send To: {stuff.sent_to}
              <br />
              Note for Patient: {stuff.note}
              <br />
              Status: {props.status}
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenFlower(false)} autoFocus>
            Okay
          </Button>
        </DialogActions>
      </Dialog>

      {/*Maintenance Request*/}
      <Dialog
        open={openMaint}
        onClose={() => setOpenMaint(false)}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Maintenance Request - {props.id}</DialogTitle>
        <DialogContent>
          {stuffMaintenance && (
            <>
              <strong>Here are your responses:</strong>
              <br />
              Name: {props.emp_name}
              <br />
              Location: {props.long_name_loc}
              <br />
              Date: {stuffMaintenance.date}
              <br />
              Priority: {props.priority}
              <br />
              Type: {stuffMaintenance.maintainType}
              <br />
              Status: {props.status}
              <br />
            </>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenMaint(false)} autoFocus>
            Okay
          </Button>
        </DialogActions>
      </Dialog>

      {/*Sanitation Request*/}
      <Dialog
        open={openSan}
        onClose={() => setOpenSan(false)}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Sanitation Request - {props.id}</DialogTitle>
        <DialogContent>
          {stuffSanitation && (
            <>
              <strong>Here are your responses:</strong>
              <br />
              Employee Name: {props.emp_name}
              <br />
              Room Name: {stuffSanitation.room_name}
              <br />
              Severity: {stuffSanitation.severity}
              <br />
              Hazardous?: {stuffSanitation.hazardous}
              <br />
              Priority: {props.priority}
              <br />
              Status: {props.status}
              <br />
            </>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenSan(false)} autoFocus>
            Okay
          </Button>
        </DialogActions>
      </Dialog>

      {/*Language Request*/}
      <Dialog
        open={openLang}
        onClose={() => setOpenLang(false)}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Language Request - {props.id}</DialogTitle>
        <DialogContent>
          {stuffLanguage && (
            <>
              <strong>Here are your responses:</strong>
              <br />
              Name: {props.emp_name}
              <br />
              Location: {props.long_name_loc}
              <br />
              Date: {stuffLanguage.date}
              <br />
              Priority: {props.priority}
              <br />
              Language Requested: {stuffLanguage.language}
              <br />
              Mode of Interpretation: {stuffLanguage.modeOfInterp}
              <br />
              Special Instructions: {stuffLanguage.specInstruct}
              <br />
              Status: {props.status}
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenLang(false)} autoFocus>
            Okay
          </Button>
        </DialogActions>
      </Dialog>
      {/*Medical Request*/}
      <Dialog
        open={openDevice}
        onClose={() => setOpenDevice(false)}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Medical Device Request - {props.id}</DialogTitle>
        <DialogContent>
          <>
            <strong>Here are your responses:</strong>
            <br />
            Employee Name: {props.emp_name}
            <br />
            Room Name: {stuffMedicalDevice.room_name}
            <br />
            Medical Device Name: {stuffMedicalDevice.device}
            <br />
            Quantity: {stuffMedicalDevice.quantity}
            <br />
            Priority: {props.priority}
            <br />
            Status: {props.status}
            <br />
            Date: {stuffMedicalDevice.date}
          </>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDevice(false)} autoFocus>
            Okay
          </Button>
        </DialogActions>
      </Dialog>
      {/*Medicine Request*/}
      <Dialog
        open={openMedicine}
        onClose={() => setOpenMedicine(false)}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Medicine Delivery Request - {props.id}</DialogTitle>
        <DialogContent>
          {stuffMedicine && (
            <>
              <strong>Here are your responses:</strong>
              <br />
              Employee Name: {props.emp_name}
              <br />
              Medicine Name: {stuffMedicine.medicine_name}
              <br />
              Quantity: {stuffMedicine.quantity}
              <br />
              Room Name: {stuffMedicine.room_name}
              <br />
              Priority: {props.priority}
              <br />
              Status: {props.status}
              <br />
            </>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenMedicine(false)} autoFocus>
            Okay
          </Button>
        </DialogActions>
      </Dialog>

      {/*Room Scheduling Request*/}
      <Dialog
        open={openRoom}
        onClose={() => setOpenRoom(false)}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Room Scheduling Request - {props.id}</DialogTitle>
        <DialogContent>
          <>
            <strong>Here are your responses:</strong>
            <br />
            Employee Name: {props.emp_name}
            <br />
            Room: {stuffRoomSchedule.room_name}
            <br />
            Start Time: {stuffRoomSchedule.startTime}
            <br />
            Reservation Length: {stuffRoomSchedule.lengthRes}
            <br />
            Priority: {props.priority}
            <br />
            Status: {props.status}
            <br />
          </>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenRoom(false)} autoFocus>
            Okay
          </Button>
        </DialogActions>
      </Dialog>

      {/*Lost and found Scheduling Request*/}
      <Dialog
        open={openLost}
        onClose={() => setOpenLost(false)}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Lost and Found Request - {props.id}</DialogTitle>
        <DialogContent>
          {stuffLost && (
            <>
              <strong>Here are your responses:</strong>
              <br />
              Employee Name: {props.emp_name}
              <br />
              Date: {stuffLost.date}
              <br />
              Description: {stuffLost.description}
              <br />
              Type: {stuffLost.type}
              <br />
              Priority: {props.priority}
              <br />
              Status: {props.status}
              <br />
            </>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenLost(false)} autoFocus>
            Okay
          </Button>
        </DialogActions>
      </Dialog>

      {/*Security Request*/}
      <Dialog
        open={openSec}
        onClose={() => setOpenSec(false)}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Security Request - {props.id}</DialogTitle>
        <DialogContent>
          {stuffLost && (
            <>
              <strong>Here are your responses:</strong>
              <br />
              Employee Name: {props.emp_name}
              <br />
              Date: {stuffSecurity.date}
              <br />
              Description: {stuffSecurity.description}
              <br />
              Type: {stuffSecurity.type}
              <br />
              Priority: {props.priority}
              <br />
              Status: {props.status}
              <br />
            </>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenSec(false)} autoFocus>
            Okay
          </Button>
        </DialogActions>
      </Dialog>

      <td className="p-3 text-sm">
        <IconButton
          className="px-7 flex justify-center transform hover:scale-125"
          onClick={() => setConfirm(true)}
        >
          <DeleteOutline color="error" />
        </IconButton>
      </td>
      <Dialog open={confirm} onClose={() => setConfirm(false)}>
        <DialogTitle>Delete Confirmation</DialogTitle>
        <DialogContent>
          <strong>Are you sure you want to delete this request?</strong>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirm(false)} autoFocus>
            No
          </Button>
          <Button onClick={() => deleteData(props.id)} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </tr>
  );
}

export default PendingFlowerReq;
