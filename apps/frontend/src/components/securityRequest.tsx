import React, { useState, FormEvent } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { TransitionProps } from "@mui/material/transitions";
import Slide from "@mui/material/Slide";
import UserDropdown from "../components/userDropdown";
import LocationDropdown from "../components/locationDropdown";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { Dayjs } from "dayjs";

interface securityRequest {
  name: string;
  location: string;
  status: string;
  priority: string;
  incidentDescription: string;
  incidentTime: Dayjs | null;
  actionTaken: string;
}

function SecurityRequest() {
  const { getAccessTokenSilently } = useAuth0();
  const initialFormResponses: securityRequest = {
    name: "",
    location: "",
    status: "Pending",
    priority: "Medium",
    incidentDescription: "",
    incidentTime: null,
    actionTaken: "",
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

  function handleResponseChanges(
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) {
    setResponses({ ...responses, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const token = await getAccessTokenSilently();
    if (
      responses.name == "" ||
      responses.incidentTime == null ||
      responses.incidentDescription == "" ||
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
    setResponses({ ...responses, incidentTime: date });
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
  function handleActionTakenUpdate(e: SelectChangeEvent) {
    setResponses({ ...responses, actionTaken: e.target.value });
  }

  return (
    <div className="w-full">
      <div className="m-auto mt-6 flex flex-col px-10 h-full w-full justify-center py-4">
        <h1 className="my-2 font-header text-primary font-extrabold text-3xl text-center transition-transform hover:scale-110 -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;">
          Security Request
        </h1>
        {/*<p*/}
        {/*  className="text-2xl font-bold mb-4 text-center"*/}
        {/*  style={{*/}
        {/*    color: "black",*/}
        {/*    fontFamily: "PTSans, sans-serif",*/}
        {/*    fontSize: "20px",*/}
        {/*    margin: "5px",*/}
        {/*  }}*/}
        {/*>*/}
        {/*  Sam and Krishna*/}
        {/*</p>*/}
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 my-4">
            <UserDropdown
              room={responses.name}
              update={updateName}
              label={"Username"}
            />

            <LocationDropdown
              room={responses.location}
              update={updateLoc}
              label={"Location"}
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
                <MenuItem value={"High"}>High</MenuItem>
                <MenuItem value={"Medium"}>Medium</MenuItem>
                <MenuItem value={"Low"}>Low</MenuItem>
                <MenuItem value={"Emergency"}>Emergency</MenuItem>
              </Select>
            </FormControl>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                sx={{ bgcolor: "#eceff0" }}
                label="Incident Time"
                value={responses.incidentTime}
                onChange={handleDateChange}
              />
            </LocalizationProvider>
            <TextField
              onChange={handleResponseChanges}
              value={responses.incidentDescription}
              id="incidentDescription"
              name="incidentDescription"
              variant="filled"
              label="Incident Description"
              placeholder=""
              required
            />

            <FormControl variant="filled" required>
              <InputLabel id="actionTaken">Action Taken</InputLabel>
              <Select
                name="actionTaken"
                labelId="actionTaken"
                id="actionTaken"
                value={responses.actionTaken}
                onChange={handleActionTakenUpdate} // You need to create this function
              >
                <MenuItem value={"Investigated"}>Investigated</MenuItem>
                <MenuItem value={"Resolved"}>Resolved</MenuItem>
                <MenuItem value={"Referred to Authorities"}>
                  Referred to Authorities
                </MenuItem>
              </Select>
            </FormControl>

            <FormControl variant="filled" required>
              <InputLabel id="status">Status</InputLabel>
              <Select
                name="status"
                labelId="status"
                id="status"
                value={responses.status}
                onChange={handleStatusUpdate}
              >
                <MenuItem value={"Pending"}>Pending</MenuItem>
                <MenuItem value={"In Progress"}>In Progress</MenuItem>
                <MenuItem value={"Resolved"}>Resolved</MenuItem>
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
            Username: {responses.name}
            <br />
            Location: {responses.location}
            <br />
            Priority: {responses.priority}
            <br />
            Incident Description: {responses.incidentDescription}
            <br />
            Incident Time: {responses.incidentTime?.toString()}
            <br />
            Action Taken: {responses.actionTaken}
            <br />
            Status: {responses.status}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleSubmitClose} autoFocus>
              Okay
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </div>
  );
}

export default SecurityRequest;
