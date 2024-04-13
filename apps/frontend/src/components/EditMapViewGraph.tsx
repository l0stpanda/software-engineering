import { useEffect, useRef, useState } from "react";
import { Graph } from "../objects/Graph.ts";
import { FloorNodeInfo } from "./FloorNode.tsx";
import { MapEdge } from "../objects/MapEdge.ts";

/*
Functionality:
Add node
- give information about the node


 */

interface EditMapViewGraphProps {
  imageSrc: string;
  graph: Graph;
  divDim: { width: number; height: number };
  parentCallback: (childData: string) => void;
}

function EditMapViewGraph(props: EditMapViewGraphProps) {
  const [imgDimensions, setImgDimensions] = useState<{
    width: number;
    height: number;
  }>({ width: 0, height: 0 });
  const divRef = useRef(null);
  const [divDimensions, setDivDimensions] = useState({
    width: props.divDim.width,
    height: props.divDim.height,
  });
  const [clicked, setClicked] = useState<string>("");
  const floor: string = getFloorByImage(props.imageSrc);
  const nodes = props.graph.getMap();

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
    const img = new Image();
    img.src = props.imageSrc;
    img.onload = () => {
      setImgDimensions({ width: img.width, height: img.height });
    };
  }, [props.imageSrc]);

  // function triggered when node is clicked
  const handleNodeClick = (nodeid: string) => () => {
    setClicked(nodeid);
    props.parentCallback(nodeid);
    // need to log clicked so it can be used
    console.log(clicked);
  };

  const renderLines = () => {
    const nodeList = props.graph.getNodesByFloor(floor);
    const edgeList: MapEdge[] = [];
    const lines = [];

    for (const node of nodeList) {
      const edges = node.getEdgeList();
      edges.forEach((edge) => {
        if (!edgeList.includes(edge)) {
          edgeList.push(edge);
        }
      });
    }

    for (let i = 0; i < edgeList.length - 1; i++) {
      const startNode = edgeList[i].getNodes()[0].getNodeID();
      const endNode = edgeList[i].getNodes()[1].getNodeID();
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
            style={{ stroke: "blue", strokeWidth: 2 }}
            className="" //"path"
          />,
        );
      }
    }
    console.log(lines);
    return lines;
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
        const nodeColor: string = "#009BA8";
        const animation: string =
          "border border-slate-300 hover:border-red-400";

        //console.log(node.key, ids.startId, ids.endId);
        //if start node
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
    <>
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
    </>
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

export default EditMapViewGraph;
