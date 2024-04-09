//import { Edge, InputNode } from "./FloorMap.tsx";
import { useEffect, useRef, useState } from "react";
import { Graph } from "../objects/Graph.ts";
import { BFS } from "../objects/BFS.ts";
import { MapNode } from "../objects/MapNode.ts";

//import mapImg from "../assets/00_thelowerlevel1.png";

interface FloorNodesProps {
  imageSrc: string;
  graph: Graph;
  inputLoc: string[];
  divDim: { width: number; height: number };
}

export interface FloorNodeInfo {
  key: string;
  x: number;
  y: number;
  floor: string;
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
  const [clicked, setClicked] = useState<string[]>([]);
  const bfs = new BFS(props.graph);
  const floor: string = getFloorByImage(props.imageSrc);
  const nodes: MapNode[] = Object.values(props.graph)[0];
  const [ids, setIds] = useState<{
    startId: string | undefined;
    endId: string | undefined;
  }>({
    startId: props.graph.idFromName(props.inputLoc[0]),
    endId: props.graph.idFromName(props.inputLoc[1]),
  });

  useEffect(() => {
    setIds({
      startId: props.graph.idFromName(props.inputLoc[0]),
      endId: props.graph.idFromName(props.inputLoc[1]),
    });
  }, [props.graph, props.inputLoc]);

  useEffect(() => {
    if (divRef.current) {
      const { clientWidth, clientHeight } = divRef.current;
      setDivDimensions({ width: clientWidth, height: clientHeight });
    }
  }, [divRef]);

  useEffect(() => {
    const img = new Image();
    img.src = props.imageSrc;
    img.onload = () => {
      setImgDimensions({ width: img.width, height: img.height });
    };
  }, [props.imageSrc]);

  useEffect(() => {
    const handleResize = () => {
      if (divRef.current) {
        const { clientWidth, clientHeight } = divRef.current;
        setDivDimensions({ width: clientWidth, height: clientHeight });
      }
    };

    // Listen for resize events on the window
    window.addEventListener("resize", handleResize);

    // Initial call to set dimensions
    handleResize();

    // Cleanup function to remove the resize event listener
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNodeClick = (nodeid: string) => () => {
    if (clicked.length < 2 && !clicked.includes(nodeid)) {
      setClicked((prevClicked) => [...prevClicked, nodeid]);
      //set the start node to green
    }
    if (clicked.length == 2) {
      setClicked([nodeid]);
    }
    setIds({ startId: undefined, endId: undefined });
  };

  const calculateInput = (): string[] => {
    let input: string[] = [];

    if (
      props.inputLoc.length === 2 &&
      ids.startId !== undefined &&
      ids.endId !== undefined
    ) {
      input = [ids.startId, ids.endId];
    } else if (clicked.length === 2) {
      input = [clicked[0], clicked[1]];
    } else {
      console.log("Invalid IDs.");
    }

    return input;
  };

  const renderLines = () => {
    const input = calculateInput();

    if (input.length == 2) {
      console.log(ids.startId, ids.endId);
      const path = bfs.findPath(input[0], input[1]);
      console.log(path);
      const lines = [];
      if (!path) {
        console.log("No path found");
        return [];
      }
      for (let i = 0; i < path.length - 1; i++) {
        const startNode = path[i];
        const endNode = path[i + 1];
        const startPoint = scaledNodes[startNode];
        const endPoint = scaledNodes[endNode];
        if (
          startPoint &&
          endPoint &&
          startPoint.floor == floor &&
          endPoint.floor == floor
        ) {
          lines.push(
            <line
              key={i}
              x1={startPoint.x}
              y1={startPoint.y}
              x2={endPoint.x}
              y2={endPoint.y}
              style={{ stroke: "green", strokeWidth: 2 }}
              className="animate-pulse"
            />,
          );
        }
      }
      console.log(lines);
      return lines;
    }
    return [];
  };

  const scaledNodes: { [key: string]: FloorNodeInfo } = {};
  nodes.forEach((node) => {
    const id: string = node.getNodeID();
    scaledNodes[id] = {
      key: node.getNodeID(),
      x: node.getX() * (divDimensions.width / imgDimensions.width),
      y: node.getY() * (divDimensions.height / imgDimensions.height),
      floor: node.getFloor(),
    };
  });

  const renderNodes = () => {
    return Object.values(scaledNodes)
      .filter((node) => node.floor == floor)
      .map((node, id) => {
        let nodeColor: string;
        let animation: string = "border border-slate-300 hover:border-red-400";
        const input = calculateInput();

        //console.log(node.key, ids.startId, ids.endId);
        //if start node
        if (node.key == input[0]) {
          nodeColor = "#39FF14";
          animation = animation.concat(" animate-bounce -m-[2.8px]");
        }
        //if end node
        else if (node.key == input[1]) {
          nodeColor = "red";
          animation = animation.concat(" animate-bounce -m-[2.8px]");
        }
        //neither
        else {
          nodeColor = "#009BA8";
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

  return (
    <div ref={divRef} style={{ position: "relative" }}>
      <img src={props.imageSrc} className="object-contain h-full" alt="Map" />
      <svg
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      >
        {renderLines()}
      </svg>
      {renderNodes()}
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
  } else {
    return numbers as unknown as string;
  }
}

export default FloorNode;
