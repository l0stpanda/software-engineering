import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

import BackgroundPattern from "../components/backgroundPattern.tsx";
import { lostAndFound } from "common/src/lostAndFoundType.ts";
import LocationDropdown from "./locationDropdown.tsx";

function LostFound() {
  const initialFormResponses: lostAndFound = {
    name: "",
    date: "",
    objectDesc: "",
    location: "",
  };

  const [responses, setResponses] =
    useState<lostAndFound>(initialFormResponses);

  const [open, setOpen] = useState(false);

  function handleResponseChanges(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setResponses({ ...responses, [e.target.name]: e.target.value });
  }

  function handleSubmit() {
    if (
      responses.name == "" ||
      responses.date == "" ||
      responses.objectDesc == "" ||
      responses.location == ""
    ) {
      alert(
        "Name, Date, Object Description and Location must all be filled out",
      );
      return;
    }

    setOpen(true);
    // try {
    //     // Make post request to backend with form response data
    //     await axios.post("/api/flowerRequest", responses, {
    //         headers: { "Content-Type": "application/json" },
    //     });
    // } catch (error) {
    //     alert(
    //         "Error storing in the database, make sure nodes/edges are uploaded",
    //     );
    //     console.error(error);
    //     return;
    // }
  }

  // function handleDropDown(e: SelectChangeEvent) {
  //   setResponses({ ...responses, [e.target.name]: e.target.value });
  // }

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

  return (
    <div className="justify-center grid h-screen place-items-center">
      <BackgroundPattern />
      <div className="m-auto flex flex-col bg-background rounded-xl px-6 h-fit w-[700px] justify-center py-4">
        <h1 className="my-2 font-header text-primary font-bold text-3xl text-center">
          Lost and Found Request
        </h1>
        <div className="flex flex-col gap-4 my-4">
          <TextField
            onChange={handleResponseChanges}
            value={responses.name}
            name="name"
            id="name"
            variant="filled"
            label="Name of Finder"
            required={true}
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
            required={true}
          />

          <TextField
            onChange={handleResponseChanges}
            value={responses.objectDesc}
            id="object"
            name="objectDesc"
            variant="filled"
            label="Object Description"
            placeholder=""
            required={true}
          />

          <LocationDropdown
            room={responses.location}
            update={updateLoc}
            label={"Location"}
          />
          {/*<FormControl>*/}
          {/*  <InputLabel>Location</InputLabel>*/}
          {/*  <Select*/}
          {/*    name="location"*/}
          {/*    required={true}*/}
          {/*    label="Location"*/}
          {/*    onChange={handleDropDown}*/}
          {/*    value={responses.location}*/}
          {/*  >*/}
          {/*    <MenuItem value={"random"}>Random Location</MenuItem>*/}
          {/*  </Select>*/}
          {/*</FormControl>*/}

          <Button
            className="w-32 self-center pt-10"
            onClick={handleSubmit}
            type="submit"
            id="requestSubmit"
            variant="contained"
            size="large"
            sx={{ borderRadius: "30px" }}
          >
            SUBMIT
          </Button>
        </div>
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
    </div>
    //</div>
  );
}

export default LostFound;
