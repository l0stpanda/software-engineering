import React, { useEffect, useRef } from "react";
import { Button, ToggleButton, ToggleButtonGroup } from "@mui/material";
// import { AddIcon, RemoveIcon, EditIcon } from "@mui/icons-material";
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

function EditMap() {
  const divRef = useRef<HTMLDivElement>(null);
  const [divDimensions, setDivDimensions] = useState({ width: 0, height: 0 });
  const [graph, setGraph] = useState(new Graph());
  const [imgState, setImgState] = useState<string>(lowerLevel1);

  // Zoom in/out buttons for map viewing
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

  // Changes the map image
  const changeFloor = (floor: string) => {
    console.log(floor);
    setImgState(floor);
  };

  // Updates div dimensions for scaling of nodes
  useEffect(() => {
    if (divRef.current) {
      const { clientWidth, clientHeight } = divRef.current;
      setDivDimensions({ width: clientWidth, height: clientHeight });
    }
  }, [divRef]);

  // Updates the graph when it has been received from the database
  useEffect(() => {
    const tempGraph = new Graph();
    tempGraph.loadGraph().then(() => {
      setGraph(tempGraph);
    });
  }, []);

  function FloorMapButtons() {
    return (
      <div className="w-2/3 mx-auto mt-3">
        <ToggleButtonGroup
          value={imgState}
          exclusive
          onChange={(
            _event: React.MouseEvent<HTMLElement>,
            newFloor: string,
          ) => {
            changeFloor(newFloor);
          }}
          size="large"
          color="secondary"
          fullWidth
        >
          <ToggleButton value={lowerLevel2}>
            <strong>L2</strong>
          </ToggleButton>
          <ToggleButton value={lowerLevel1}>
            <strong>L1</strong>
          </ToggleButton>
          <ToggleButton value={floor1}>
            <strong>1</strong>
          </ToggleButton>
          <ToggleButton value={floor2}>
            <strong>2</strong>
          </ToggleButton>
          <ToggleButton value={floor3}>
            <strong>3</strong>
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
    );
  }

  return (
    <div>
      <BackgroundPattern />

      {/*Map and Edit Buttons*/}
      <div
        className="my-8
                   justify-center
                   flex
                   flex-row-reverse
                   max-w-screen-2xl"
      >
        <div className="flex flex-col w-2/3">
          {/*Map Image Box*/}
          <div
            ref={divRef}
            className="
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
                  inputLoc={["", ""]}
                  divDim={divDimensions}
                />
              </TransformComponent>
            </TransformWrapper>
          </div>
          {/*Buttons for displaying floor images*/}
          <FloorMapButtons />
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
            <h1
              className="text-primary
              font-header
              font-bold
              text-2xl"
            >
              Node Editing
            </h1>
            <Button
              type="button"
              variant="contained"
              className="addNodeBut"
              size="medium"
              // startIcon={<AddIcon />}
              sx={{
                borderRadius: "25px",
                fontSize: "18px",
                marginTop: "10px",
                minWidth: "165px",
                minHeight: "60px",
                ":focus": {
                  backgroundColor: "#009BA8",
                },
              }}
            >
              Add Node
            </Button>
            <Button
              type="button"
              variant="contained"
              className="deleteNodeBut"
              size="medium"
              // startIcon={<RemoveIcon />}
              sx={{
                borderRadius: "25px",
                fontSize: "18px",
                marginTop: "10px",
                minWidth: "165px",
                minHeight: "60px",
                ":focus": {
                  backgroundColor: "#009BA8",
                },
              }}
            >
              Delete Node
            </Button>
            <Button
              type="button"
              variant="contained"
              className="editNodeBut"
              size="medium"
              // startIcon={<EditIcon />}
              sx={{
                borderRadius: "25px",
                fontSize: "18px",
                marginTop: "10px",
                minWidth: "165px",
                marginBottom: "10px",
                minHeight: "60px",
                ":focus": {
                  backgroundColor: "#009BA8",
                },
              }}
            >
              Move Node
            </Button>
            <h1
              className="text-primary
              font-header
              font-bold
              text-2xl
              pt-5"
            >
              Edge Editing
            </h1>
            <Button
              type="button"
              variant="contained"
              className="addNodeBut"
              size="medium"
              // startIcon={<AddIcon />}
              sx={{
                borderRadius: "25px",
                fontSize: "18px",
                marginTop: "10px",
                minWidth: "165px",
                minHeight: "60px",
                ":focus": {
                  backgroundColor: "#009BA8",
                },
              }}
            >
              Add Edge
            </Button>
            <Button
              type="button"
              variant="contained"
              className="deleteNodeBut"
              size="medium"
              // startIcon={<RemoveIcon />}
              sx={{
                borderRadius: "25px",
                fontSize: "18px",
                marginTop: "10px",
                minWidth: "165px",
                minHeight: "60px",
                ":focus": {
                  backgroundColor: "#009BA8",
                },
              }}
            >
              Delete Edge
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditMap;
