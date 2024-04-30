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
import EditNodeForm from "../components/EditNodeForm.tsx";
import CreateEdgeForm from "../components/CreateEdgeForm.tsx";
import DeleteEdgeForm from "../components/DeleteEdgeForm.tsx";
import DeleteNodeForm from "../components/DeleteNodeForm.tsx";
import { FloorNodeInfo } from "../components/FloorNode.tsx";

// import {ZoomPanPinch} from "react-zoom-pan-pinch/dist/src/core/instance.core";
// import CanvasMap from "../components/CanvasMap.tsx";

function EditMap() {
  const divRef = useRef<HTMLDivElement>(null);
  const [divDimensions, setDivDimensions] = useState({ width: 0, height: 0 });
  const [graph, setGraph] = useState(new Graph());
  const [imgState, setImgState] = useState<string>(lowerLevel1);
  const [clicked, setClicked] = useState<MapNode | undefined>(undefined);
  const [mode, setMode] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [world, setWorld] = useState({ x: -2, y: -2 });
  const [openDeleteNode, setOpenDeleteNode] = useState(false);
  const [openEdgeCreation, setEdgeCreationOpen] = useState<boolean>(false);
  const [openEdgeDeletion, setOpenEdgeDeletion] = useState<boolean>(false);
  const [edgeNodes, setEdgeNodes] = useState<MapNode[]>([
    new MapNode("", 0, 0, "", "", "", "", ""),
    new MapNode("", 0, 0, "", "", "", "", ""),
  ]);
  const [isMoveable, setIsMoveable] = useState(false);
  const [sizeFactor, setSizeFactor] = useState<{
    width: number;
    height: number;
  }>({ width: Number.NaN, height: Number.NaN });
  const [scaledNodes, setScaledNodes] = useState<{
    [key: string]: FloorNodeInfo | undefined;
  }>({});
  const [update, setUpdate] = useState(false);

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
    if (openEdgeCreation) {
      const newNode = graph.getNode(childData);
      if (newNode) {
        console.log(
          "Clicked a node while creating an edge" + newNode.getLongName(),
        );
        if (
          edgeNodes[0].getLongName() != "" &&
          edgeNodes[1].getLongName() == ""
        ) {
          const newEdges = [edgeNodes[0], newNode];
          setEdgeNodes(newEdges);
        } else {
          setEdgeNodes([newNode, new MapNode("", 0, 0, "", "", "", "", "")]);
        }
      }
    } else if (openEdgeDeletion) {
      const newNode = graph.getNode(childData);
      if (newNode) {
        console.log(
          "Clicked a node while deleting an edge" + newNode.getLongName(),
        );
        if (
          edgeNodes[0].getLongName() != "" &&
          edgeNodes[1].getLongName() == ""
        ) {
          const newEdges = [edgeNodes[0], newNode];
          setEdgeNodes(newEdges);
        } else {
          setEdgeNodes([newNode, new MapNode("", 0, 0, "", "", "", "", "")]);
        }
      }
    } else if (openDeleteNode) {
      const newNode = graph.getNode(childData);
      if (newNode) {
        setClicked(newNode);

        console.log(
          "Clicked a node while deleting a node" + newNode.getLongName(),
        );
      }
    } else {
      setClicked(graph.getNode(childData));
    }
  };

  const handleEditMode = (
    event: React.MouseEvent<HTMLElement>,
    newMode: string | null,
  ) => {
    setMode(newMode);
    console.log(mode);
    setEdgeCreationOpen(false);
    setOpenEdgeDeletion(false);
    setIsOpen(false);
    setIsMoveable(false);
    setOpenDeleteNode(false);
    setEdgeNodes([
      new MapNode("", 0, 0, "", "", "", "", ""),
      new MapNode("", 0, 0, "", "", "", "", ""),
    ]);
    switch (newMode) {
      case "add_node":
        break;
      case "move_node":
        setIsMoveable(true);
        break;
      case "delete_node":
        setOpenDeleteNode(true);
        break;
      case "add_edge":
        setEdgeCreationOpen(true);
        break;
      case "delete_edge":
        setOpenEdgeDeletion(true);
        break;
      default:
        setIsMoveable(false);
        break;
    }
  };

  const handlePopup = (x_c: number, y_c: number) => {
    if (mode === "add_node") {
      setIsOpen(true);
      setWorld({ x: x_c, y: y_c });
      // console.log(isOpen);
    } else {
      setIsOpen(false);
      setWorld({ x: -1, y: -1 });
    }
  };

  let divPos: number[] = [];
  if (divRef.current) {
    divPos = [divRef.current.offsetTop, divRef.current.offsetLeft];
  }

  return (
    <div className="flex justify-center">
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
        ml-1"
          >
            <TransformWrapper disabled={isMoveable}>
              <div className="border-2 border-primary rounded-xl overflow-clip">
                <Controls />
                <TransformComponent>
                  <EditMapViewGraph
                    imageSrc={imgState}
                    graph={graph}
                    divDim={divDimensions}
                    divPos={divPos}
                    nodeInfoCallback={handleNodeCallback}
                    mouseCallback={handlePopup}
                    mode={mode}
                    scaledNodes={scaledNodes}
                    setScaledNodes={setScaledNodes}
                    setSizeFactor={setSizeFactor}
                    sizeFactor={sizeFactor}
                  />
                </TransformComponent>
              </div>
            </TransformWrapper>
          </div>
          {/*Buttons for displaying floor images*/}
          <FloorMapButtons />
        </div>
        {/*boxes.*/}
        <div
          className="flex flex-col
                w-1/4"
        >
          {/*Form for adding a new node*/}
          {isOpen && (
            <EditNodeForm
              node={new MapNode("", world.x, world.y, "", "", "", "", "")}
              mode={mode}
              graph={graph}
              sizeFactor={sizeFactor}
              scaledNodes={scaledNodes}
              setScaledNodes={setScaledNodes}
            />
          )}
          {clicked && mode !== "add_node" && mode !== "delete_node" && (
            <EditNodeForm
              node={clicked}
              mode={mode}
              graph={graph}
              sizeFactor={sizeFactor}
              scaledNodes={scaledNodes}
              setScaledNodes={setScaledNodes}
            />
          )}
          {mode === "delete_node" && openDeleteNode && (
            <DeleteNodeForm
              node={clicked}
              graph={graph}
              scaledNodes={scaledNodes}
              update={update}
              setUpdate={setUpdate}
            />
          )}
          {/*Form for creating edge*/}
          {openEdgeCreation && <CreateEdgeForm nodes={edgeNodes} />}
          {openEdgeDeletion && <DeleteEdgeForm nodes={edgeNodes} />}

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
            <div className="px-10 w-full">
              <ToggleButtonGroup
                value={mode}
                exclusive
                onChange={handleEditMode}
                orientation="vertical"
                fullWidth
                color="primary"
              >
                <ToggleButton value="add_node">Add Node</ToggleButton>
                <ToggleButton value="delete_node">Delete Node</ToggleButton>
                <ToggleButton value="move_node">Move Node</ToggleButton>
                <h1
                  className="text-primary
              font-header
              font-bold
              text-2xl
              pt-5"
                >
                  Edge Editing
                </h1>
                <ToggleButton value="add_edge">Add Edge</ToggleButton>
                <ToggleButton value="delete_edge">Delete Edge</ToggleButton>
              </ToggleButtonGroup>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default EditMap;
