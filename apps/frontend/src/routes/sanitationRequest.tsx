import React, { FormEvent, useState } from "react";
import {
  //TextField,
  Button,
  FormControl,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputLabel,
  MenuItem,
} from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import BackgroundPattern from "../components/allyBackground.tsx";
import LocationDropdown from "../components/locationDropdown.tsx";
import axios from "axios";
import UserDropdown from "../components/userDropdown.tsx";

export type SanitationReq = {
  employeeName: string;
  roomName: string;
  severity: string;
  hazardous: string;
  priority: string;
  status: string;
};

function SanitationRequest() {
  const { getAccessTokenSilently } = useAuth0();
  const [formData, setFormData] = useState<SanitationReq>({
    employeeName: "",
    roomName: "",
    severity: "",
    hazardous: "",
    priority: "Medium",
    status: "Unassigned",
  });

  const [open, setOpen] = useState(false);

  function clear() {
    setFormData({
      employeeName: "",
      roomName: "",
      severity: "",
      hazardous: "",
      priority: "Medium",
      status: "Unassigned",
    });
  }

  function handlePriorityInput(e: SelectChangeEvent) {
    setFormData({ ...formData, priority: e.target.value });
  }

  function handleStatusInput(e: SelectChangeEvent) {
    setFormData({ ...formData, status: e.target.value });
  }

  function handleSeverityInput(e: SelectChangeEvent) {
    setFormData({ ...formData, severity: e.target.value });
  }
  function handleHazardousInput(e: SelectChangeEvent) {
    setFormData({ ...formData, hazardous: e.target.value });
  }
  function updateRoom(val: string) {
    setFormData({ ...formData, roomName: val });
  }
  // function handleFormInput(e: React.ChangeEvent<HTMLInputElement>) {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const token = await getAccessTokenSilently();
    if (
      formData.employeeName == "" ||
      formData.roomName == "" ||
      formData.severity == "" ||
      formData.hazardous == "" ||
      formData.priority == "" ||
      formData.status == ""
    ) {
      return;
    }

    try {
      await axios.post("api/sanitationRequest", formData, {
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

    setOpen(true); // Open dialog box on successful submission
  }

  function updateName(val: string) {
    setFormData({ ...formData, employeeName: val });
  }

  function handleSubmitClose() {
    setOpen(false);
    clear();
  }

  return (
    <div className="justify-center grid min-h-screen max-h-fit place-items-center mt-6">
      <BackgroundPattern />
      <div className="m-auto flex flex-col bg-background rounded-xl px-10 h-fit w-[700px] justify-center py-4">
        <h1 className="my-2 font-header text-primary font-bold text-3xl text-center">
          Sanitation Request
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 my-4">
            {/*<TextField*/}
            {/*  onChange={handleFormInput}*/}
            {/*  value={formData.employeeName}*/}
            {/*  name="employeeName"*/}
            {/*  id="employeeName"*/}
            {/*  variant="filled"*/}
            {/*  label="Employee Name"*/}
            {/*  required={true}*/}
            {/*/>*/}
            <UserDropdown
              room={formData.employeeName}
              update={updateName}
              label={"Username"}
            />

            {/*Room Field*/}
            <LocationDropdown
              room={formData.roomName}
              update={updateRoom}
              label={"Room"}
            />

            {/*Severity Field*/}
            <FormControl variant="filled" required>
              <InputLabel id="severity">Severity</InputLabel>
              <Select
                name="severity"
                labelId="severity"
                id="severity"
                value={formData.severity}
                onChange={handleSeverityInput}
              >
                <MenuItem value={"High"}>High</MenuItem>
                <MenuItem value={"Medium"}>Medium</MenuItem>
                <MenuItem value={"Low"}>Low</MenuItem>
                <MenuItem value={"Emergency"}>Emergency</MenuItem>
              </Select>
            </FormControl>

            {/*Hazard (Y/N) Field*/}
            <FormControl variant="filled" required>
              <InputLabel id="hazardous">Hazardous</InputLabel>
              <Select
                name="hazardous"
                labelId="hazardous"
                id="hazardous"
                value={formData.hazardous}
                onChange={handleHazardousInput}
              >
                <MenuItem value={"Yes"}>Yes</MenuItem>
                <MenuItem value={"No"}>No</MenuItem>
              </Select>
            </FormControl>

            {/*Priority Field*/}
            <FormControl variant="filled" required>
              <InputLabel id="priority">Priority</InputLabel>
              <Select
                name="priority"
                labelId="priority"
                id="priority"
                value={formData.priority}
                onChange={handlePriorityInput}
              >
                <MenuItem value={"High"}>High</MenuItem>
                <MenuItem value={"Medium"}>Medium</MenuItem>
                <MenuItem value={"Low"}>Low</MenuItem>
                <MenuItem value={"Emergency"}>Emergency</MenuItem>
              </Select>
            </FormControl>

            {/*Status Field*/}
            <FormControl variant="filled" required>
              <InputLabel id="status">Status</InputLabel>
              <Select
                name="Status"
                labelId="status"
                id="status"
                value={formData.status}
                onChange={handleStatusInput}
              >
                <MenuItem value={"Unassigned"}>Unassigned</MenuItem>
                <MenuItem value={"Assigned"}>Assigned</MenuItem>
                <MenuItem value={"InProgress"}>In Progress</MenuItem>
                <MenuItem value={"Closed"}>Closed</MenuItem>
              </Select>
            </FormControl>
            <div className="flex justify-center">
              <Button
                className="w-32 self-center pt-10"
                onClick={clear}
                id="requestClear"
                variant="contained"
                size="large"
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
                className="w-32 self-center pt-10"
                type="submit"
                id="requestSubmit"
                variant="contained"
                size="large"
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
          </div>
        </form>
      </div>
      <Dialog open={open} onClose={handleSubmitClose}>
        <DialogTitle>We received your request!</DialogTitle>
        <DialogContent>
          <strong>Here are your responses:</strong>
          <br />
          Employee Name: {formData.employeeName}
          <br />
          Room Name: {formData.roomName}
          <br />
          Severity: {formData.severity}
          <br />
          Hazardous?: {formData.hazardous}
          <br />
          Priority: {formData.priority}
          <br />
          Status: {formData.status}
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

export default SanitationRequest;
