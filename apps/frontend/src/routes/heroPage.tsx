import "./heroPage.css";
import mapImg from "../assets/LL1Map.png";
import React, { useState } from "react";
import {
  Button,
  Dialog,
  //    Dialog,
  //    DialogActions,
  //    DialogContent,
  //    DialogTitle,
  // TextField,
} from "@mui/material";
import LoginDialog from "../components/loginDialog.tsx";
//import { useState } from "react";
function HeroPage() {
  const [dialogOpen, setDialogOpen] = useState(false);

  function setLoginOpen() {
    setDialogOpen(true);
  }

  function setLoginClose() {
    setDialogOpen(false);
  }

  return (
    <div className="wholePage">
      <div className="header">
        <h3 className="sHead">Brigham and Women's Hospital</h3>
        <h1 className="bHead">
          Transforming Medicine <br />
          Through Life-giving <br />
          Breakthroughs
        </h1>
      </div>
      <div className="heroSecondCol">
        <button className="touchToStart">
          <a href="map">
            <h1 className="touchStartText">
              <strong>Touch here to view the map</strong>
            </h1>
          </a>
        </button>
        <div className="mapPreviewBox">
          <img src={mapImg} className="mapPreview" alt="Map Preview" />
        </div>
        <div className="loginButtonBox">
          <p className="self-center" style={{ color: "white" }}>
            Staff Member?
          </p>
          <Button
            variant="contained"
            sx={{ borderRadius: "30px" }}
            onClick={setLoginOpen}
            className="self-center"
          >
            Login
          </Button>

          {/*<Dialog open={open} onClose={handleSubmitClose}>*/}
          {/*    <DialogTitle>We received your request!</DialogTitle>*/}
          {/*    <DialogContent>*/}
          {/*        <strong>Here are your responses:</strong>*/}
          {/*        <br />*/}
          {/*        Room Number: {responses.roomNum}*/}
          {/*        <br />*/}
          {/*        Sent By: {responses.senderName}*/}
          {/*        <br />*/}
          {/*        Send To: {responses.sendTo}*/}
          {/*        <br />*/}
          {/*        Note for Patient: {responses.attachedNote}*/}
          {/*    </DialogContent>*/}
          {/*    <DialogActions>*/}
          {/*        <Button onClick={handleSubmitClose} autoFocus>*/}
          {/*            Okay*/}
          {/*        </Button>*/}
          {/*    </DialogActions>*/}
          {/*</Dialog>*/}
        </div>
      </div>
      <Dialog open={dialogOpen} onClose={setLoginClose}>
        <LoginDialog />
      </Dialog>
    </div>
  );
}
export default HeroPage;
