import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useState } from "react";

function FlowerRequest() {
  type flowerReqFields = {
    roomNum: string;
    senderName: string;
    attachedNote: string;
  };

  // State for form responses
  const [responses, setResponses] = useState<flowerReqFields>({
    roomNum: "",
    senderName: "",
    attachedNote: "",
  });
  const [open, setOpen] = useState(false);

  // Takes in an event object and updates the responses object when a text field is changed
  function handleResponseChanges(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setResponses({ ...responses, [e.target.name]: e.target.value });
  }

  function clear() {
    setResponses({ roomNum: "", senderName: "", attachedNote: "" });
  }

  // Clears form, and outputs responses
  function handleSubmit() {
    console.log(responses);
    setOpen(true);
  }

  function handleSubmitClose() {
    setOpen(false);
    clear();
  }

  return (
    // Your page is everything in this div
    <div className="bg-repeat bg-[url('./assets/flowerRequestBackground.png')]">
      <div className="justify-center grid h-screen place-items-center">
        <div className="m-auto flex flex-col bg-background rounded-xl px-6 h-fit w-[700px] justify-center py-4">
          <h1 className="my-2 font-header text-primary font-bold text-3xl text-center">
            Flower Delivery Request
          </h1>
          <div className="flex flex-col gap-4 my-4">
            <TextField
              onChange={handleResponseChanges}
              value={responses.roomNum}
              type="number"
              name="roomNum"
              id="roomNum"
              variant="filled"
              label="Room Number"
              required={true}
            />
            <TextField
              onChange={handleResponseChanges}
              value={responses.senderName}
              id="senderName"
              name="senderName"
              variant="filled"
              label="Sent By"
              placeholder="Name"
            />
          </div>
          <TextField
            onChange={handleResponseChanges}
            value={responses.attachedNote}
            id="attachedNote"
            name="attachedNote"
            variant="filled"
            label="Note for Patient"
            multiline={true}
            maxRows={5}
            helperText="Optional"
          />
          <Button
            className="w-32 self-center"
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
        <Dialog open={open} onClose={handleSubmitClose}>
          <DialogTitle>We received your request!</DialogTitle>
          <DialogContent>
            <strong>Here are your responses:</strong>
            <br />
            Room Number: {responses.roomNum}
            <br />
            Sent By: {responses.senderName}
            <br />
            Note for Patient: {responses.attachedNote}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleSubmitClose} autoFocus>
              Okay
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}

export default FlowerRequest;
