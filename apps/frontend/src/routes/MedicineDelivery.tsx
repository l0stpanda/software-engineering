import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import BackgroundPattern from "../components/allyBackground.tsx";
import { SelectChangeEvent } from "@mui/material/Select";
import { useState } from "react";
import axios from "axios";
import LocationDropdown from "../components/locationDropdown.tsx";

function MedicineRequest() {
  type MedicineReqFields = {
    roomName: string;
    staffMemberName: string;
    patientName: string;
    medicineName: string;
    dosage: string;
    dateOfDelivery: string;
  };

  // State for form responses
  const [responses, setResponses] = useState<MedicineReqFields>({
    roomName: "",
    staffMemberName: "",
    patientName: "",
    medicineName: "",
    dosage: "",
    dateOfDelivery: "",
  });

  const [open, setOpen] = useState(false);

  // Room Number 1-20
  //const roomOptions = Array.from({ length: 20 }, (_, i) => `${i + 1}`);

  // Takes in an event object and updates the responses object when a field is changed
  // Updated to handle different event types
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
      roomName: "",
      staffMemberName: "",
      patientName: "",
      medicineName: "",
      dosage: "",
      dateOfDelivery: "",
    });
  }

  // Submits the request
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); // Prevent the default form submit action
    if (
      !responses.roomName ||
      !responses.patientName ||
      !responses.medicineName ||
      !responses.dosage ||
      !responses.dateOfDelivery
    ) {
      alert("All fields must be filled out, except 'Staff Member Name'.");
      return;
    }
    // Post request to server
    await axios.post("/api/medicineRequest", responses, {
      headers: { "Content-Type": "application/json" },
    });

    const confirmation = await axios
      .get("/api/medicineRequest")
      .then((response) => response.data);
    console.log(confirmation);
    setOpen(true);
  }

  // Close submission confirmation dialog and clear form
  function handleSubmitClose() {
    setOpen(false);
    clear();
  }

  function updateName(val: string) {
    setResponses({ ...responses, roomName: val });
  }

  // Your page is everything in this div
  return (
    <div className="justify-center grid h-screen place-items-center">
      <BackgroundPattern />
      <div className="m-auto flex flex-col bg-background rounded-xl px-6 h-fit w-[700px] justify-center py-4">
        <h1 className="my-2 font-header text-primary font-bold text-3xl text-center">
          Medicine Delivery Request
        </h1>
        <form className="flex flex-col gap-4 my-4" onSubmit={handleSubmit}>
          <LocationDropdown
            room={responses.roomName}
            update={updateName}
            label={"Room Name"}
          />
          {/*<FormControl variant="filled" fullWidth>*/}
          {/*  <InputLabel id="roomName-label">Room Name</InputLabel>*/}
          {/*  <Select*/}
          {/*    labelId="roomName-label"*/}
          {/*    id="roomName"*/}
          {/*    value={responses.roomName}*/}
          {/*    onChange={handleResponseChanges}*/}
          {/*    name="roomName"*/}
          {/*    required*/}
          {/*  >*/}
          {/*    {roomOptions.map((room) => (*/}
          {/*      <MenuItem key={room} value={room}>*/}
          {/*        Room {room}*/}
          {/*      </MenuItem>*/}
          {/*    ))}*/}
          {/*  </Select>*/}
          {/*</FormControl>*/}
          <TextField
            onChange={handleResponseChanges}
            value={responses.staffMemberName}
            name="staffMemberName"
            id="staffMemberName"
            variant="filled"
            label="Staff Member Name"
            placeholder="Name"
          />
          <TextField
            onChange={handleResponseChanges}
            value={responses.patientName}
            name="patientName"
            id="patientName"
            variant="filled"
            label="Patient Name"
            placeholder="Name"
            required
          />
          <TextField
            onChange={handleResponseChanges}
            value={responses.medicineName}
            name="medicineName"
            id="medicineName"
            variant="filled"
            label="Medicine Name"
            required
          />
          <TextField
            onChange={handleResponseChanges}
            value={responses.dosage}
            name="dosage"
            id="dosage"
            variant="filled"
            label="Dosage"
            required
          />
          <TextField
            onChange={handleResponseChanges}
            value={responses.dateOfDelivery}
            name="dateOfDelivery"
            id="dateOfDelivery"
            variant="filled"
            label="Date of Delivery"
            type="date"
            InputLabelProps={{ shrink: true }}
            required
          />
          <Button
            type="submit"
            variant="contained"
            size="large"
            sx={{ borderRadius: "30px" }}
          >
            SUBMIT
          </Button>
        </form>
      </div>
      <Dialog open={open} onClose={handleSubmitClose}>
        <DialogTitle>We received your request!</DialogTitle>
        <DialogContent>
          <strong>Here are your responses:</strong>
          <br />
          Room Name: {responses.roomName}
          <br />
          Staff Member Name: {responses.staffMemberName}
          <br />
          Patient Name: {responses.patientName}
          <br />
          Medicine Name: {responses.medicineName}
          <br />
          Dosage: {responses.dosage}
          <br />
          Date of Delivery: {responses.dateOfDelivery}
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

export default MedicineRequest;
