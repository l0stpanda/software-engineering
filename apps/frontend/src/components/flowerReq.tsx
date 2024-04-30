import {
  //Autocomplete,
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
  //FormControl,
  //InputLabel,
  TextField,
} from "@mui/material";
import React, { FormEvent, useState } from "react";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import axios from "axios";
//import BackgroundPattern from "../components/allyBackground.tsx";
import { flowerReqFields } from "common/src/flowerRequest.ts";
import LocationDropdown from "../components/locationDropdown.tsx";
//import {SelectChangeEvent} from "@mui/material/Select";
import { useAuth0 } from "@auth0/auth0-react";
import UserDropdown from "../components/userDropdown.tsx";

function FlowerReqForm() {
  const { getAccessTokenSilently } = useAuth0();

  const initialFormResponses: flowerReqFields = {
    empName: "",
    roomNum: "",
    senderName: "",
    priority: "Medium",
    sendTo: "",
    attachedNote: "",
    status: "Unassigned",
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

  // State for form responses
  const [responses, setResponses] =
    useState<flowerReqFields>(initialFormResponses);

  // State for whether form confirmation dialog is open or closed
  const [open, setOpen] = useState(false);

  // Takes in an event object and updates the responses object when a text field is changed
  function handleResponseChanges(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setResponses({ ...responses, [e.target.name]: e.target.value });
  }

  function updateName(val: string) {
    setResponses({ ...responses, empName: val });
  }

  // Sets state back to initial state
  function clear() {
    setResponses(initialFormResponses);
  }

  // Clears form, and outputs responses
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Catch required fields not being filled out
    console.log(responses);
    if (
      responses.sendTo == "" ||
      responses.senderName == "" ||
      responses.roomNum == ""
    ) {
      return;
    }

    try {
      const token = await getAccessTokenSilently();
      console.log(token);
      // Make post request to backend with form response data
      await axios.post("/api/flowerRequest", responses, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      alert(
        "Error storing in the database, make sure nodes/edges are uploaded and you are logged in.",
      );
      console.error(error);
      return;
    }
    // Open form confirmation dialog
    setOpen(true);
  }

  function handlePriorityInput(e: SelectChangeEvent) {
    setResponses({ ...responses, priority: e.target.value });
  }
  // Handle closing the form confirmation dialog
  function handleSubmitClose() {
    setOpen(false);
    clear();
    window.location.reload();
  }
  function handleStatusUpdate(e: SelectChangeEvent) {
    setResponses({ ...responses, status: e.target.value });
  }
  function updateRoom(val: string) {
    setResponses({ ...responses, roomNum: val });
  }

  return (
    <div className="w-full">
      <div className="m-auto mt-3 flex flex-col px-10 h-full w-full justify-center py-1">
        <h1 className="my-2 font-header text-primary font-extrabold text-3xl text-center">
          Flower Delivery Request
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 my-4">
            {/*<TextField*/}
            {/*  onChange={handleResponseChanges}*/}
            {/*  value={responses.empName}*/}
            {/*  id="empName"*/}
            {/*  name="empName"*/}
            {/*  variant="filled"*/}
            {/*  label="Employee Name"*/}
            {/*  placeholder="Name"*/}
            {/*  required={true}*/}
            {/*/>*/}
            <UserDropdown
              room={responses.empName}
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
            {/*This handles the dropdown stuff*/}
            <LocationDropdown
              room={responses.roomNum}
              update={updateRoom}
              label={"Room"}
            />
            {/*This handles the dropdown stuff*/}
            <TextField
              onChange={handleResponseChanges}
              value={responses.senderName}
              id="senderName"
              name="senderName"
              variant="filled"
              label="Sent By"
              placeholder="Sent By"
              required={true}
            />
            <TextField
              onChange={handleResponseChanges}
              value={responses.sendTo}
              id="sendTo"
              name="sendTo"
              variant="filled"
              label="Send To"
              placeholder="Name"
              required={true}
            />
            <TextField
              onChange={handleResponseChanges}
              value={responses.attachedNote}
              id="attachedNote"
              name="attachedNote"
              variant="filled"
              label="Note for Patient"
              multiline={true}
              maxRows={5}
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
            <div className="flex-row self-center mt-3">
              <Button
                className="w-32 self-center pt-10"
                onClick={clear}
                id="requestClear"
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
                Clear
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
          Name: {responses.empName}
          <br />
          Priority: {responses.priority}
          <br />
          Room Number: {responses.roomNum}
          <br />
          Sent By: {responses.senderName}
          <br />
          Send To: {responses.sendTo}
          <br />
          Note for Patient: {responses.attachedNote}
          <br />
          Status: {responses.status}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmitClose} autoFocus>
            Okay
          </Button>
        </DialogActions>
      </Dialog>
      <div className="text-text ml-2 font-header place-self-right">
        Credits: Whole Team
      </div>
    </div>
  );
}

export default FlowerReqForm;
