//import { Edge, InputNode } from "./FloorMap.tsx";
import { useEffect, useRef, useState } from "react";
import { Graph } from "../objects/Graph.ts";
//import { BFS } from "../objects/BFS.ts";
import { MapNode } from "../objects/MapNode.ts";
import { AStar } from "../objects/AStar.ts";
import { Pathfinding } from "../objects/Pathfinding.ts";
import { BFS } from "../objects/BFS.ts";
import { Box } from "@mui/material";
import { DFS } from "../objects/DFS.ts";
import { Dijkstra } from "../objects/Dijkstra.ts";
import { GeneralReq } from "../routes/serviceRequests.tsx";

//import mapImg from "../assets/00_thelowerlevel1.png";

interface FloorNodesProps {
  imageSrc: string;
  graph: Graph;
  inputLoc: { start: string | undefined; end: string | undefined };
  divDim: { width: number; height: number };
  algorithm: string;
  setPathSize: (a: number[]) => void;
  pathSize: number[];
  pathRef: string[];
  pathSetter: (a: string[]) => void;
  updateStartAndEnd: (startNode: string, endNode: string) => void;
  updateEnd: (endNode: string) => void;
  reqs: GeneralReq[];
  mode: string;
  nodeInfoCallback: (node: FloorNodeInfo) => void;
  // getBookings: (longName: string) => void;
}

export interface FloorNodeInfo {
  key: string;
  x: number;
  y: number;
  floor: string;
  type: string;
  requests: GeneralReq[];
}

function FloorNode(props: FloorNodesProps) {
  const [imgDimensions, setImgDimensions] = useState<{
    width: number;
    height: number;
  }>({ width: 0, height: 0 });
  const divRef = useRef(null);
  const [divDimensions, setDivDimensions] = useState({
    width: props.divDim.width,
    height: props.divDim.height,
  });
  const algo: Pathfinding = new Pathfinding(props.graph);
  const floor: string = getFloorByImage(props.imageSrc);
  const nodes: Map<string, MapNode> = Object.values(props.graph)[0];
  const [count, setCount] = useState(0);
  const [clicked, setClicked] = useState<FloorNodeInfo | undefined>(undefined);

  useEffect(() => {
    if (divRef.current) {
      const resizeObserver = new ResizeObserver(() => {
        if (divRef.current) {
          const { clientWidth, clientHeight } = divRef.current;
          setDivDimensions({ width: clientWidth, height: clientHeight });
        }
      });
      resizeObserver.observe(divRef.current);
      return () => resizeObserver.disconnect();
    }
  }, [divRef]);

  useEffect(() => {
    //console.log("In the useeffect: ", props.inputLoc.start);
    // it is updating but and i set count to 1 when i want to place the end but this puts the count to 1 all teh time
    // i want to select the end when the start is defined
  }, [props.inputLoc, props]);

  useEffect(() => {
    const img = new Image();
    img.src = props.imageSrc;
    img.onload = () => {
      setImgDimensions({ width: img.width, height: img.height });
    };
  }, [props.imageSrc]);

  useEffect(() => {
    setCount(0);
  }, [props.mode]);

  const handleNodeClick = (nodeid: string) => () => {
    const res = nodes.get(nodeid);
    if (res !== undefined) {
      const longName: string = res.getLongName();
      if (props.mode === "path") {
        if (props.inputLoc.start !== undefined && count === 0) {
          props.updateStartAndEnd(longName, "");
          setCount(1);
        } else if (count === 0) {
          props.updateStartAndEnd(longName, "");
          setCount(1);
        } else if (count === 1 && props.inputLoc.start !== nodeid) {
          props.updateEnd(longName);
          setCount(0);
        }
      } else {
        setCount(0);
        console.log("Mode is info");

        setClicked(scaledNodes[nodeid]);
        props.nodeInfoCallback(scaledNodes[nodeid]);
        // need to log so it can be used
        console.log(clicked);
        // props.getBookings(longName);
      }
    }
  };

  const renderLines = () => {
    const input = props.inputLoc;
    const size = [0, 0, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY];

    if (input.start !== undefined && input.end !== undefined) {
      if (props.algorithm == "BFS") {
        algo.setPathAlgo(new BFS(props.graph));
      } else if (props.algorithm == "AStar") {
        algo.setPathAlgo(new AStar(props.graph));
      } else if (props.algorithm == "DFS") {
        algo.setPathAlgo(new DFS(props.graph));
      } else if (props.algorithm == "Dijkstra") {
        algo.setPathAlgo(new Dijkstra(props.graph));
      }
      const path = algo.findPath(input.start, input.end);
      const lines = [];
      const floorChanges = [];

      if (!path) {
        return [];
      }

      if (props.pathRef.toString() !== path.toString()) props.pathSetter(path);

      let changeStart: undefined | FloorNodeInfo = undefined;
      for (let i = 0; i < path.length - 1; i++) {
        const startNode = path[i];
        const endNode = path[i + 1];
        const startPoint = scaledNodes[startNode];
        const endPoint = scaledNodes[endNode];

        if (startPoint && endPoint) {
          if (startPoint.floor != endPoint.floor && !changeStart) {
            changeStart = startPoint;
          }
          if (
            changeStart &&
            (startPoint.floor == endPoint.floor || i == path.length - 2)
          ) {
            // Use startPoint.floor for next floor
            // Past
            if (changeStart.floor == floor) {
              floorChanges.push(
                <Box
                  className="z-10 bg-primary m-0 text-background text-center text-[5px] flex-auto p-0.5"
                  sx={{
                    left: changeStart.x - 2 + "px",
                    top: changeStart.y + 4 + "px",
                    borderRadius: 1,
                    position: "absolute",
                  }}
                >
                  To {endPoint.floor}
                </Box>,
              );
            }

            // Use startChange.floor for previous floor
            //Present
            if (endPoint.floor == floor) {
              if (i == path.length - 2) {
                floorChanges.push(
                  <Box
                    className="z-10 bg-primary m-0 text-background text-center text-[5px] flex-auto p-0.5"
                    sx={{
                      left: startPoint.x - 2 + "px",
                      top: startPoint.y + 4 + "px",
                      borderRadius: 1,
                      position: "absolute",
                    }}
                  >
                    From {changeStart.floor}
                  </Box>,
                );
              } else {
                floorChanges.push(
                  <Box
                    className="z-10 bg-primary m-0 text-background text-center text-[5px] flex-auto p-0.5"
                    sx={{
                      left: startPoint.x - 2 + "px",
                      top: startPoint.y + 4 + "px",
                      borderRadius: 1,
                      position: "absolute",
                    }}
                  >
                    From {changeStart.floor}
                  </Box>,
                );
              }
            }
            changeStart = undefined;
          }

          if (startPoint.floor == floor && endPoint.floor == floor) {
            lines.push(
              <line
                key={i}
                x1={startPoint.x}
                y1={startPoint.y}
                x2={endPoint.x}
                y2={endPoint.y}
                style={{ stroke: "blue", strokeWidth: 2 }}
                className="path"
              />,
            );
            // Gets limits of zoom
            //console.log(startPoint);
            if (startPoint.x > size[0]) size[0] = startPoint.x;
            if (startPoint.y > size[1]) size[1] = startPoint.y;
            if (startPoint.x < size[2]) size[2] = startPoint.x;
            if (startPoint.y < size[3]) size[3] = startPoint.y;
            if (endPoint.x > size[0]) size[0] = endPoint.x;
            if (endPoint.y > size[1]) size[1] = endPoint.y;
            if (endPoint.x < size[2]) size[2] = endPoint.x;
            if (endPoint.y < size[3]) size[3] = endPoint.y;
          }
        }
      }
      //console.log(lines);
      //console.log(size.toString());
      if (props.pathSize.toString() !== size.toString()) {
        props.setPathSize(size);
      }
      return [lines, floorChanges];
    }
    return [];
  };

  const getNodeReqs = (nodeid: string) => {
    const ans: GeneralReq[] = [];
    for (let i = 0; i < props.reqs.length; i++) {
      if (props.reqs[i].location == nodeid) {
        ans.push(props.reqs[i]);
      }
    }
    return ans;
  };

  const scaledNodes: { [key: string]: FloorNodeInfo } = {};
  nodes.forEach((node) => {
    const id: string = node.getNodeID();
    scaledNodes[id] = {
      key: node.getNodeID(),
      x: node.getX() * (divDimensions.width / imgDimensions.width),
      y: node.getY() * (divDimensions.height / imgDimensions.height),
      floor: node.getFloor(),
      type: node.getNodeType(),
      requests: getNodeReqs(node.getNodeID()),
    };
  });

  const renderNodes = () => {
    return Object.values(scaledNodes)
      .filter(
        (node) =>
          node.floor == floor && !node.type.toUpperCase().includes("HALL"),
      )
      .map((node, id) => {
        let nodeColor: string;
        let animation: string = "border border-slate-300 hover:border-red-400";
        const input = props.inputLoc;

        //if start node
        if (node.key == input.start) {
          nodeColor = "#39FF14";
          animation = animation.concat(" animate-bounce -m-[2.8px]");
        }
        //if end node
        else if (node.key == input.end) {
          nodeColor = "red";
          animation = animation.concat(" animate-bounce -m-[2.8px]");
        }
        //neither
        else {
          nodeColor = "#009BA8";
          // start and end node === undefined -> no invis
          // start !== undefined and end node === undefined -> no invis
          // start !== undefined and end !== undefined -> invis
          // start is undefined and end is not undefined -> no invis

          if (
            input.end !== undefined &&
            input.start !== undefined &&
            node.type !== "STAI" &&
            node.type !== "ELEV"
          ) {
            animation = animation.concat(" invisible");
          }
        }
        return (
          <div
            key={id}
            style={{
              position: "absolute",
              left: node.x + "px",
              top: node.y + "px",
              width: "6px",
              height: "6px",
              backgroundColor: nodeColor,
              borderRadius: "50%",
              transform: "translate(-50%, -50%)",
              cursor: "pointer",
            }}
            className={animation}
            onClick={handleNodeClick(node.key)}
          ></div>
        );
      });
  };

  const path = renderLines();

  return (
    <div ref={divRef} style={{ position: "relative" }}>
      <img src={props.imageSrc} className="w-screen" alt="Map" />
      <svg
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      >
        {path[0]}
      </svg>
      {renderNodes()}
      {path[1]}
    </div>
  );
}

function getFloorByImage(imgName: string): string {
  // split the image path name by /
  const parts = imgName.split("/");
  // obtain the last part (e.g., 00_thelowerlevel1.png)
  const lastpart = parts[parts.length - 1];
  // split based on underscore
  const splits = lastpart.split("_");
  //take the number
  const numbers = splits[0][1];

  if (numbers == "0") {
    // get only the name without the .png
    const onlyName = splits[1].slice(0, -4);
    if (
      onlyName.includes("thegroundfloor") ||
      onlyName.includes("thelowerlevel1")
    ) {
      return "L1";
    } else {
      return "L2";
    }
  }
  return numbers as unknown as string;
}

export default FloorNode;
