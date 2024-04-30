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
} from "@mui/material";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import React, { useEffect, useState } from "react";
import axios from "axios";
import LocationDropdown from "../components/locationDropdown.tsx";
import { useAuth0 } from "@auth0/auth0-react";
import UserDropdown from "../components/userDropdown.tsx";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { Dayjs } from "dayjs";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<string, string>;
  },
  ref: React.Ref<unknown>,
) {
  return (
    <Slide direction="up" ref={ref} {...props} children={props.children} />
  );
});

export default function RoomSchedulingReq() {
  type roomReqFields = {
    employName: string;
    startTime: Dayjs | null;
    lengthRes: string;
    roomNum: string;
    reqStatus: string;
    priority: string;
  };

  const [responses, setResponses] = useState<roomReqFields>({
    employName: "",
    startTime: null,
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

  function handleDateChange(date: Dayjs | null) {
    setResponses({ ...responses, startTime: date });
  }

  function clear() {
    setResponses({
      employName: "",
      startTime: null,
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
  function updateName(val: string) {
    setResponses({ ...responses, employName: val });
  }

  return (
    <div className="w-full">
      <div className="m-auto mt-3 flex flex-col px-10 h-full w-full justify-center py-1">
        <h1 className="my-2 font-header text-primary font-extrabold text-3xl text-center">
          Room Scheduling Request
        </h1>
        <form className="flex flex-col gap-4 my-4" onSubmit={handleSubmit}>
          {/*<TextField*/}
          {/*  label="Employee Name"*/}
          {/*  type="text"*/}
          {/*  name="employName"*/}
          {/*  variant="filled"*/}
          {/*  value={responses.employName}*/}
          {/*  onChange={handleResponseChanges}*/}
          {/*  required*/}
          {/*/>*/}
          <UserDropdown
            room={responses.employName}
            update={updateName}
            label={"Username"}
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
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              sx={{ bgcolor: "#eceff0" }}
              label="Starting Date/Time*"
              value={responses.startTime}
              disablePast
              onChange={handleDateChange}
              //renderInput={(params) => <TextField {...params} required/>}
            />
          </LocalizationProvider>

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
              <MenuItem value={"Unassigned"}>Unassigned</MenuItem>
              <MenuItem value={"Assigned"}>Assigned</MenuItem>
              <MenuItem value={"InProgress"}>In Progress</MenuItem>
              <MenuItem value={"Closed"}>Closed</MenuItem>
            </Select>
          </FormControl>

          <div className="flex justify-center mt-3">
            <Button
              onClick={clear}
              variant="contained"
              className="w-32 self-center pt-10"
              sx={{
                borderRadius: "30px",
                marginRight: "20px",
                transition: "transform 0.3s ease-in-out",
                "&:hover": {
                  transform: "scale(1.1)",
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
                  transform: "scale(1.1)",
                },
              }}
            >
              SUBMIT
            </Button>
          </div>
        </form>
      </div>
      <React.Fragment>
        <Dialog
          open={open}
          onClose={handleSubmitClose}
          TransitionComponent={Transition}
          keepMounted
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>We received your request!</DialogTitle>
          <DialogContent>
            <strong>Here are your responses:</strong>
            <br />
            Employee Name: {responses.employName}
            <br />
            Start Date/Time: {responses.startTime?.toString()}
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
        <div className="text-text mt-[4.6rem] ml-2 font-header place-self-right">
          Credits: Ally and Ben
        </div>
      </React.Fragment>
    </div>
  );
}
