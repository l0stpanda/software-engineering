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
import axios from "axios";

function FlowerRequest() {
  type flowerReqFields = {
    roomNum: string;
    senderName: string;
    sendTo: string;
    attachedNote: string;
  };

  // State for form responses
  const [responses, setResponses] = useState<flowerReqFields>({
    roomNum: "",
    senderName: "",
    sendTo: "",
    attachedNote: "",
  });

  const [open, setOpen] = useState(false);

  // Takes in an event object and updates the responses object when a text field is changed
  function handleResponseChanges(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setResponses({ ...responses, [e.target.name]: e.target.value });
  }

  function clear() {
    setResponses({ roomNum: "", senderName: "", attachedNote: "", sendTo: "" });
  }

  // Clears form, and outputs responses
  async function handleSubmit() {
    await axios.post("/api/flowerRequest", responses, {
      headers: { "Content-Type": "application/json" },
    });
    setOpen(true);
  }

  function handleSubmitClose() {
    setOpen(false);
    clear();
  }

  return (
    // Your page is everything in this div
    //<div className="bg-repeat bg-[url('./assets/flowerRequestBackground.png')]">
    <div className="justify-center grid h-screen place-items-center">
      <div className="m-auto flex flex-col bg-background rounded-xl px-6 h-fit w-[700px] justify-center py-4">
        <h1 className="my-2 font-header text-primary font-bold text-3xl text-center">
          Flower Delivery Request
        </h1>
        <div className="flex flex-col gap-4 my-4">
          <TextField
            onChange={handleResponseChanges}
            value={responses.roomNum}
            name="roomNum"
            id="roomNum"
            variant="filled"
            label="Room Name"
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
          <TextField
            onChange={handleResponseChanges}
            value={responses.sendTo}
            id="sendTo"
            name="sendTo"
            variant="filled"
            label="sendTo"
            placeholder="sendTo"
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
    //</div>
  );
}

export default FlowerRequest;
