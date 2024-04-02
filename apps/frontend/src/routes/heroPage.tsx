import React from "react";
import "./heroPage.css";
import { Button } from "@mui/material";
import mapImg from "../assets/LL1Map.png";

export default function heroPage() {
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
          <p style={{ color: "white" }}>Staff Member?</p>
          <Button variant="contained" sx={{ borderRadius: "30px" }}>
            Login
          </Button>
        </div>
      </div>
    </div>
  );
}
