import React, { useEffect, useRef } from "react";
import { Button, TextField } from "@mui/material";
import {
  TransformWrapper,
  TransformComponent,
  useControls,
} from "react-zoom-pan-pinch";
import { useState } from "react";
import BackgroundPattern from "../components/backgroundPattern.tsx";
import { Graph } from "../objects/Graph.ts";
import lowerLevel1 from "../assets/00_thelowerlevel1.png";
import lowerLevel2 from "../assets/00_thelowerlevel2.png";
import floor1 from "../assets/01_thefirstfloor.png";
import floor2 from "../assets/02_thesecondfloor.png";
import floor3 from "../assets/03_thethirdfloor.png";

import FloorNode from "../components/FloorNode.tsx";

function Map() {
  const divRef = useRef<HTMLDivElement>(null);
  const [divDimensions, setDivDimensions] = useState({ width: 0, height: 0 });
  const [graph, setGraph] = useState(new Graph());

  // Zoom in/out buttons for map viewing
  const [imgState, setImgState] = useState<string>(lowerLevel1);
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

  // Handles changes to the start/end destination boxes
  function handleFormSubmit() {
    const cleanStart = navigatingNodes.start.replace("\r", "");
    const cleanEnd = navigatingNodes.end.replace("\r", "");
    console.log(cleanStart, cleanEnd);
    setSubmitValues([cleanStart, cleanEnd]);
  }

  const changeFloor = (floor: string) => {
    console.log(floor);
    setImgState(floor);
  };

  useEffect(() => {
    if (divRef.current) {
      const { clientWidth, clientHeight } = divRef.current;
      setDivDimensions({ width: clientWidth, height: clientHeight });
    }
  }, [divRef]);

  useEffect(() => {
    const tempGraph = new Graph();
    tempGraph.loadGraph().then(() => {
      setGraph(tempGraph);
    });
  }, []);

  return (
    <div>
      <BackgroundPattern />
      {/*Buttons for displaying floor images*/}
      <div>
        <Button
          type="button"
          variant="contained"
          className="submitButton"
          size="medium"
          onClick={() => {
            changeFloor(lowerLevel2);
          }}
          sx={{ borderRadius: "30px" }}
        >
          L2
        </Button>
        <Button
          type="button"
          variant="contained"
          className="submitButton"
          size="medium"
          onClick={() => {
            changeFloor(lowerLevel1);
          }}
          sx={{ borderRadius: "30px" }}
        >
          L1
        </Button>
        <Button
          type="button"
          variant="contained"
          className="submitButton"
          size="medium"
          onClick={() => {
            changeFloor(floor1);
          }}
          sx={{ borderRadius: "30px" }}
        >
          1
        </Button>
        <Button
          type="button"
          variant="contained"
          className="submitButton"
          size="medium"
          onClick={() => {
            changeFloor(floor2);
          }}
          sx={{ borderRadius: "30px" }}
        >
          2
        </Button>
        <Button
          type="button"
          variant="contained"
          className="submitButton"
          size="medium"
          onClick={() => {
            changeFloor(floor3);
          }}
          sx={{ borderRadius: "30px" }}
        >
          3
        </Button>
      </div>

      {/*Location and Destination things*/}
      <div
        className="my-8
                   mx-auto
                   flex
                   flex-row-reverse
                   max-w-screen-2xl"
      >
        {/*Map Image Box*/}
        <div
          ref={divRef}
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
              <FloorNode
                imageSrc={imgState}
                graph={graph}
                inputLoc={[submitValues[0], submitValues[1]]}
                divDim={divDimensions}
              />
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
