import { useAuth0 } from "@auth0/auth0-react";
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

import { langInterpreterType } from "common/src/langInterpreterType.ts";
import dayjs, { Dayjs } from "dayjs";
import axios from "axios";
import UserDropdown from "../components/userDropdown.tsx";
import LocationDropdown from "../components/locationDropdown.tsx";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

function LangInterpreterReq() {
  const { getAccessTokenSilently } = useAuth0();
  const initialFormData: langInterpreterType = {
    name: "",
    location: "",
    date: dayjs(),
    priority: "Medium",
    language: "",
    modeOfInterp: "",
    specInstruct: "",
    status: "Unassigned",
  };

  const [formData, setFormData] =
    useState<langInterpreterType>(initialFormData);

  const [open, setOpen] = useState(false);

  function handleFormDataChanges(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function updateName(val: string) {
    setFormData({ ...formData, name: val });
  }

  function updateLoc(val: string) {
    setFormData({ ...formData, location: val });
  }

  function handleDateInput(date: Dayjs | null) {
    setFormData({ ...formData, date: date });
  }

  function handlePriorityInput(e: SelectChangeEvent) {
    setFormData({ ...formData, priority: e.target.value });
  }

  function handleLangInput(e: SelectChangeEvent) {
    setFormData({ ...formData, language: e.target.value });
  }

  function handleModeOfInterpInput(e: SelectChangeEvent) {
    setFormData({ ...formData, modeOfInterp: e.target.value });
  }

  function handleStatusInput(e: SelectChangeEvent) {
    setFormData({ ...formData, status: e.target.value });
  }

  function clear() {
    setFormData(initialFormData);
  }

  function handleSubmitClose() {
    setOpen(false);
    clear();
    window.location.reload();
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const token = await getAccessTokenSilently();
    if (
      formData.name == "" ||
      formData.location == "" ||
      formData.date == null ||
      formData.priority == "" ||
      formData.language == "" ||
      formData.modeOfInterp == "" ||
      formData.specInstruct == "" ||
      formData.status == ""
    ) {
      return;
    }
    try {
      await axios.post("/api/langInterpreter", formData, {
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

  return (
    <div className="w-full">
      <div className="m-auto mt-6 flex flex-col px-10 h-full w-full justify-center py-4">
        <h1 className="my-2 font-header text-primary font-extrabold text-3xl text-center transition-transform hover:scale-110 -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;">
          Language Interpreter Form
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 my-4">
            <UserDropdown
              room={formData.name}
              update={updateName}
              label={"Username"}
            />
            <LocationDropdown
              room={formData.location}
              update={updateLoc}
              label={"Location"}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                sx={{ bgcolor: "#eceff0" }}
                label="Date Found *"
                value={formData.date}
                disablePast
                onChange={handleDateInput}
                // renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <FormControl variant="filled" required>
              <InputLabel id="priority">Priority</InputLabel>
              <Select
                name="priority"
                labelId="priority"
                id="priority"
                value={formData.priority}
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
            <FormControl variant="filled">
              <InputLabel id="lang">Language Requested</InputLabel>
              <Select
                name="lang"
                labelId="lang"
                id="lang"
                value={formData.language}
                onChange={handleLangInput}
              >
                <MenuItem value={"Hindi"}>Hindi</MenuItem>
                <MenuItem value={"Bengali"}>Bengali</MenuItem>
                <MenuItem value={"Urdu"}>Urdu</MenuItem>
                <MenuItem value={"Lao"}>Lao</MenuItem>
              </Select>
            </FormControl>
            <FormControl variant="filled" required>
              <InputLabel id="MoI">Mode of Interpretation</InputLabel>
              <Select
                name="MoI"
                labelId="MoI"
                id="MoI"
                value={formData.modeOfInterp}
                onChange={handleModeOfInterpInput}
              >
                {/*<MenuItem value="">*/}
                {/*  <em>None</em>*/}
                {/*</MenuItem>*/}
                <MenuItem value={"In Person"}>In Person</MenuItem>
                <MenuItem value={"Video Call"}>Video Call</MenuItem>
                <MenuItem value={"Audio Call"}>Audio Call</MenuItem>
                <MenuItem value={"Written Word"}>Written Word</MenuItem>
              </Select>
            </FormControl>
            <TextField
              onChange={handleFormDataChanges}
              value={formData.specInstruct}
              id="specInstruct"
              name="specInstruct"
              variant="filled"
              label="Special Instructions"
              placeholder=""
              required
            />
            <FormControl variant="filled" required>
              <InputLabel id="status">Status</InputLabel>
              <Select
                name="status"
                labelId="status"
                id="status"
                value={formData.status}
                onChange={handleStatusInput}
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

      <Dialog open={open} onClose={handleSubmitClose}>
        <DialogTitle>We received your request!</DialogTitle>
        <DialogContent>
          <strong>Here are your responses:</strong>
          <br />
          Name: {formData.name}
          <br />
          Location: {formData.location}
          <br />
          Date: {formData.date?.toString()}
          <br />
          Priority: {formData.priority}
          <br />
          Language Requested: {formData.language}
          <br />
          Mode of Interpretation: {formData.modeOfInterp}
          <br />
          Special Instructions: {formData.specInstruct}
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

export default LangInterpreterReq;
