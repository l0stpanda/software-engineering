//import { Edge, InputNode } from "./FloorMap.tsx";
import { useEffect, useRef, useState } from "react";
import { Graph } from "../objects/Graph.ts";
import { BFS } from "../objects/BFS.ts";
import { MapNode } from "../objects/MapNode.ts";
//import mapImg from "../assets/LL1Map.png";

interface FloorNodesProps {
  imageSrc: string;
  graph: Graph;
  inputLoc: string[];
}

export interface FloorNodeInfo {
  key: string;
  x: number;
  y: number;
}

function FloorNode(props: FloorNodesProps) {
  const [imgDimensions, setImgDimensions] = useState<{
    width: number;
    height: number;
  }>({ width: 0, height: 0 });
  const divRef = useRef(null);
  const [divDimensions, setDivDimensions] = useState({ width: 0, height: 0 });
  const [clicked, setClicked] = useState<string[]>([]);
  const bfs = new BFS(props.graph);

  const nodes: MapNode[] = Object.values(props.graph)[0];

  const startId = props.graph.idFromName(props.inputLoc[0]);

  const endId = props.graph.idFromName(props.inputLoc[1]);
  // console.log(startId == "CCONF001L1");
  // console.log(endId == "CRETL001L1");

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

  console.log(nodes);
  const scaledNodes: { [key: string]: FloorNodeInfo } = {};
  nodes.forEach((node) => {
    const id: string = node.getNodeID();
    scaledNodes[id] = {
      key: node.getNodeID(),
      x: node.getX() * (divDimensions.width / imgDimensions.width),
      y: node.getY() * (divDimensions.height / imgDimensions.height),
    };
  });

  console.log(scaledNodes);
  const handleNodeClick = (nodeid: string) => () => {
    if (clicked.length < 2 && !clicked.includes(nodeid)) {
      setClicked((prevClicked) => [...prevClicked, nodeid]);
      console.log(clicked);
    }
    if (clicked.length == 2) {
      setClicked([nodeid]);
    }
  };

  const renderLines = () => {
    let input: string[] = [];
    if (clicked.length == 2) {
      input = [clicked[0], clicked[1]];
    } else if (props.inputLoc.length == 2 && startId && endId) {
      input = [props.inputLoc[0], props.inputLoc[1]];
    }
    if (input.length == 2) {
      console.log(startId, endId);
      const path = bfs.findPath(input[0], input[1]);
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
        if (startPoint && endPoint) {
          lines.push(
            <line
              key={i}
              x1={startPoint.x}
              y1={startPoint.y}
              x2={endPoint.x}
              y2={endPoint.y}
              style={{ stroke: "green", strokeWidth: 2 }}
            />,
          );
        }
      }
      console.log(lines);
      return lines;
    }
    return [];
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
      {Object.values(scaledNodes).map((node, id) => (
        <div
          key={id}
          style={{
            position: "absolute",
            left: node.x + "px",
            top: node.y + "px",
            width: "6px",
            height: "6px",
            backgroundColor: "red",
            borderRadius: "50%",
            transform: "translate(-50%, -50%)",
            cursor: "pointer",
          }}
          onClick={handleNodeClick(node.key)}
        ></div>
      ))}
    </div>
  );
}

export default FloorNode;
