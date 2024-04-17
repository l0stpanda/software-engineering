import React, { useEffect, useRef } from "react";
import { Button, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useState } from "react";
import BackgroundPattern from "../components/backgroundPattern.tsx";
import { Graph } from "../objects/Graph.ts";
import lowerLevel1 from "../assets/00_thelowerlevel1.png";
import lowerLevel2 from "../assets/00_thelowerlevel2.png";
import floor1 from "../assets/01_thefirstfloor.png";
import floor2 from "../assets/02_thesecondfloor.png";
import floor3 from "../assets/03_thethirdfloor.png";
import EditMapViewGraph from "../components/EditMapViewGraph.tsx";
import { MapNode } from "../objects/MapNode.ts";
import {
  TransformComponent,
  TransformWrapper,
  useControls,
} from "react-zoom-pan-pinch";
// import {ZoomPanPinch} from "react-zoom-pan-pinch/dist/src/core/instance.core";
// import CanvasMap from "../components/CanvasMap.tsx";

function EditMap() {
  const divRef = useRef<HTMLDivElement>(null);
  const [divDimensions, setDivDimensions] = useState({ width: 0, height: 0 });
  const [graph, setGraph] = useState(new Graph());
  const [imgState, setImgState] = useState<string>(lowerLevel1);
  const [clicked, setClicked] = useState<MapNode | undefined>(undefined);
  const [mode, setMode] = useState<string | undefined>(undefined);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [nodeId, setNodeId] = useState("");
  const [longName, setLongName] = useState("");
  const [isMoveable, setIsMoveable] = useState(false);

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

  //Updates the graph when it has been received from the database
  useEffect(() => {
    const tempGraph = new Graph();
    tempGraph.loadGraph().then(() => {
      setGraph(tempGraph);
    });
  }, []);

  function FloorMapButtons() {
    return (
      <div className="h-fit my-auto ml-3 bg-secondary">
        <ToggleButtonGroup
          orientation="vertical"
          value={imgState}
          exclusive
          onChange={(
            _event: React.MouseEvent<HTMLElement>,
            newFloor: string,
          ) => {
            if (newFloor != null) {
              changeFloor(newFloor);
            }
          }}
          size="large"
          color="secondary"
          fullWidth
        >
          <ToggleButton value={floor3}>
            <strong>3</strong>
          </ToggleButton>
          <ToggleButton value={floor2}>
            <strong>2</strong>
          </ToggleButton>
          <ToggleButton value={floor1}>
            <strong>1</strong>
          </ToggleButton>
          <ToggleButton value={lowerLevel1}>
            <strong>L1</strong>
          </ToggleButton>
          <ToggleButton value={lowerLevel2}>
            <strong>L2</strong>
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
    );
  }

  // // Gets the node information from child
  const handleNodeCallback = (childData: string) => {
    setClicked(graph.getNode(childData));
  };

  const handleEditMode = (newMode: string) => {
    setMode(newMode);
    console.log(mode);
    if (newMode === "add_node") {
      setIsMoveable(false);
    } else if (newMode === "move_node") {
      setIsOpen(false);
      setIsMoveable(true);
    } else if (newMode === "delete_node") {
      setIsOpen(false);
    }
  };

  const handlePopup = (childData: boolean) => {
    if (mode === "add_node") {
      setIsOpen(childData);
      console.log(isOpen);
    } else {
      setIsOpen(false);
    }
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log("Node id: ", nodeId);
    console.log("Long name: ", longName);
  };

  let divPos: number[] = [];
  if (divRef.current) {
    divPos = [divRef.current.offsetTop, divRef.current.offsetLeft];
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
        <div className="flex flex-row w-2/3">
          {/*Map Image Box*/}
          <div
            ref={divRef}
            className="
        h-full
        flex-grow
        ml-1
        border-primary
        border-2"
          >
            <TransformWrapper disabled={isMoveable}>
              <Controls />
              <TransformComponent>
                <EditMapViewGraph
                  imageSrc={imgState}
                  graph={graph}
                  divDim={divDimensions}
                  divPos={divPos}
                  nodeInfoCallback={handleNodeCallback}
                  popupCallback={handlePopup}
                  mode={mode}
                />
              </TransformComponent>
            </TransformWrapper>
          </div>
          {/*Buttons for displaying floor images*/}
          <FloorMapButtons />
          {/*Form for adding a new node*/}
          {isOpen && (
            <div
              className="mr-8
                    ml-5
                    px-0
                    flex
                    flex-col
                    items-center
                    bg-background
                    rounded-xl
                    border-primary
                    border-2"
            >
              <form
                onSubmit={handleSubmit}
                className="flex flex-col items-center"
              >
                {/* Node ID input field */}
                <label>
                  Node ID:
                  <input
                    type="text"
                    value={nodeId}
                    onChange={(e) => setNodeId(e.target.value)}
                    className="m-2 p-2 border-primary border-2 rounded-md"
                    required
                  />
                </label>
                {/* Long Name input field */}
                <label>
                  Long Name:
                  <input
                    type="text"
                    value={longName}
                    onChange={(e) => setLongName(e.target.value)}
                    className="m-2 p-2 border-primary border-2 rounded-md"
                    required
                  />
                </label>
                {/* Submit button */}
                <button
                  type="submit"
                  className="m-2 p-2 bg-primary text-white rounded-md"
                >
                  Submit
                </button>
              </form>
            </div>
          )}
        </div>

        {/*boxes.*/}
        <div
          className="flex flex-col
                w-1/4"
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
            {clicked?.getNodeID()}
            <br />
            {clicked?.getLongName()}
            <br />
            {clicked?.getFloor()}
            <br />
            {clicked?.getNodeType()}
            <br />
          </div>

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
              onClick={() => handleEditMode("add_node")}
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
              onClick={() => handleEditMode("delete_node")}
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
              onClick={() => handleEditMode("move_node")}
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
              onClick={() => handleEditMode("add_edge")}
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
              onClick={() => handleEditMode("delete_edge")}
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
