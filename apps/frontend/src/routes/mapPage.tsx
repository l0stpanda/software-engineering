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
import BackgroundPattern from "../components/backgroundPattern.tsx";
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
import StraightIcon from "@mui/icons-material/Straight";
import TurnLeftIcon from "@mui/icons-material/TurnLeft";
import TurnRightIcon from "@mui/icons-material/TurnRight";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { useAuth0 } from "@auth0/auth0-react";
// import * as console from "console";
import { directionInfo, getDirections } from "../objects/Pathfinding.ts";
import { JSX } from "react/jsx-runtime";
import axios from "axios";
type userInfo = {
  user_id: string | undefined;
  email: string | undefined;
  username: string | undefined;
  role: string | undefined;
};

function Map() {
  const divRef = useRef<HTMLDivElement>(null);
  const [divDimensions, setDivDimensions] = useState({ width: 0, height: 0 });
  const [graph, setGraph] = useState(new Graph());
  const [update, setUpdate] = useState(0);
  const [imgState, setImgState] = useState<string>(floor1);
  const [algorithm, setAlgorithm] = useState<string>("AStar");
  const [directions, setDirections] = useState<directionInfo[]>([]);
  const [path, setPath] = useState<string[]>([]);

  const { user, getAccessTokenSilently } = useAuth0();

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
    // console.log(cleanStart, cleanEnd);
    setSubmitValues([cleanStart, cleanEnd]);
  }

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
      // console.log("STUFF IS HAPPENING");
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
      //console.log(update);
    });
  }, [update]);

  useEffect(() => {
    setDirections(getDirections(path, graph));
  }, [path, graph]);

  const changeAlgorithm = (event: SelectChangeEvent) => {
    setAlgorithm(event.target.value as string);
  };

  // Test for showing directions
  function showDirections() {
    const output: JSX.Element[] = [];
    directions.forEach((data: directionInfo) => {
      output.push(
        <div className="border-primary border-t border-b text-text font-header px-1 py-1">
          <b>Floor {data.floor}: </b>
        </div>,
      );
      for (let i = 0; i < data.directions.length; i++) {
        if (data.directions[i] == "Continue straight at ") {
          if (i + 1 == data.directions.length) {
            output.push(
              <>
                <div className="flex text-text font-body px-1 py-2">
                  <div className="float-left content-center">
                    <StraightIcon sx={{ fontSize: 40 }}></StraightIcon>
                  </div>
                  <div className="flex text-center self-center">
                    {data.directions[i]} {data.nodes[i]}
                  </div>
                </div>
              </>,
            );
          } else {
            output.push(
              <>
                <div className="flex border-primary border-b text-text font-body px-1 py-2">
                  <div className="float-left content-center">
                    <StraightIcon sx={{ fontSize: 40 }}></StraightIcon>
                  </div>
                  <div className="flex text-center self-center">
                    {data.directions[i]} {data.nodes[i]}
                  </div>
                </div>
              </>,
            );
          }
        } else if (data.directions[i] == "Turn left at ") {
          if (i + 1 == data.directions.length) {
            output.push(
              <>
                <div className="flex text-text font-body px-1 py-2">
                  <div className="float-left content-center">
                    <TurnLeftIcon sx={{ fontSize: 40 }}></TurnLeftIcon>
                  </div>
                  <div className="flex text-center self-center">
                    {data.directions[i]} {data.nodes[i]}
                  </div>
                </div>
              </>,
            );
          } else {
            output.push(
              <>
                <div className="flex border-primary border-b text-text font-body px-1 py-2">
                  <div className="float-left content-center">
                    <TurnLeftIcon sx={{ fontSize: 40 }}></TurnLeftIcon>
                  </div>
                  <div className="flex text-center self-center">
                    {data.directions[i]} {data.nodes[i]}
                  </div>
                </div>
              </>,
            );
          }
        } else if (data.directions[i] == "Turn right at ") {
          if (i + 1 == data.directions.length) {
            output.push(
              <>
                <div className="flex text-text font-body px-1 py-2">
                  <div className="float-left content-center">
                    <TurnRightIcon sx={{ fontSize: 40 }}></TurnRightIcon>
                  </div>
                  <div className="flex text-center self-center">
                    {data.directions[i]} {data.nodes[i]}
                  </div>
                </div>
              </>,
            );
          } else {
            output.push(
              <>
                <div className="flex border-primary border-b text-text font-body px-1 py-2">
                  <div className="float-left content-center">
                    <TurnRightIcon sx={{ fontSize: 40 }}></TurnRightIcon>
                  </div>
                  <div className="flex text-center self-center">
                    {data.directions[i]} {data.nodes[i]}
                  </div>
                </div>
              </>,
            );
          }
        } else {
          if (i + 1 == data.directions.length) {
            output.push(
              <>
                <div className="flex text-text font-body px-1 py-2">
                  <div className="float-left content-center">
                    <TrendingUpIcon sx={{ fontSize: 40 }}></TrendingUpIcon>
                  </div>
                  <div className="flex text-center self-center">
                    {data.directions[i]} {data.nodes[i]}
                  </div>
                </div>
              </>,
            );
          } else {
            output.push(
              <>
                <div className="flex border-primary border-b text-text font-body px-1 py-2">
                  <div className="float-left content-center">
                    <TrendingUpIcon sx={{ fontSize: 40 }}></TrendingUpIcon>
                  </div>
                  <div className="flex text-center self-center">
                    {data.directions[i]} {data.nodes[i]}
                  </div>
                </div>
              </>,
            );
          }
        }
      }
      return data;
    });
    return output;
  }

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

  return (
    <div className="flex justify-center">
      <BackgroundPattern />

      {/*Location and Destination things*/}
      <div
        className="my-8
                   justify-center
                   flex
                   flex-row-reverse
                   max-w-screen-2xl"
      >
        <div className="flex flex-row w-[80%]">
          {/*Map Image Box*/}
          <div
            ref={divRef}
            className="
        h-full
        flex-grow
        ml-1"
          >
            <TransformWrapper>
              <div className="border-2 border-primary rounded-xl overflow-clip">
                <Controls />
                <TransformComponent>
                  <FloorNode
                    imageSrc={imgState}
                    graph={graph}
                    inputLoc={[submitValues[0], submitValues[1]]}
                    divDim={divDimensions}
                    algorithm={algorithm}
                    pathRef={path}
                    pathSetter={setPath}
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
          <a href="">
            <Button sx={{ margin: "0 0 1rem 1rem" }} startIcon={<ArrowBack />}>
              Home
            </Button>
          </a>
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
              <div className="inline-flex justify-end items-center my-5">
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
              </div>
              <br />
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
          <br />
          <div className="flex flex-col">
            {user ? (
              <a href="editMap" className="self-center">
                <Button
                  type="button"
                  variant="contained"
                  startIcon={<ModeIcon />}
                  className="editMapBut w-32"
                  size="medium"
                  sx={{
                    borderRadius: "30px",
                    fontSize: "15px",
                    font: "header",
                  }}
                >
                  Edit Map
                </Button>
              </a>
            ) : (
              <></>
            )}
          </div>
          <div
            className="mr-8
                    ml-5
                    my-5
                    h-[177px]
                    items-center
                    bg-background
                    border-primary
                    border-2
                    overflow-clip
                    rounded-lg
                    "
          >
            <div className="overflow-y-auto h-full">{showDirections()}</div>
          </div>
        </div>
      </div>
    </div>

    // </div>
  );
}

export default Map;
