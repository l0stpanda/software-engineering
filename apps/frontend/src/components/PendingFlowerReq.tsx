import trashIcon from "../assets/trashicon.png";
import {
  Select,
  MenuItem,
  SelectChangeEvent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
// import {flowerReqFields} from "common/src/flowerRequest.ts";

type FlowerArray = {
  sent_by: string;
  sent_to: string;
  requestDate: string;
  note: string;
  room_name: string;
};

type FlowerReqData = {
  id: number;
  status: string;
  priority: string;
  location: string;
  flowerID: FlowerArray[];
};

function PendingFlowerReq(props: FlowerReqData) {
  const { getAccessTokenSilently } = useAuth0();

  // Formats date string to date format
  function formatDate(requestDate: string) {
    const dateToFormat: Date = new Date(requestDate);
    return dateToFormat.toLocaleDateString();
  }

  const [status, setStatus] = useState<string>(props.status);
  const [open, setOpen] = useState(false);
  const [inData, setInData] = useState<FlowerReqData>(props);

  async function handleStatusDropdown(e: SelectChangeEvent) {
    const token = await getAccessTokenSilently();
    setStatus(e.target.value);
    await axios.post(
      "/api/flowerRequest/update",
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
    return;
  }

  // Formats date string to time format
  function formatTime(requestDate: string) {
    const dateToFormat: Date = new Date(requestDate);
    return dateToFormat.toLocaleTimeString();
  }

  //takes in the id of the request to be deleted and deletes in the database
  async function deleteData(idVal: number) {
    console.log(idVal);
    try {
      const token = await getAccessTokenSilently();
      //call to backend
      await axios.delete(`api/flowerRequest/${idVal}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (e) {
      console.log(e);
      return;
    }
    alert("Successfully deleted flower request with ID number " + idVal);
    //window must be reloaded on delete to show updated results
    window.location.reload();
  }

  function handleClick() {
    console.log("please work on god");
    setOpen(true);
    setInData(props);
  }

  function handleSubmitClose() {
    setOpen(false);
  }

  return (
    // <a href="#" onClick={handleClick} style={{ textDecoration: 'none', color: 'inherit' }}>
    <tr
      className="bg-background border-b-2 border-secondary"
      key={props.id}
      onClick={handleClick}
    >
      <td className="p-3 text-sm">{props.id}</td>
      <td className="p-3 text-sm">
        <Select
          name="status"
          required={true}
          label="Status"
          onChange={handleStatusDropdown}
          value={status}
          defaultValue={props.status}
        >
          <MenuItem value={"Unassigned"}>Unassigned</MenuItem>
          <MenuItem value={"Assigned"}>Assigned</MenuItem>
          <MenuItem value={"InProgress"}>In Progress</MenuItem>
          <MenuItem value={"Closed"}>Closed</MenuItem>
        </Select>
      </td>
      <td className="p-3 text-sm">
        {formatDate(props.flowerID[0].requestDate)}
      </td>
      <td className="p-3 text-sm">
        {formatTime(props.flowerID[0].requestDate)}
      </td>
      <td className="p-3 text-sm">{props.flowerID[0].room_name}</td>
      <td className="p-3 text-sm">
        <button>
          <img
            onClick={() => deleteData(props.id)}
            src={trashIcon}
            alt="Trash icon"
            className="px-7 flex justify-center transform h-6 hover:scale-125"
          />
        </button>
      </td>

      <Dialog
        open={open}
        onClose={handleSubmitClose}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>We received your request!</DialogTitle>
        <DialogContent>
          <strong>Here are your responses:</strong>
          <br />
          Room Number: {inData.flowerID[0].room_name}
          <br />
          Sent By: {inData.flowerID[0].sent_by}
          <br />
          Send To: {inData.flowerID[0].sent_to}
          <br />
          Note for Patient: {inData.flowerID[0].note}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmitClose} autoFocus>
            Okay
          </Button>
        </DialogActions>
      </Dialog>
    </tr>
  );
}

export default PendingFlowerReq;
