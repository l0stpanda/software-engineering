import React from "react";
//import mapImg from "../assets/LL1Map.png";
import { Button, TextField } from "@mui/material";
import {
  TransformWrapper,
  TransformComponent,
  useControls,
} from "react-zoom-pan-pinch";
import FloorMap from "../components/FloorMap";
import { useState } from "react";

function Map() {
  const Controls = () => {
    const { zoomIn, zoomOut } = useControls();
    return (
      <div className="absolute pt-10 px-3 z-10 flex flex-col gap-2">
        <Button
          onClick={() => zoomIn()}
          type="button"
          id="zoomInBut"
          variant="contained"
          className="zoomInBut"
          size="medium"
          sx={{ borderRadius: "30px", fontSize: "22px", font: "header" }}
        >
          +
        </Button>

        <Button
          onClick={() => zoomOut()}
          type="button"
          id="zoomOutBut"
          variant="contained"
          className="zoomOutBut"
          size="medium"
          sx={{ borderRadius: "30px", fontSize: "22px", font: "header" }}
        >
          -
        </Button>
      </div>
    );
  };

  const [navigatingNodes, setNavigatingNodes] = useState({
    start: "",
    end: "",
  });
  const [submitValues, setSubmitValues] = useState(["", ""]);

  // Carter's function code bc idk how to do it
  function handleFormChanges(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setNavigatingNodes({ ...navigatingNodes, [name]: value });
  }

  function handleFormSubmit() {
    setSubmitValues([navigatingNodes.start, navigatingNodes.end]);
  }

  return (
    <div>
      {/*Location and Destination things*/}
      <div
        className="my-8
                   mx-auto
                   flex
                   flex-row-reverse
                   min-h-screen
                   max-w-screen-2xl"
      >
        {/*Map Image Box*/}
        <div
          className="w-2/3
        h-2/3
        flex-grow
        ml-1
        border-primary
        border-2"
        >
          <TransformWrapper>
            <Controls />
            <TransformComponent>
              <FloorMap inputLocations={[submitValues[0], submitValues[1]]} />
            </TransformComponent>
          </TransformWrapper>
        </div>

        {/*boxes.*/}
        <div
          className="flex flex-col
                w-1/4
                mt-10"
        >
          <div
            className="mr-8
                    ml-5
                    py-5
                    px-0
                    flex
                    flex-col
                    items-center
                    bg-background
                    rounded-xl
                    border-primary
                    border-2"
          >
            <div className="flex flex-col justify-center">
              <h2 className="text-primary font-header pb-4">
                Where would you like to go?
              </h2>
              <TextField
                id="outlined-basic"
                variant="outlined"
                label="Location"
                name="start"
                value={navigatingNodes.start}
                onChange={handleFormChanges}
                sx={{
                  input: {
                    color: "primary",
                    background: "background",
                  },
                }}
              />
              <TextField
                id="outlined-basic"
                variant="outlined"
                label="Destination"
                value={navigatingNodes.end}
                name="end"
                onChange={handleFormChanges}
                sx={{
                  input: {
                    color: "primary",
                    background: "background",
                  },
                }}
                margin="normal"
              />
              <Button
                type="button"
                variant="contained"
                className="submitButton"
                size="medium"
                onClick={handleFormSubmit}
                sx={{ borderRadius: "30px" }}
              >
                Submit
              </Button>
            </div>
          </div>
          {/*second non-functional box for rn*/}
          <div
            className="mr-8
                        ml-5
                        mt-2
                        h-2/5
                        px-0
                        bg-secondary
                        rounded-xl"
          >
            <p
              className="pr-1.5
              pl-1.5
              pt-1.5
              pb-1.5
              text-primary
              font-header"
            >
              This is just a place holder for right now. Written directions are
              not functional yet.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Map;
