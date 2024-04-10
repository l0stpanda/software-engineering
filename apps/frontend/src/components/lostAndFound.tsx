import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";

import BackgroundPattern from "../components/allyBackground.tsx";
import { lostAndFound } from "common/src/lostAndFoundType.ts";
import LocationDropdown from "./locationDropdown.tsx";

function LostFound() {
  const initialFormResponses: lostAndFound = {
    name: "",
    date: "",
    objectDesc: "",
    priority: "",
    status: "",
    type: "",
    location: "",
  };

  const [responses, setResponses] =
    useState<lostAndFound>(initialFormResponses);

  const [requests, setRequests] = useState<lostAndFound[]>([]);

  const [open, setOpen] = useState(false);

  function handleResponseChanges(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setResponses({ ...responses, [e.target.name]: e.target.value });
  }

  let setter = requests.map((field) => (
    <tr>
      <td>{field.location}</td>
      <td>{field.date}</td>
      <td>{field.name}</td>
      <td>{field.type}</td>
      <td>{field.priority}</td>
      <td>{field.status}</td>
      <td>{field.objectDesc}</td>
    </tr>
  ));

  function handleSubmit() {
    if (
      responses.name == "" ||
      responses.date == "" ||
      responses.objectDesc == "" ||
      responses.priority == "" ||
      responses.status == "" ||
      responses.location == ""
    ) {
      alert(
        "Name, Date, Object Description and Location must all be filled out",
      );
      return;
    }
    //Make an array that will be pushed to and made the state set to
    const arrs: lostAndFound[] = requests;
    arrs.push(responses); //push singleGiftRequest onto arrs
    setRequests(arrs); //set requests list of GiftReqeustSubmissions to be arrs (array with new request pushed onto it)
    console.log(arrs);

    //Display all GiftRequestSubmissions in requests array as a table
    setter = requests.map((field) => (
      <tr>
        <td style={{ textAlign: "center" }}>{field.location}</td>
        <td style={{ textAlign: "center" }}>{field.date}</td>
        <td style={{ textAlign: "center" }}>{field.name}</td>
        <td style={{ textAlign: "center" }}>{field.objectDesc}</td>
      </tr>
    ));
    setOpen(true);
    //clear();
  }

  function handleSubmitClose() {
    setOpen(false);
    clear();
  }

  function clear() {
    setResponses(initialFormResponses);
  }

  function updateLoc(val: string) {
    setResponses({ ...responses, location: val });
  }

  function handlePriorityInput(e: SelectChangeEvent) {
    setResponses({ ...responses, priority: e.target.value });
  }

  function handleStatusUpdate(e: SelectChangeEvent) {
    setResponses({ ...responses, status: e.target.value });
  }

  function handleTypeUpdate(e: SelectChangeEvent) {
    setResponses({ ...responses, type: e.target.value });
  }

  return (
    <div className="justify-center grid h-screen place-items-center">
      <BackgroundPattern />
      <div className="m-auto flex flex-col bg-background rounded-xl px-6 h-fit w-[700px] justify-center py-4">
        <h1 className="my-2 font-header text-primary font-bold text-3xl text-center">
          Lost and Found Request
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 my-4">
            <TextField
              onChange={handleResponseChanges}
              value={responses.name}
              name="name"
              id="name"
              variant="filled"
              label="Name of Employee"
              required
            />

            <TextField
              onChange={handleResponseChanges}
              value={responses.date}
              id="date"
              name="date"
              variant="filled"
              placeholder=""
              label="Request Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              required
            />

            <FormControl variant="filled">
              <InputLabel id="priority">Priority*</InputLabel>
              <Select
                name="priority"
                labelId="priority"
                id="priority"
                value={responses.priority}
                onChange={handlePriorityInput}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"High"}>High</MenuItem>
                <MenuItem value={"Medium"}>Medium</MenuItem>
                <MenuItem value={"Low"}>Low</MenuItem>
                <MenuItem value={"Emergency"}>Emergency</MenuItem>
              </Select>
            </FormControl>

            <FormControl variant="filled">
              <InputLabel id="status">Status*</InputLabel>
              <Select
                name="status"
                labelId="status"
                id="status"
                value={responses.status}
                onChange={handleStatusUpdate}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"Unassigned"}>Unassigned</MenuItem>
                <MenuItem value={"Assigned"}>Assigned</MenuItem>
                <MenuItem value={"InProgress"}>In Progress</MenuItem>
                <MenuItem value={"Closed"}>Closed</MenuItem>
              </Select>
            </FormControl>

            <FormControl variant="filled">
              <InputLabel id="giftType">Item Type*</InputLabel>
              <Select
                name="type"
                labelId="type"
                id="type"
                value={responses.type}
                onChange={handleTypeUpdate}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"Clothing"}>Clothing</MenuItem>
                <MenuItem value={"Device"}>Device</MenuItem>
                <MenuItem value={"Wallet"}>Wallet</MenuItem>
                <MenuItem value={"Bag"}>Bag</MenuItem>
              </Select>
            </FormControl>
            <TextField
              onChange={handleResponseChanges}
              value={responses.objectDesc}
              id="object"
              name="objectDesc"
              variant="filled"
              label="Object Description"
              placeholder=""
              required
            />

            <LocationDropdown
              room={responses.location}
              update={updateLoc}
              label={"Location"}
            />

            <div className="flex justify-center">
              <Button
                className="w-32 self-center pt-10"
                type="submit"
                id="requestSubmit"
                variant="contained"
                size="large"
                sx={{ borderRadius: "30px", marginRight: "10px" }}
              >
                SUBMIT
              </Button>

              <Button
                className="w-32 self-center pt-10"
                id="clear"
                onClick={clear}
                variant="contained"
                size="large"
                sx={{ borderRadius: "30px" }}
              >
                CLEAR
              </Button>
            </div>
          </div>
        </form>
      </div>

      <Dialog open={open} onClose={handleSubmitClose}>
        <DialogTitle>We received your request!</DialogTitle>
        <DialogContent>
          <strong>Here are your responses:</strong>
          <br />
          Name: {responses.name}
          <br />
          Date: {responses.date}
          <br />
          Object Description: {responses.objectDesc}
          <br />
          Location: {responses.location}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmitClose} autoFocus>
            Okay
          </Button>
        </DialogActions>
      </Dialog>

      <table style={{ backgroundColor: "white", width: "90%" }}>
        <tbody>
          <tr>
            <th style={{ textAlign: "center" }}>Location</th>
            <th style={{ textAlign: "center" }}>Date</th>
            <th style={{ textAlign: "center" }}>Name</th>
            <th style={{ textAlign: "center" }}>Description</th>
          </tr>
        </tbody>
        <tbody>
          {/*This is the part that renders the information to the table*/}
          {setter}
        </tbody>
      </table>
    </div>
    // </div>
  );
}

export default LostFound;
