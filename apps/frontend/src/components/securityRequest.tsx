import React, { FormEvent, useState } from "react";
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
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { useAuth0 } from "@auth0/auth0-react";
import LocationDropdown from "./locationDropdown.tsx";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs, { Dayjs } from "dayjs";
import axios from "axios";
import UserDropdown from "./userDropdown.tsx";
import { securityRequest } from "common/src/securityRequestType.ts";

function SecurityRequest() {
  const { getAccessTokenSilently } = useAuth0();
  const initialFormResponses: securityRequest = {
    name: "",
    date: dayjs(),
    objectDesc: "",
    priority: "Medium",
    status: "Unassigned",
    type: "",
    location: "",
  };

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

  const [responses, setResponses] =
    useState<securityRequest>(initialFormResponses);

  const [open, setOpen] = useState(false);

  function handleResponseChanges(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setResponses({ ...responses, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const token = await getAccessTokenSilently();
    if (
      responses.name == "" ||
      responses.date == null ||
      responses.objectDesc == "" ||
      responses.priority == "" ||
      responses.status == "" ||
      responses.location == ""
    ) {
      return;
    }
    try {
      await axios.post("/api/securityRequest", responses, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
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

  function handleDateChange(date: Dayjs | null) {
    setResponses({ ...responses, date: date });
  }

  function handleSubmitClose() {
    setOpen(false);
    clear();
    window.location.reload();
  }

  function clear() {
    setResponses(initialFormResponses);
  }

  function updateLoc(val: string) {
    setResponses({ ...responses, location: val });
  }
  function updateName(val: string) {
    setResponses({ ...responses, name: val });
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
    <div className="w-full">
      <div className="m-auto mt-3 flex flex-col px-10 h-full w-full justify-center py-1">
        <h1 className="my-2 font-header text-primary font-extrabold text-3xl text-center">
          Security Request
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 my-4">
            <UserDropdown
              room={responses.name}
              update={updateName}
              label={"Username"}
            />

            <FormControl variant="filled" required>
              <InputLabel id="priority">Priority</InputLabel>
              <Select
                name="priority"
                labelId="priority"
                id="priority"
                value={responses.priority}
                onChange={handlePriorityInput}
              >
                {/*<MenuItem value="">*/}
                {/*  <em>None</em>*/}
                {/*</MenuItem>*/}
                <MenuItem value={"High"}>High</MenuItem>
                <MenuItem value={"Medium"}>Medium</MenuItem>
                <MenuItem value={"Low"}>Low</MenuItem>
                <MenuItem value={"Emergency"}>Emergency</MenuItem>
              </Select>
            </FormControl>

            <LocationDropdown
              room={responses.location}
              update={updateLoc}
              label={"Incident Location"}
            />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                sx={{ bgcolor: "#eceff0" }}
                label="Incident Date *"
                value={responses.date}
                disableFuture
                onChange={handleDateChange}
                // renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>

            <FormControl variant="filled">
              <InputLabel id="giftType">Incident Category</InputLabel>
              <Select
                name="type"
                labelId="type"
                id="type"
                value={responses.type}
                onChange={handleTypeUpdate}
              >
                {/*<MenuItem value="">*/}
                {/*  <em>None</em>*/}
                {/*</MenuItem>*/}
                <MenuItem value={"Theft "}>Theft</MenuItem>
                <MenuItem value={"Unauthorized Access"}>
                  Unauthorized Access
                </MenuItem>
                <MenuItem value={"Assault/Harassment"}>
                  Assault/Harassment
                </MenuItem>
                <MenuItem value={"Vandalism "}>Vandalism</MenuItem>
                <MenuItem value={"Fire/Safety Hazard "}>
                  Fire/Safety Hazard
                </MenuItem>
                <MenuItem value={"Escort"}>Escort</MenuItem>
                <MenuItem value={"Parking"}>Parking </MenuItem>
                <MenuItem value={"Noise Complaint"}>Noise Complaint</MenuItem>
                <MenuItem value={"Parking"}>Parking </MenuItem>
                <MenuItem value={"Suspicious Activity"}>
                  Suspicious Activity
                </MenuItem>
                <MenuItem value={"Other"}>Other</MenuItem>
              </Select>
            </FormControl>
            <TextField
              onChange={handleResponseChanges}
              value={responses.objectDesc}
              id="object"
              name="objectDesc"
              variant="filled"
              label="Incident Description"
              placeholder=""
              required
            />
            <FormControl variant="filled" required>
              <InputLabel id="status">Status</InputLabel>
              <Select
                name="status"
                labelId="status"
                id="status"
                value={responses.status}
                onChange={handleStatusUpdate}
              >
                {/*<MenuItem value="">*/}
                {/*  <em>None</em>*/}
                {/*</MenuItem>*/}
                <MenuItem value={"Unassigned"}>Unassigned</MenuItem>
                <MenuItem value={"Assigned"}>Assigned</MenuItem>
                <MenuItem value={"InProgress"}>In Progress</MenuItem>
                <MenuItem value={"Closed"}>Closed</MenuItem>
              </Select>
            </FormControl>

            <div className="flex justify-center mt-3">
              <Button
                className="w-32 self-center pt-10"
                id="clear"
                onClick={clear}
                variant="contained"
                size="large"
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
                className="w-32 self-center pt-10"
                type="submit"
                id="requestSubmit"
                variant="contained"
                size="large"
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
          </div>
        </form>
      </div>
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
          Name: {responses.name}
          <br />
          Date: {responses.date?.toString()}
          <br />
          Incident Description: {responses.objectDesc}
          <br />
          Incident Location: {responses.location}
          <br />
          Priority: {responses.priority}
          <br />
          Incident category: {responses.type}
          <br />
          Status: {responses.status}
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

export default SecurityRequest;
