import React, { useEffect, useRef } from "react";
import {
  Button,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
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
// import { motion, AnimatePresence } from "framer-motion";
import EditNodeForm from "../components/EditNodeForm.tsx";
import CreateEdgeForm from "../components/CreateEdgeForm.tsx";
import DeleteEdgeForm from "../components/DeleteEdgeForm.tsx";
import DeleteNodeForm from "../components/DeleteNodeForm.tsx";
import { FloorNodeInfo } from "../components/FloorNode.tsx";
// import LocationDropdown from "../components/locationDropdown.tsx";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import PanToolIcon from "@mui/icons-material/PanTool";
import AddRoadIcon from "@mui/icons-material/AddRoad";
import RemoveRoadIcon from "@mui/icons-material/RemoveRoad";

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
      <div className="absolute pt-10 px-3 z-10 flex flex-col gap-2 right-4">
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
      <div className="absolute z-10 h-fit ml-3 bg-primary bottom-20 right-9 rounded-xl border-0">
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
          color="standard"
          fullWidth
        >
          <ToggleButton
            value={floor3}
            style={{ color: "white" }}
            sx={{
              borderRadius: "0.75rem",
              "&.Mui-selected": {
                backgroundColor: "#4497b3",
              },
              "&:hover": {
                backgroundColor: "#4497b3",
                transition: "background-color 0.3s ease-in-out",
              },
            }}
            disabled={imgState === floor3}
          >
            <strong>3</strong>
          </ToggleButton>
          <ToggleButton
            value={floor2}
            style={{ color: "white" }}
            sx={{
              borderRadius: "0.75rem",
              "&.Mui-selected": {
                backgroundColor: "#4497b3",
              },
              "&:hover": {
                backgroundColor: "#4497b3",
                transition: "background-color 0.3s ease-in-out",
              },
            }}
            disabled={imgState === floor2}
          >
            <strong>2</strong>
          </ToggleButton>
          <ToggleButton
            value={floor1}
            style={{ color: "white" }}
            sx={{
              borderRadius: "0.75rem",
              "&.Mui-selected": {
                backgroundColor: "#4497b3",
              },
              "&:hover": {
                backgroundColor: "#4497b3",
                transition: "background-color 0.3s ease-in-out",
              },
            }}
            disabled={imgState === floor1}
          >
            <strong>1</strong>
          </ToggleButton>
          <ToggleButton
            value={lowerLevel1}
            style={{ color: "white" }}
            sx={{
              borderRadius: "0.75rem",
              "&.Mui-selected": {
                backgroundColor: "#4497b3",
              },
              "&:hover": {
                backgroundColor: "#4497b3",
                transition: "background-color 0.3s ease-in-out",
              },
            }}
            disabled={imgState === lowerLevel1}
          >
            <strong>L1</strong>
          </ToggleButton>
          <ToggleButton
            value={lowerLevel2}
            style={{ color: "white" }}
            sx={{
              borderRadius: "0.75rem",
              "&.Mui-selected": {
                backgroundColor: "#4497b3",
              },
              "&:hover": {
                backgroundColor: "#4497b3",
                transition: "background-color 0.3s ease-in-out",
              },
            }}
            disabled={imgState === lowerLevel2}
          >
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
  // const [expanded, setExpanded] = useState(false);
  //
  // const isExpanded = expanded;

  // const AccordionFrame = () => {
  //     const handleInnerClick = (e: React.MouseEvent<HTMLElement>) => {
  //         e.stopPropagation();
  //     };
  //     return (
  //         <>
  //             <motion.header
  //                 initial={false}
  //                 // animate={{ backgroundColor: isExpanded ? "#FF0088" : "#0055FF" }}
  //             />
  //             <AnimatePresence initial={true}>
  //                 {isExpanded && (
  //                     <motion.section
  //                         key="content"
  //                         initial={{ opacity: 0, height: 0 }}
  //                         animate={{ opacity: 1, height: "auto" }}
  //                         exit={{ opacity: 0, height: 0 }}
  //                         variants={{
  //                             open: { opacity: 1, height: "auto" },
  //                             collapsed: { opacity: 0, height: 0 },
  //                         }}
  //                         transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
  //                         className="absolute w-full"
  //                     >
  //                             <div className="" onClick={handleInnerClick}>
  //                                 <div className="mb-20 mt-20 px-10 w-full items-center">
  //                                     <div className="">
  //                                         <ToggleButtonGroup
  //                                             value={mode}
  //                                             exclusive
  //                                             onChange={handleEditMode}
  //                                             orientation="vertical"
  //                                             fullWidth
  //                                             color="primary"
  //                                         >
  //                                             <ToggleButton value="add_node">
  //                                                 <IconButton>
  //                                                     {<AddCircleOutlineIcon/>}
  //                                             </IconButton>
  //                                             </ToggleButton>
  //                                             <ToggleButton value="delete_node"><IconButton>
  //                                                 {<RemoveCircleOutlineIcon/>}
  //                                             </IconButton>
  //                                             </ToggleButton>
  //                                             <ToggleButton value="move_node"><IconButton>
  //                                                 {<PanToolIcon/>}
  //                                             </IconButton>
  //                                             </ToggleButton>
  //                                         </ToggleButtonGroup>
  //                                 </div>
  //                                 <div className="px-10 w-full items-center">
  //                                     <ToggleButtonGroup
  //                                         value={mode}
  //                                         exclusive
  //                                         onChange={handleEditMode}
  //                                         orientation="vertical"
  //                                         fullWidth
  //                                         color="primary"
  //                                     >
  //                                         <h1 className="text-primary font-header font-bold text-2xl pt-5 text-center">
  //                                             Edge Editing
  //                                         </h1>
  //                                         <ToggleButton value="add_edge">
  //                                         <IconButton>
  //                                             {<AddRoadIcon/>}
  //                                             </IconButton>
  //                                         </ToggleButton>
  //                                         <ToggleButton value="delete_edge">
  //                                             <IconButton>
  //                                                 {<RemoveRoadIcon/>}
  //                                             </IconButton>
  //                                         </ToggleButton>
  //                                     </ToggleButtonGroup>
  //                                 </div>
  //                             </div>
  //                         </div>
  //                     </motion.section>
  //                 )}
  //             </AnimatePresence>
  //         </>
  //     );
  // };

  return (
    <div className="">
      <BackgroundPattern />

      {/*Map and Edit Buttons*/}
      <div className="">
        <div className="">
          {/*Map Image Box*/}
          <div
            ref={divRef}
            className="fixed
                    h-screen
                    w-screen"
          >
            <TransformWrapper disabled={isMoveable} disablePadding={true}>
              <div className="">
                <FloorMapButtons />
                <Controls />
                <div className="absolute z-10">
                  {/*Form for adding a new node*/}
                  {isOpen && (
                    <EditNodeForm
                      node={
                        new MapNode("", world.x, world.y, "", "", "", "", "")
                      }
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
                  {openEdgeCreation && (
                    <CreateEdgeForm
                      nodes={edgeNodes}
                      update={update}
                      setUpdate={setUpdate}
                    />
                  )}
                  {openEdgeDeletion && (
                    <DeleteEdgeForm
                      nodes={edgeNodes}
                      update={update}
                      setUpdate={setUpdate}
                    />
                  )}
                </div>
                <TransformComponent
                  wrapperStyle={{
                    width: screen.width,
                    height: "calc(100vh)",
                    position: "fixed",
                  }}
                >
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
            {/*<div*/}
            {/*    className="fixed top-20 left-10"*/}
            {/*    onClick={() => setExpanded(!isExpanded)}*/}
            {/*>*/}
            {/*    <div*/}
            {/*        className="mr-2 ml-0 py-1 px-16 items-center bg-primary rounded-xl border-primary border-2">*/}
            {/*        <h2 className="text-body" style={{color: "white"}}>*/}
            {/*            Edit Menu*/}
            {/*        </h2>*/}
            {/*    </div>*/}
            {/*    <AccordionFrame/>*/}
            {/*</div>*/}
            <div className="flex flex-row w-50 h-50 justify-center py-3">
              <div className="">
                <ToggleButtonGroup
                  value={mode}
                  exclusive
                  onChange={handleEditMode}
                  orientation="horizontal"
                  fullWidth
                  color="primary"
                >
                  <ToggleButton value="add_node">
                    <IconButton>{<AddCircleOutlineIcon />}</IconButton>
                  </ToggleButton>
                  <ToggleButton value="delete_node">
                    <IconButton>{<RemoveCircleOutlineIcon />}</IconButton>
                  </ToggleButton>
                  <ToggleButton value="move_node">
                    <IconButton>{<PanToolIcon />}</IconButton>
                  </ToggleButton>
                </ToggleButtonGroup>
              </div>
              <div className="">
                <ToggleButtonGroup
                  value={mode}
                  exclusive
                  onChange={handleEditMode}
                  orientation="horizontal"
                  fullWidth
                  color="primary"
                >
                  {/*<h1 className="text-primary font-header font-bold text-2xl pt-5 text-center">*/}
                  {/*    Edge Editing*/}
                  {/*</h1>*/}
                  <ToggleButton value="add_edge">
                    <IconButton>{<AddRoadIcon />}</IconButton>
                  </ToggleButton>
                  <ToggleButton value="delete_edge">
                    <IconButton>{<RemoveRoadIcon />}</IconButton>
                  </ToggleButton>
                </ToggleButtonGroup>
              </div>
            </div>
          </div>
          {/*Buttons for displaying floor images*/}
        </div>
        {/*boxes.*/}
      </div>
    </div>
  );
}
export default EditMap;
