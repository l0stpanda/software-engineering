import mapImg from "../assets/LL1Map.png";
import React, { useState } from "react";
import {
  Dialog,
  //    Dialog,
  //    DialogActions,
  //    DialogContent,
  //    DialogTitle,
  // TextField,
} from "@mui/material";
import LoginDialog from "../components/loginDialog.tsx";
import BackgroundImage from "../components/backgroundImage.tsx";

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
    <div className="flex flex-row w-full h-full place-items">
      <BackgroundImage />
      <div className="flex flex-col float-left w-[70%] h-full">
        <h3 className="m-0 text-background font-header text-[2rem] float-left pl-24 pt-44">
          Brigham and Women's Hospital
        </h3>
        <h1 className="m-0 text-background font-header text-[3.5rem] float-left pl-24 leading-[100%]">
          Transforming Medicine <br />
          Through Life-giving <br />
          Breakthroughs
        </h1>
      </div>
      <div className=" w-[30%] h-[100%] flex-col">
        <button className="h-[50%] p-[15%] bg-primary flex-row">
          <a href="map">
            <h1 className="text-background font-header text-[2.5rem] text-center pt-0">
              <strong>Touch here to view the map</strong>
            </h1>
          </a>
        </button>
        <div className="bg-[#D3D3D3FF] h-[60%] flex">
          <img src={mapImg} className="object-cover" alt="Map Preview" />
        </div>
        <button
          className="bg-primary h-[10.2%] w-full text-background grow font-body"
          onClick={setLoginOpen}
        >
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
