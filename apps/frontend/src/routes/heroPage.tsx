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
    <div className="flex flex-row w-full h-full bg-[url('/src/assets/backImg.png')] bg-cover">
      <div className="flex flex-col text-left w-4/6 h-full justify-center px-8">
        <h3 className="my-3 text-background font-header text-3xl font-bold">
          Brigham and Women's Hospital
        </h3>
        <h1 className="m-0 text-background font-header text-5xl">
          Transforming Medicine <br />
          Through Life-giving <br />
          Breakthroughs
        </h1>
      </div>
      <div className="flex flex-col w-1/3">
        <button className="h-2/5 p-4 bg-primary flex flex-col">
          <a href="map" className="h-full flex flex-col justify-center">
            <h1 className="text-background font-header text-center text-wrap text-4xl">
              <strong>Touch here to view the map</strong>
            </h1>
          </a>
        </button>
        <div className="bg-secondary h-1/2 flex">
          <img
            src={mapImg}
            className="object-cover object-center"
            alt="Map Preview"
          />
        </div>
        <button
          className="bg-primary text-background flex-1 font-body"
          onClick={setLoginOpen}
        >
          <h1>
            Staff Member? <strong>Login Here</strong>
          </h1>
        </button>
      </div>
      <Dialog open={dialogOpen} onClose={setLoginClose}>
        <LoginDialog />
      </Dialog>
    </div>
  );
}
export default HeroPage;
