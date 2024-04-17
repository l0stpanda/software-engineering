import { useCallback, useEffect, useRef, useState } from "react";
import { Graph } from "../objects/Graph.ts";
import { FloorNodeInfo } from "./FloorNode.tsx";
import { MapEdge } from "../objects/MapEdge.ts";
import { useDrag, useDrop } from "react-dnd";
import type { XYCoord } from "react-dnd";
import { DragItem } from "../objects/DragItem.ts";
import { useTransformContext } from "react-zoom-pan-pinch";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

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
  mode: string | null;
}

function EditMapViewGraph(props: EditMapViewGraphProps) {
  const context = useTransformContext();
  const { getAccessTokenSilently } = useAuth0();
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

  // Will be changed soon
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [draggable, setDraggable] = useState<boolean>(true);

  const [worldX, setWorldX] = useState(0);
  const [worldY, setWorldY] = useState(0);

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

  const [scaledNodes, setScaledNodes] = useState<{
    [key: string]: FloorNodeInfo;
  }>({});

  useEffect(() => {
    const tempNodePosList: { [key: string]: FloorNodeInfo } = {};
    nodes.forEach((node) => {
      const id: string = node.getNodeID();
      tempNodePosList[id] = {
        key: node.getNodeID(),
        x: node.getX() * (divDimensions.width / imgDimensions.width),
        y: node.getY() * (divDimensions.height / imgDimensions.height),
        floor: node.getFloor(),
      };
    });
    setScaledNodes(tempNodePosList);
  }, [divDimensions, nodes, imgDimensions]);

  const moveBox = useCallback(
    async (id: string, left: number, top: number) => {
      console.log("time to move a box!");
      const oldNodePos = scaledNodes[id];
      oldNodePos.x = left;
      oldNodePos.y = top;
      const newPosX = left * (imgDimensions.width / divDimensions.width);
      const newPosY = top * (imgDimensions.width / divDimensions.height);
      console.log(newPosX + " " + newPosY);
      // Axios call here
      const token = await getAccessTokenSilently();
      axios
        .post(
          "/api/editMap/editNode",
          { node_id: id, x: newPosX, y: newPosY },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          },
        )
        .then();
      setScaledNodes({ ...scaledNodes, [id]: oldNodePos });
    },
    [
      divDimensions.height,
      divDimensions.width,
      getAccessTokenSilently,
      imgDimensions.width,
      scaledNodes,
    ],
  );

  const [, drop] = useDrop(
    () => ({
      accept: "Node",
      drop(item: DragItem, monitor) {
        const delta = monitor.getDifferenceFromInitialOffset() as XYCoord;
        const left = Math.round(
          item.x + delta.x / context.transformState.scale,
        );
        const top = Math.round(item.y + delta.y / context.transformState.scale);
        moveBox(item.id, left, top);
        return undefined;
      },
    }),
    [moveBox],
  );

  // function triggered when node is clicked
  const handleNodeClick = (nodeid: string) => () => {
    setClicked(nodeid);
    props.nodeInfoCallback(nodeid);
    // need to log clicked so it can be used
    console.log(clicked);
    if (props.mode === "add_mode") {
      props.popupCallback(true);
    }
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

  function EditableNode(props: { nodeKey: string }) {
    const nodeColor: string = "#009BA8";
    const animation: string = "border border-slate-300";
    // const input = calculateInput();

    const id = props.nodeKey;
    const { x, y } = scaledNodes[id];

    const [{ isDragging }, drag] = useDrag(
      () => ({
        type: "Node",
        item: { id, x, y },
        canDrag: draggable,
        collect: (monitor) => ({
          isDragging: monitor.isDragging(),
        }),
      }),
      [id, draggable],
    );

    if (isDragging) {
      return <div ref={drag} />;
    }

    return (
      <div
        key={props.nodeKey}
        id={id}
        style={{
          position: "absolute",
          left: x + "px",
          top: y + "px",
          width: "6px",
          height: "6px",
          backgroundColor: nodeColor,
          borderRadius: "50%",
          transform: "translate(-50%, -50%)",
          cursor: "pointer",
        }}
        className={animation}
        onClick={handleNodeClick(props.nodeKey)}
        ref={drag}
      ></div>
    );
  }

  const renderNodes = () => {
    return Object.values(scaledNodes)
      .filter((node) => node.floor == floor)
      .map((node) => <EditableNode nodeKey={node.key} />);
  };

  const handleMouseDown = (e: { clientX: number; clientY: number }) => {
    const tempDiv = document.getElementById("tempDiv");
    if (props.mode === "add_node" && tempDiv && context.bounds) {
      console.log(context.transformState);
      console.log(e.clientX, e.clientY);
      setWorldX(
        (e.clientX - props.divPos[1] - context.transformState.positionX) /
          context.transformState.scale,
      );
      setWorldY(
        (e.clientY - props.divPos[0] - context.transformState.positionY) /
          context.transformState.scale,
      );
    }
  };

  const handleMouseUp = () => {
    props.popupCallback(true);
    const tempDiv = document.getElementById("tempDiv");
    if (tempDiv) {
      tempDiv.style.left = worldX + "px";
      tempDiv.style.top = worldY + "px";
    }
  };

  return (
    <div
      ref={divRef}
      style={{ position: "relative" }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <div ref={drop}>
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

export default EditMapViewGraph;
