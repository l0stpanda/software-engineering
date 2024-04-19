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
import React, { useEffect, useState } from "react";
import axios from "axios";
import AllyBackground from "../components/allyBackground.tsx";
import LocationDropdown from "../components/locationDropdown.tsx";
import { useAuth0 } from "@auth0/auth0-react";

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
    reqStatus: "Unassigned",
    priority: "Medium",
  });

  const { getAccessTokenSilently } = useAuth0();

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
    try {
      const token = await getAccessTokenSilently();
      await axios.post("/api/roomSchedulingRequest", responses, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (e) {
      alert(
        "Error storing in the database, make sure nodes/edges are uploaded and you are logged in.",
      );
      console.error(e);
      return;
    }

    setOpen(true);
  }

  useEffect(() => {
    getValues().then();
  }, []);

  async function getValues() {
    const confirmation = await axios
      .get("/api/roomSchedulingRequest")
      .then((response) => response.data);
    console.log(confirmation);
  }

  function handleSubmitClose() {
    setOpen(false);
    window.location.reload();
    clear();
  }

  function updateRoom(val: string) {
    setResponses({ ...responses, roomNum: val });
  }

  return (
    <div className="justify-center grid min-h-screen max-h-fit place-items-center mt-6">
      <AllyBackground />
      <div className="m-auto shadow-2xl flex flex-col bg-background rounded-xl px-10 h-fit w-[700px] justify-center py-4">
        <h1 className="my-2 font-header text-primary font-bold text-3xl text-center">
          Room Scheduling Request
        </h1>

        <p
          className="text-2xl font-bold mb-4 text-center"
          style={{
            color: "black",
            fontFamily: "PTSans, sans-serif",
            fontSize: "20px",
            margin: "5px",
          }}
        >
          Ally and Ben
        </p>

        <form className="flex flex-col gap-4 my-4" onSubmit={handleSubmit}>
          <TextField
            label="Employee Name"
            type="text"
            name="employName"
            variant="filled"
            value={responses.employName}
            onChange={handleResponseChanges}
            required
          />
          <FormControl>
            <InputLabel id="priority-label" variant="filled">
              Priority *
            </InputLabel>
            <Select
              labelId="priority-label"
              label="Priority"
              name="priority"
              variant="filled"
              value={responses.priority}
              onChange={handleResponseChanges}
              required
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="Low">Low</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="High">High</MenuItem>
              <MenuItem value="Emergency">Emergency</MenuItem>
            </Select>
          </FormControl>
          <LocationDropdown
            room={responses.roomNum}
            update={updateRoom}
            label={"Room"}
          />
          <FormControl>
            <InputLabel id="startTime-label" variant="filled">
              Start Time *
            </InputLabel>
            <Select
              labelId="startTime-label"
              label="Start Time"
              name="startTime"
              id="startTime"
              variant="filled"
              value={responses.startTime}
              onChange={handleResponseChanges}
              required
            >
              Start Time
              <MenuItem value="">None</MenuItem>
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
          </FormControl>

          <FormControl>
            <InputLabel id="lengthRes-label" variant="filled">
              Length of Reservation *
            </InputLabel>
            <Select
              labelId="lengthRes-label"
              label="Length of Reservation"
              name="lengthRes"
              variant="filled"
              value={responses.lengthRes}
              onChange={handleResponseChanges}
              required
            >
              <MenuItem value="">Not Selected</MenuItem>
              <MenuItem value="30 Minutes">30 Minutes</MenuItem>
              <MenuItem value="60 Minutes">60 Minutes</MenuItem>
              <MenuItem value="90 Minutes">90 Minutes</MenuItem>
              <MenuItem value="120 Minutes">120 Minutes</MenuItem>
            </Select>
          </FormControl>

          {/*<TextField*/}
          {/*  label="Room Number"*/}
          {/*  type="number"*/}
          {/*  name="roomNum"*/}
          {/*  variant="filled"*/}
          {/*  value={responses.roomNum}*/}
          {/*  onChange={handleResponseChanges}*/}
          {/*  required*/}
          {/*/>*/}

          <FormControl>
            <InputLabel id="reqStatus-label" variant="filled">
              Request Status *
            </InputLabel>
            <Select
              labelId="reqStatus-label"
              label="Request Status"
              name="reqStatus"
              variant="filled"
              value={responses.reqStatus}
              onChange={handleResponseChanges}
              required
            >
              <MenuItem value="">Not Selected</MenuItem>
              <MenuItem value="Unassigned">Unassigned</MenuItem>
              <MenuItem value="Assigned">Assigned</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
              <MenuItem value="Closed">Closed</MenuItem>
            </Select>
          </FormControl>

          <div className="flex justify-center">
            <Button
              onClick={clear}
              variant="contained"
              className="w-32 self-center pt-10"
              sx={{
                borderRadius: "30px",
                marginRight: "10px",
                transition: "transform 0.3s ease-in-out",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
            >
              CLEAR
            </Button>

            <Button
              type="submit"
              variant="contained"
              className="w-32 self-center pt-10"
              sx={{
                borderRadius: "30px",
                transition: "transform 0.3s ease-in-out",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
            >
              SUBMIT
            </Button>
          </div>
        </form>
      </div>

      <Dialog open={open} onClose={handleSubmitClose}>
        <DialogTitle>We received your request!</DialogTitle>
        <DialogContent>
          <strong>Here are your responses:</strong>
          <br />
          Employee Name: {responses.employName}
          <br />
          Start Time: {responses.startTime}
          <br />
          Length: {responses.lengthRes}
          <br />
          Room Number: {responses.roomNum}
          <br />
          Status: {responses.reqStatus}
          <br />
          Priority: {responses.priority}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmitClose} autoFocus>
            Okay
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
