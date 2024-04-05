import "./heroPage.css";
import mapImg from "../assets/LL1Map.png";
import React, { useState } from "react";
import { Dialog } from "@mui/material";
import LoginDialog from "../components/loginDialog.tsx";

function HeroPage() {
  // Use state for whether login dialog is visible or not
  const [dialogOpen, setDialogOpen] = useState(false);

  // Open login dialog
  function setLoginOpen() {
    setDialogOpen(true);
  }

  // Close login dialog
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
        <button className="loginButtonBox" onClick={setLoginOpen}>
          <h1>Staff Member? Login Here</h1>
        </button>
      </div>
      <Dialog open={dialogOpen} onClose={setLoginClose}>
        <LoginDialog />
      </Dialog>
    </div>
  );
}
export default HeroPage;
