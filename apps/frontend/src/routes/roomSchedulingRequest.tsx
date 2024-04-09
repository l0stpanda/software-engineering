import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  SelectChangeEvent,
  // Table,
  // TableBody,
  // TableCell,
  // TableHead,
  // TableRow,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import axios from "axios";

export default function RoomSchedulingRequest() {
  type roomReqFields = {
    employName: string;
    startTime: string;
    lengthRes: string;
    roomNum: string;
    reqStatus: string;
    priority: string;
  };

  const [responses, setResponses] = useState<roomReqFields>({
    employName: "",
    startTime: "",
    lengthRes: "",
    roomNum: "",
    reqStatus: "",
    priority: "",
  });

  const [open, setOpen] = useState(false);

  function handleResponseChanges(
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent,
  ) {
    const name = e.target.name;
    const value = e.target.value;
    setResponses({ ...responses, [name]: value });
  }

  function clear() {
    setResponses({
      employName: "",
      startTime: "",
      lengthRes: "",
      roomNum: "",
      reqStatus: "",
      priority: "",
    });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (
      !responses.employName ||
      !responses.startTime ||
      !responses.lengthRes ||
      !responses.roomNum ||
      !responses.reqStatus ||
      !responses.priority
    ) {
      alert("You must fill out all forms!");
      return;
    }

    await axios.post("/api/roomSchedulingRequest", responses, {
      headers: { "Content-Type": "application/json" },
    });

    const confirmation = await axios
      .get("api/roomSchedulingRequest")
      .then((response) => response.data);
    console.log(confirmation);
    setOpen(true);
  }

  function handleSubmitClose() {
    setOpen(false);
    clear();
  }

  return (
    <div>
      {/* Header for Page */}
      <div>
        <h1>Schedule A Room:</h1>
      </div>

      {/* Request Form */}
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <TextField
              label="Employee Name"
              type="text"
              name="employName"
              value={responses.employName}
              onChange={handleResponseChanges}
            />
          </div>
          <div>
            <Select
              label="Starting Time"
              name="startTime"
              value={responses.startTime}
              onChange={handleResponseChanges}
            >
              <MenuItem value="">Not Selected</MenuItem>
              <MenuItem value="9:00AM">9:00AM</MenuItem>
              <MenuItem value="10:00AM">10:00AM</MenuItem>
              <MenuItem value="11:00AM">11:00AM</MenuItem>
              <MenuItem value="12:00PM">12:00PM</MenuItem>
              <MenuItem value="1:00PM">1:00PM</MenuItem>
              <MenuItem value="2:00PM">2:00PM</MenuItem>
              <MenuItem value="3:00PM">3:00PM</MenuItem>
              <MenuItem value="4:00PM">4:00PM</MenuItem>
              <MenuItem value="5:00PM">5:00PM</MenuItem>
            </Select>
          </div>
          <div>
            <Select
              label="Length of Reservation"
              name="lengthRes"
              value={responses.lengthRes}
              onChange={handleResponseChanges}
            >
              <MenuItem value="">Not Selected</MenuItem>
              <MenuItem value="30 Minutes">30 Minutes</MenuItem>
              <MenuItem value="60 Minutes">60 Minutes</MenuItem>
              <MenuItem value="90 Minutes">90 Minutes</MenuItem>
              <MenuItem value="120 Minutes">120 Minutes</MenuItem>
            </Select>
          </div>
          <div>
            <TextField
              label="Room Number"
              type="number"
              name="roomNum"
              value={responses.roomNum}
              onChange={handleResponseChanges}
            />
          </div>
          <div>
            <Select
              label="Request Status"
              name="reqStatus"
              value={responses.reqStatus}
              onChange={handleResponseChanges}
            >
              <MenuItem value="">Not Selected</MenuItem>
              <MenuItem value="Unassigned">Unassigned</MenuItem>
              <MenuItem value="Assigned">Assigned</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
              <MenuItem value="Closed">Closed</MenuItem>
            </Select>
          </div>
          <div>
            <Select
              label="Priority"
              name="priority"
              value={responses.priority}
              onChange={handleResponseChanges}
            >
              <MenuItem value="">Not Selected</MenuItem>
              <MenuItem value="Low">Low</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="High">High</MenuItem>
              <MenuItem value="Emergency">Emergency</MenuItem>
            </Select>
          </div>
          <div>
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </div>
        </form>
      </div>

      <Dialog open={open} onClose={handleSubmitClose}>
        <DialogTitle>We received your request!</DialogTitle>
        <DialogContent>
          <strong>Here are your responses:</strong>
          <br />
          Room Name: {responses.employName}
          <br />
          Staff Member Name: {responses.startTime}
          <br />
          Patient Name: {responses.lengthRes}
          <br />
          Medicine Name: {responses.roomNum}
          <br />
          Dosage: {responses.reqStatus}
          <br />
          Date of Delivery: {responses.priority}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmitClose} autoFocus>
            Okay
          </Button>
        </DialogActions>
      </Dialog>

      <br />

      {/* Header for Table */}
      <div>
        <h2>Submitted Room Reservations:</h2>
      </div>

      {/* Table of submitted requests */}
      {/*<div>*/}
      {/*    <Table>*/}
      {/*        <TableHead>*/}
      {/*            <TableRow>*/}
      {/*                <TableCell>Employee Name</TableCell>*/}
      {/*                <TableCell>Start Time</TableCell>*/}
      {/*                <TableCell>Length of Reservation</TableCell>*/}
      {/*                <TableCell>Room Number</TableCell>*/}
      {/*                <TableCell>Request Status</TableCell>*/}
      {/*                <TableCell>Priority</TableCell>*/}
      {/*            </TableRow>*/}
      {/*        </TableHead>*/}
      {/*        <TableBody>*/}
      {/*            {submittedData.map(({employName, lengthRes, priority, reqStatus, roomNum, startTime}, index) => (*/}
      {/*                <TableRow key={index}>*/}
      {/*                    <TableCell>{employName}</TableCell>*/}
      {/*                    <TableCell>{startTime}</TableCell>*/}
      {/*                    <TableCell>{lengthRes}</TableCell>*/}
      {/*                    <TableCell>{roomNum}</TableCell>*/}
      {/*                    <TableCell>{reqStatus}</TableCell>*/}
      {/*                    <TableCell>{priority}</TableCell>*/}
      {/*                </TableRow>*/}
      {/*            ))}*/}
      {/*        </TableBody>*/}
      {/*    </Table>*/}
      {/*</div>*/}
    </div>
  );
}
