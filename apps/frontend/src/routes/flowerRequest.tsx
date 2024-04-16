import {
  //Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  //FormControl,
  //InputLabel,
  TextField,
} from "@mui/material";
import { FormEvent, useState } from "react";
import axios from "axios";
import BackgroundPattern from "../components/allyBackground.tsx";
import { flowerReqFields } from "common/src/flowerRequest.ts";
import LocationDropdown from "../components/locationDropdown.tsx";
//import {SelectChangeEvent} from "@mui/material/Select";
import { useAuth0 } from "@auth0/auth0-react";

function FlowerRequest() {
  const { getAccessTokenSilently } = useAuth0();

  const initialFormResponses: flowerReqFields = {
    roomNum: "",
    senderName: "",
    sendTo: "",
    attachedNote: "",
  };

  // State for form responses
  const [responses, setResponses] =
    useState<flowerReqFields>(initialFormResponses);

  // State for whether form confirmation dialog is open or closed
  const [open, setOpen] = useState(false);

  // Takes in an event object and updates the responses object when a text field is changed
  function handleResponseChanges(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setResponses({ ...responses, [e.target.name]: e.target.value });
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

  // Handle closing the form confirmation dialog
  function handleSubmitClose() {
    setOpen(false);
    clear();
  }

  function updateRoom(val: string) {
    setResponses({ ...responses, roomNum: val });
  }

  return (
    <div className="justify-center flex flex-grow place-items-center">
      <BackgroundPattern />
      <div className="m-auto flex flex-col bg-background rounded-xl px-10 h-fit w-[700px] justify-center py-4">
        <h1 className="my-2 font-header text-primary font-bold text-3xl text-center">
          Flower Delivery Request
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 my-4">
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
            <div className="flex-row self-center">
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
