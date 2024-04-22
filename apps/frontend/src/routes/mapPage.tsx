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
} from "react-zoom-pan-pinch";
import { useState } from "react";
//import BackgroundPattern from "../components/backgroundPattern.tsx";
import { Graph } from "../objects/Graph.ts";
import lowerLevel1 from "../assets/00_thelowerlevel1.png";
import lowerLevel2 from "../assets/00_thelowerlevel2.png";
import floor1 from "../assets/01_thefirstfloor.png";
import floor2 from "../assets/02_thesecondfloor.png";
import floor3 from "../assets/03_thethirdfloor.png";

import FloorNode from "../components/FloorNode.tsx";
import { SelectChangeEvent } from "@mui/material/Select";
import { ArrowBack } from "@mui/icons-material";
import LocationDropdown from "../components/locationDropdown.tsx";
import ModeIcon from "@mui/icons-material/Mode";
import { useAuth0 } from "@auth0/auth0-react";
// @ts-ignore
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { userInfo } from "common/src/userInfo.ts";

function Map() {
  const divRef = useRef<HTMLDivElement>(null);
  const [divDimensions, setDivDimensions] = useState({ width: 0, height: 0 });
  const [graph, setGraph] = useState(new Graph());
  const [update, setUpdate] = useState(0);
  const [imgState, setImgState] = useState<string>(floor1);
  const [algorithm, setAlgorithm] = useState<string>("AStar");

  const { getAccessTokenSilently, user } = useAuth0();

  const Controls = () => {
    const { zoomIn, zoomOut } = useControls();
    return (
      <div className="absolute top-20 right-9 z-10 flex flex-col gap-2">
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
  // function handleFormChanges(event: React.ChangeEvent<HTMLInputElement>) {
  //   const { name, value } = event.target;
  //   setNavigatingNodes({ ...navigatingNodes, [name]: value });
  // }

  // Handles changes to the start/end destination boxes
  function handleFormSubmit() {
    const cleanStart = navigatingNodes.start.replace("\r", "");
    const cleanEnd = navigatingNodes.end.replace("\r", "");
    console.log(cleanStart, cleanEnd);
    setSubmitValues([cleanStart, cleanEnd]);
  }

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

  // Since this is the page that all the users are forwared to on login we store the
  useEffect(() => {
    async function sendUser() {
      console.log("STUFF IS HAPPENING");
      const token = await getAccessTokenSilently();
      const send: userInfo = {
        user_id: user?.sub,
        email: user?.email,
        username: user?.preferred_username,
        role: "Random for now",
      };
      await axios.post("/api/userAdding", send, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
    }
    sendUser().then();
  }, [
    getAccessTokenSilently,
    user?.email,
    user?.preferred_username,
    user?.sub,
  ]);

  // Updates the graph when it has been received from the database
  useEffect(() => {
    const tempGraph = new Graph();
    tempGraph.loadGraph().then(() => {
      setGraph(tempGraph);
      setUpdate(1);
      console.log(update);
    });
  }, [update]);

  const changeAlgorithm = (event: SelectChangeEvent) => {
    setAlgorithm(event.target.value as string);
  };

  //Needs to be here for navigation dropdown
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
      <div className="absolute z-10 h-fit my-auto ml-3 bg-primary bottom-7 right-9">
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
          <ToggleButton value={floor3} style={{ color: "white" }}>
            <strong>3</strong>
          </ToggleButton>
          <ToggleButton value={floor2} style={{ color: "white" }}>
            <strong>2</strong>
          </ToggleButton>
          <ToggleButton value={floor1} style={{ color: "white" }}>
            <strong>1</strong>
          </ToggleButton>
          <ToggleButton value={lowerLevel1} style={{ color: "white" }}>
            <strong>L1</strong>
          </ToggleButton>
          <ToggleButton value={lowerLevel2} style={{ color: "white" }}>
            <strong>L2</strong>
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
    );
  }
  const [expanded, setExpanded] = useState(false);
  const isOpen = expanded !== false;
  const Accordion = () => {
    const handleInnerClick = (e: React.MouseEvent<HTMLElement>) => {
      e.stopPropagation();
    };
    return (
      <>
        <motion.header
          initial={false}
          // animate={{ backgroundColor: isOpen ? "#FF0088" : "#0055FF" }}
        />
        <AnimatePresence initial={false}>
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
                className="flex flex-col mr-2 ml-0 py-5 px-5 items-center bg-background rounded-xl border-primary border-2 w-full"
                onClick={handleInnerClick}
              >
                <h2>Select Destination</h2>
                <LocationDropdown
                  room={navigatingNodes.start}
                  update={updateStart}
                  label={"Start"}
                />
                <br />
                <LocationDropdown
                  room={navigatingNodes.end}
                  update={updateEnd}
                  label={"End"}
                />
                <br />
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
                <br />
                <Button
                  type="button"
                  variant="contained"
                  className="submitButton"
                  size="medium"
                  onClick={handleFormSubmit}
                >
                  Submit
                </Button>
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
          className="
                    h-screen
                    w-screen"
        >
          <TransformWrapper disablePadding={true}>
            <div className="">
              {/*Buttons for displaying floor images*/}
              <FloorMapButtons />
              <Controls />
              <TransformComponent>
                <FloorNode
                  imageSrc={imgState}
                  graph={graph}
                  inputLoc={[submitValues[0], submitValues[1]]}
                  divDim={divDimensions}
                  algorithm={algorithm}
                />
              </TransformComponent>
            </div>
          </TransformWrapper>
        </div>
        {/*Location and Destination things*/}
        <div className=""></div>
        {/*boxes.*/}
        <div className="fixed top-20 left-10">
          <a href="">
            <Button
              sx={{ margin: "0 0 1rem 1rem" }}
              startIcon={<ArrowBack />}
              variant="contained"
            >
              Home
            </Button>
          </a>
        </div>
        <div
          className="fixed top-[25%] left-10"
          onClick={() => setExpanded(isOpen ? false : true)}
        >
          <div className="mr-2 ml-0 py-1 px-16 items-center bg-primary rounded-xl border-primary border-2">
            <h2 style={{ color: "white" }}>Navigation</h2>
          </div>
          <Accordion />
        </div>
        <div className="fixed bottom-10 left-10">
          {user ? (
            <a href="editMap" className="justify-center my-2">
              <Button
                type="button"
                variant="contained"
                startIcon={<ModeIcon />}
                className="editMapBut"
                size="medium"
              >
                Edit Map
              </Button>
            </a>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

export default Map;
