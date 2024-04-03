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
import BackgroundPattern from "../components/backgroundPattern.tsx";

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
    if (
      responses.sendTo == "" ||
      responses.senderName == "" ||
      responses.roomNum == ""
    ) {
      alert("Room Number, Send To, and Sent From must all be filled out");
      return;
    }
    try {
      await axios.post("/api/flowerRequest", responses, {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      alert(
        "Error storing in the database, make sure nodes/edges are uploaded",
      );
      console.error(error);
      return;
    }
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
      <BackgroundPattern />
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
          Room Number: {responses.roomNum}
          <br />
          Sent By: {responses.senderName}
          <br />
          Send To: {responses.sendTo}
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
