//import { Edge, InputNode } from "./FloorMap.tsx";
import { useEffect, useRef, useState } from "react";
import { Graph } from "../objects/Graph.ts";
import { BFS } from "../objects/BFS.ts";
//import mapImg from "../assets/LL1Map.png";

interface FloorNodesProps {
  imageSrc: string;
  nodes: string[][];
  edges: string[][];
  graph: Graph;
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

  const scaledNodes: { [key: string]: FloorNodeInfo } = {};
  props.nodes.forEach((node) => {
    scaledNodes[node[0]] = {
      key: node[0],
      x: parseInt(node[1]) * (divDimensions.width / imgDimensions.width),
      y: parseInt(node[2]) * (divDimensions.height / imgDimensions.height),
    };
  });

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
    if (clicked.length == 2) {
      console.log(clicked);
      const bfs = new BFS(props.graph);
      const path = bfs.findPath(clicked[0], clicked[1]);
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
