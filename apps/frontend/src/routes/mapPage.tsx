import React, { useEffect, useRef } from "react";
import {
  ToggleButton,
  ToggleButtonGroup,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import {
  TransformWrapper,
  TransformComponent,
  useControls,
  ReactZoomPanPinchRef,
} from "react-zoom-pan-pinch";
import { useState } from "react";
//import BackgroundPattern from "../components/backgroundPattern.tsx";
import { Graph } from "../objects/Graph.ts";
import lowerLevel1 from "../assets/00_thelowerlevel1.png";
import lowerLevel2 from "../assets/00_thelowerlevel2.png";
import floor1 from "../assets/01_thefirstfloor.png";
import floor2 from "../assets/02_thesecondfloor.png";
import floor3 from "../assets/03_thethirdfloor.png";

import FloorNode, { FloorNodeInfo } from "../components/FloorNode.tsx";
import { SelectChangeEvent } from "@mui/material/Select";
// import { ArrowBack } from "@mui/icons-material";
import LocationDropdown from "../components/locationDropdown.tsx";
import AccordionDirections from "../components/AccordionDirections.tsx";
import ModeIcon from "@mui/icons-material/Mode";
import { useAuth0 } from "@auth0/auth0-react";
import { motion, AnimatePresence } from "framer-motion";
import { userInfo } from "common/src/userInfo.ts";
import { directionInfo, getDirections } from "../objects/Pathfinding.ts";
import { JSX } from "react/jsx-runtime";
import axios from "axios";
import console from "console";
import { GeneralReq } from "./serviceRequests.tsx";

function MapPage() {
  const divRef = useRef<HTMLDivElement>(null);
  const transformRef = useRef<ReactZoomPanPinchRef>(null);
  const [divDimensions, setDivDimensions] = useState({ width: 0, height: 0 });
  const [graph, setGraph] = useState(new Graph());
  const [update, setUpdate] = useState(0);
  const [imgState, setImgState] = useState<string>(floor1);
  const [algorithm, setAlgorithm] = useState<string>("AStar");
  const [pathSize, setPathSize] = useState<number[]>([
    0,
    0,
    Number.POSITIVE_INFINITY,
    Number.POSITIVE_INFINITY,
  ]);
  const [directions, setDirections] = useState<directionInfo[]>([]);
  const [path, setPath] = useState<string[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [navigatingNodes, setNavigatingNodes] = useState({
    start: "",
    end: "",
  });
  const { getAccessTokenSilently, user } = useAuth0();
  const [records, setRecords] = useState<GeneralReq[]>([]);

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
    // console.log(floor);
    setImgState(floor);
  };

  // Updates div dimensions for scaling of nodes
  useEffect(() => {
    if (divRef.current) {
      const { clientWidth, clientHeight } = divRef.current;
      setDivDimensions({ width: clientWidth, height: clientHeight });
    }
  }, [divRef]);

  // Since this is the page that all the users are forwared to on login we store the
  useEffect(() => {
    async function sendUser() {
      const token = await getAccessTokenSilently();
      axios
        .get("/api/adminAccess", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(async () => {
          setIsAdmin(true);
          const send: userInfo = {
            id: user?.sub,
            email: user?.email,
            username: user?.nickname,
            role: "Admin",
          };
          await axios.post("/api/userAdding", send, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });
        })
        .catch(async () => {
          const send: userInfo = {
            id: user?.sub,
            email: user?.email,
            username: user?.nickname,
            role: "Employee",
          };
          await axios.post("/api/userAdding", send, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });
        });
    }
    sendUser().then();

    const fetchData = async () => {
      try {
        const token = await getAccessTokenSilently();
        const response = await axios.get("/api/fetchAll", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRecords(response.data); // Assuming the data is an array of request data
        // setPermRecords(response.data); // Assuming the data is an array of request data
        // console.log(response.data);
      } catch (error) {
        log(400);
        // console.error("Error fetching requests", error);
      }
    };

    fetchData()
      .then()
      .catch((error) => {
        log(error);
        // console.error("Error from fetchData promise:", error);
      });
  }, [getAccessTokenSilently, user?.email, user?.nickname, user?.sub]);

  // Updates the graph when it has been received from the database
  useEffect(() => {
    const tempGraph = new Graph();
    tempGraph.loadGraph().then(() => {
      setGraph(tempGraph);
      setUpdate(1);
      //console.log(update);
    });
  }, [update]);

  useEffect(() => {
    setDirections(getDirections(path, graph));
  }, [path, graph]);

  // Zoom to fit
  useEffect(() => {
    if (transformRef.current) {
      if (
        pathSize.toString() !==
        [0, 0, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY].toString()
      ) {
        const xPadding = divDimensions.width / 20;
        const yPadding = divDimensions.height / 20;
        const width = pathSize[0] - pathSize[2] + xPadding;
        const height = pathSize[1] - pathSize[3] + yPadding;
        const scale = Math.min(
          divDimensions.width / width,
          divDimensions.height / height,
        );

        const xOffset =
          (divDimensions.width - (pathSize[0] - pathSize[2]) * scale) / 2;
        const yOffset =
          (divDimensions.height - (pathSize[1] - pathSize[3]) * scale) / 2;

        log(xOffset);

        transformRef.current.setTransform(
          -(pathSize[2] * scale) + xOffset,
          -(pathSize[3] * scale) + yOffset,
          scale,
        );
      } else {
        transformRef.current.setTransform(0, 0, 1);
      }
    }
  }, [pathSize, divDimensions, imgState]);

  function log(data: number) {
    console.log(data);
  }

  const changeAlgorithm = (event: SelectChangeEvent) => {
    setAlgorithm(event.target.value as string);
  };

  // Test for showing directions
  function showDirections() {
    const output: JSX.Element[] = [];
    directions.forEach((data: directionInfo) => {
      output.push(
        <AccordionDirections data={data} setImgState={changeFloor} />,
      );
    });
    return output;
  }

  //Needs to be here for navigation dropdown
  function updateStartAndEnd(startNode: string, endNode: string) {
    setNavigatingNodes({ start: startNode, end: endNode });
  }

  function updateStart(val: string) {
    // setResponses({ ...responses, roomNum: val });
    setNavigatingNodes({ ...navigatingNodes, start: val });
  }

  function updateEnd(val: string) {
    // setResponses({ ...responses, roomNum: val });
    setNavigatingNodes({ ...navigatingNodes, end: val });
  }

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

  const [expanded, setExpanded] = useState(false);
  const isOpen = expanded;

  const [mode, setMode] = useState<string>("path");
  const [clicked, setClicked] = useState<FloorNodeInfo | undefined>(undefined);
  const [showInfo, setShowInfo] = useState<boolean>(false);

  const handleMode = () => {
    if (mode === "path") {
      setMode("info");
    } else if (mode === "info") {
      setMode("path");
    }
  };

  const handleNodeCallback = (node: FloorNodeInfo) => {
    setClicked(node);
    if (mode === "info") {
      setShowInfo(true);
    }
  };

  const AccordionFrame = () => {
    const handleInnerClick = (e: React.MouseEvent<HTMLElement>) => {
      e.stopPropagation();
    };
    return (
      <>
        <motion.header
          initial={false}
          // animate={{ backgroundColor: isOpen ? "#FF0088" : "#0055FF" }}
        />
        <AnimatePresence initial={true}>
          {isOpen && (
            <motion.section
              key="content"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              variants={{
                open: { opacity: 1, height: "auto" },
                collapsed: { opacity: 0, height: 0 },
              }}
              transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
              className="absolute w-full"
            >
              <div
                className="flex flex-col my-1 mr-2 ml-0 py-2 px-3 items-center bg-background rounded-xl border-primary border-2 w-[97%]"
                onClick={handleInnerClick}
              >
                <h2>Select Destination</h2>
                <LocationDropdown
                  room={navigatingNodes.start}
                  update={updateStart}
                  label={"Start"}
                  className="w-full my-1"
                />
                <LocationDropdown
                  room={navigatingNodes.end}
                  update={updateEnd}
                  label={"End"}
                  className="w-full mb-1"
                />
                <FormControl fullWidth required>
                  <InputLabel id="demo-simple-select-label" variant="filled">
                    Path Algorithm
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={algorithm}
                    label="Algorithm"
                    onChange={changeAlgorithm}
                    variant="filled"
                  >
                    <MenuItem value="BFS">BFS</MenuItem>
                    <MenuItem value="AStar">A-Star</MenuItem>
                    <MenuItem value="DFS">DFS</MenuItem>
                    <MenuItem value="Dijkstra">Dijkstra</MenuItem>
                  </Select>
                </FormControl>
                <button onClick={handleMode}>Change Mode</button>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </>
    );
  };

  return (
    <div className="">
      <div className="">
        {/*Map Image Box*/}
        <div
          ref={divRef}
          className="fixed
                    h-screen
                    w-screen"
        >
          <TransformWrapper disablePadding={true} ref={transformRef}>
            <div className="">
              {/*Buttons for displaying floor images*/}
              <FloorMapButtons />
              <Controls />
              <TransformComponent
                wrapperStyle={{
                  width: screen.width,
                  height: "calc(100vh)",
                  position: "fixed",
                }}
              >
                <FloorNode
                  imageSrc={imgState}
                  graph={graph}
                  inputLoc={{
                    start: graph.idFromName(navigatingNodes.start),
                    end: graph.idFromName(navigatingNodes.end),
                  }}
                  divDim={divDimensions}
                  algorithm={algorithm}
                  setPathSize={setPathSize}
                  pathSize={pathSize}
                  pathRef={path}
                  pathSetter={setPath}
                  updateStartAndEnd={updateStartAndEnd}
                  updateEnd={updateEnd}
                  reqs={records}
                  mode={mode}
                  nodeInfoCallback={handleNodeCallback}
                />
              </TransformComponent>
            </div>
          </TransformWrapper>
        </div>
        {/*Location and Destination things*/}
        <div className=""></div>
        {/*boxes.*/}
        <div
          className="fixed top-20 left-10"
          onClick={() => setExpanded(!isOpen)}
        >
          <div className="mr-2 ml-0 py-1 px-16 items-center bg-primary rounded-xl border-primary border-2">
            <h2 className="text-body" style={{ color: "white" }}>
              Navigation
            </h2>
          </div>
          <AccordionFrame />
        </div>
        <div className="fixed bottom-7 left-10">
          {isAdmin ? (
            <a href="editMap" className="justify-center my-2">
              <Button
                type="button"
                variant="contained"
                startIcon={<ModeIcon />}
                className="editMapBut"
                size="medium"
                sx={{ borderRadius: 4 }}
              >
                Edit Map
              </Button>
            </a>
          ) : (
            <></>
          )}
        </div>
        {clicked && showInfo && (
          <div
            className="bg-red"
            style={{
              zIndex: 999,
              backgroundColor: "red",
            }}
          >
            {clicked.key}
            {clicked.requests.entries()}
          </div>
        )}

        {directions.length != 0 ? (
          <div
            className="
                    h-[250px]
                    w-[300px]
                    items-center
                    bg-background
                    border-primary
                    border-2
                    overflow-clip
                    rounded-lg
                    fixed
                    bottom-7
                    right-32"
          >
            <div className="overflow-y-auto h-full">{showDirections()}</div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default MapPage;
