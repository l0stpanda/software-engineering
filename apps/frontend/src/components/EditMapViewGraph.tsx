import { useEffect, useRef, useState } from "react";
import { Graph } from "../objects/Graph.ts";
import { FloorNodeInfo } from "./FloorNode.tsx";
import { MapEdge } from "../objects/MapEdge.ts";
import { useTransformContext } from "react-zoom-pan-pinch";

/*
Functionality:
Add node
- give information about the node


 */

interface EditMapViewGraphProps {
  imageSrc: string;
  graph: Graph;
  divDim: { width: number; height: number };
  divPos: number[];
  nodeInfoCallback: (childData: string) => void;
  popupCallback: (childData: boolean) => void;
  mode: string | undefined;
}

function EditMapViewGraph(props: EditMapViewGraphProps) {
  const context = useTransformContext();

  const [imgDimensions, setImgDimensions] = useState<{
    width: number;
    height: number;
  }>({ width: 0, height: 0 });
  const divRef = useRef<HTMLDivElement | null>(null);
  const [divDimensions, setDivDimensions] = useState({
    width: props.divDim.width,
    height: props.divDim.height,
  });
  const [clicked, setClicked] = useState<string>("");
  const floor: string = getFloorByImage(props.imageSrc);
  const nodes = props.graph.getMap();

  const [worldX, setWorldX] = useState(0);
  const [worldY, setWorldY] = useState(0);

  // const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  // const [mouseLoc, setMouseLoc] = useState({
  //     x: 0,
  //     y: 0
  // });

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
    props.nodeInfoCallback(nodeid);
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

  // function triggered when clicking anywhere in the div
  // const handleNodeCreation = (e: { clientX: number; clientY: number; }) => {
  //     if (props.mode === "add_node" && divRef.current) {
  //         // console.log("mouse: ", e.clientX, e.clientY);
  //         // console.log("zoom :", Object.values(props.zoom)[0]);
  //         // const { offsetLeft, offsetTop } = divRef.current;
  //         // const halfDivX = divDimensions.width / 2;
  //         // const halfDivY = divDimensions.height / 2;
  //         // console.log("divRef: ",clientWidth, clientHeight);
  //         const tempDiv = document.getElementById("tempDiv");
  //         if (tempDiv && divRef.current) {
  //
  //             tempDiv.style.left = e.clientX + "px";
  //             tempDiv.style.top = e.clientY + "px";
  //
  //             console.log("tempDiv: ", tempDiv.style.left, tempDiv.style.top);
  //         }
  //
  //         props.popupCallback(true);
  //     }
  // };

  const handleMouseDown = (e: { clientX: number; clientY: number }) => {
    const tempDiv = document.getElementById("tempDiv");
    if (props.mode === "add_node" && tempDiv && context.bounds) {
      // setAdjX((((e.clientX - divRef.current.offsetLeft - translateX) * divDimensions.width) / divDimensions.width / 2) / scale + (divDimensions.width/2));
      // setAdjY(((e.clientY - divRef.current.offsetTop - translateY) * divDimensions.height / divDimensions.height / 2 ) / scale + (divDimensions.height/2));
      //before zoom
      console.log(context.transformState);
      setWorldX(
        (e.clientX - props.divPos[1] - context.transformState.positionX) /
          context.transformState.scale,
      );
      setWorldY(
        (e.clientY - props.divPos[0] - context.transformState.positionY) /
          context.transformState.scale,
      );

      tempDiv.style.left = worldX + "px";
      tempDiv.style.top = worldY + "px";
    }
  };

  return (
    <>
      <div
        onMouseDown={handleMouseDown}
        ref={divRef}
        style={{ position: "relative" }}
      >
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
        {props.mode === "add_node" && (
          <div
            id="tempDiv"
            className="absolute border border-slate-300"
            style={{
              width: "15px",
              height: "15px",
              backgroundColor: "#009BA8",
              borderRadius: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 999,
            }}
          ></div>
        )}
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
