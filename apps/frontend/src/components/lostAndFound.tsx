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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";

import BackgroundPattern from "../components/allyBackground.tsx";
import { lostAndFound } from "common/src/lostAndFoundType.ts";
import LocationDropdown from "./locationDropdown.tsx";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Dayjs } from "dayjs";

function LostFound() {
  const initialFormResponses: lostAndFound = {
    name: "",
    date: null,
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

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
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

    setRequests((prevState) => [...prevState, responses]);
    setOpen(true);
  }

  function handleDateChange(date: Dayjs | null) {
    setResponses({ ...responses, date: date });
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
    <div className="justify-center grid h-screen place-items-center mt-6">
      <BackgroundPattern />
      <div className="m-auto flex flex-col bg-background rounded-xl px-10 h-fit w-[700px] justify-center py-4">
        <h1 className="my-2 font-header text-primary font-bold text-3xl text-center">
          Lost and Found Request
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
          Sam and Krishna
        </p>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 my-4">
            <TextField
              onChange={handleResponseChanges}
              value={responses.name}
              name="name"
              id="name"
              variant="filled"
              label="Employee Name"
              required
            />

            {/*<TextField*/}
            {/*  onChange={handleResponseChanges}*/}
            {/*  value={responses.date}*/}
            {/*  id="date"*/}
            {/*  name="date"*/}
            {/*  variant="filled"*/}
            {/*  placeholder=""*/}
            {/*  label="Request Date"*/}
            {/*  type="date"*/}
            {/*  InputLabelProps={{ shrink: true }}*/}
            {/*  required*/}
            {/*/>*/}
            <FormControl variant="filled" required>
              <InputLabel id="priority">Priority</InputLabel>
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

            <LocationDropdown
              room={responses.location}
              update={updateLoc}
              label={"Location"}
            />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                sx={{ bgcolor: "#eceff0" }}
                label="Date *"
                value={responses.date}
                disablePast
                onChange={handleDateChange}
                // renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>

            <FormControl variant="filled">
              <InputLabel id="giftType">Item Type</InputLabel>
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
            <FormControl variant="filled" required>
              <InputLabel id="status">Status</InputLabel>
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

            <div className="flex justify-center">
              <Button
                className="w-32 self-center pt-10"
                type="submit"
                id="requestSubmit"
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
                SUBMIT
              </Button>

              <Button
                className="w-32 self-center pt-10"
                id="clear"
                onClick={clear}
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
          Date: {responses.date?.toString()}
          <br />
          Object Description: {responses.objectDesc}
          <br />
          Location: {responses.location}
          <br />
          Priority: {responses.priority}
          <br />
          Item Type: {responses.type}
          <br />
          Status: {responses.status}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmitClose} autoFocus>
            Okay
          </Button>
        </DialogActions>
      </Dialog>
      <h2
        className="text-2xl font-bold mb-4 text-center transform hover:-translate-y-2 transition-transform duration-300"
        style={{
          color: "rgb(0 40 102 / 1)",
          fontFamily: "Nunito, sans-serif",
          fontSize: "34px",
          margin: "30px",
        }}
      >
        Submitted Requests
      </h2>
      <Table
        className="bg-gray rounded-xl justify-center py-10"
        sx={{ bgcolor: "#eceff0" }}
      >
        <TableHead className="w-full table-auto mt-4 border-collapse border-b-2 border-secondary">
          <TableRow>
            <TableCell className="px-4 py-2 text-sm font-semibold tracking-wide text-left bg-gray-100">
              Employee Name
            </TableCell>
            <TableCell className="px-4 py-2 text-sm font-semibold tracking-wide text-left bg-gray-100">
              Date
            </TableCell>
            <TableCell className="px-4 py-2 text-sm font-semibold tracking-wide text-left bg-gray-100">
              Object Description
            </TableCell>
            <TableCell className="px-4 py-2 text-sm font-semibold tracking-wide text-left bg-gray-100">
              Priority
            </TableCell>
            <TableCell className="px-4 py-2 text-sm font-semibold tracking-wide text-left bg-gray-100">
              Status
            </TableCell>
            <TableCell className="px-4 py-2 text-sm font-semibold tracking-wide text-left bg-gray-100">
              Item Type
            </TableCell>
            <TableCell className="px-4 py-2 text-sm font-semibold tracking-wide text-left bg-gray-100">
              Location
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {requests.map(
            (
              { name, date, objectDesc, priority, status, type, location },
              index,
            ) => (
              <TableRow key={index}>
                <TableCell className="px-4 py-2 text-sm font-semibold tracking-wide text-left bg-gray-100">
                  {name}
                </TableCell>
                <TableCell className="px-4 py-2 text-sm font-semibold tracking-wide text-left bg-gray-100">
                  {date?.toString()}
                </TableCell>
                <TableCell className="px-4 py-2 text-sm font-semibold tracking-wide text-left bg-gray-100">
                  {objectDesc}
                </TableCell>
                <TableCell className="px-4 py-2 text-sm font-semibold tracking-wide text-left bg-gray-100">
                  {priority}
                </TableCell>
                <TableCell className="px-4 py-2 text-sm font-semibold tracking-wide text-left bg-gray-100">
                  {status}
                </TableCell>
                <TableCell className="px-4 py-2 text-sm font-semibold tracking-wide text-left bg-gray-100">
                  {type}
                </TableCell>
                <TableCell className="px-4 py-2 text-sm font-semibold tracking-wide text-left bg-gray-100">
                  {location}
                </TableCell>
              </TableRow>
            ),
          )}
        </TableBody>
      </Table>
    </div>
    // </div>
  );
}

export default LostFound;
