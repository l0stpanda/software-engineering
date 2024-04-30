import { ReactElement, useCallback, useEffect, useRef, useState } from "react";
import { Graph } from "../objects/Graph.ts";
import { FloorNodeInfo } from "./FloorNode.tsx";
import { MapEdge } from "../objects/MapEdge.ts";
import { useDrag, useDrop } from "react-dnd";
import type { XYCoord } from "react-dnd";
import { DragItem } from "../objects/DragItem.ts";
import { useTransformContext } from "react-zoom-pan-pinch";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { Alert, Snackbar } from "@mui/material";
import { AlertColor } from "@mui/material/Alert";
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
  mouseCallback: (x: number, y: number) => void;
  mode: string | null;
  scaledNodes: {
    [p: string]: FloorNodeInfo | undefined;
  };
  setScaledNodes: (a: { [p: string]: FloorNodeInfo | undefined }) => void;
  setSizeFactor: (a: { width: number; height: number }) => void;
  sizeFactor: { width: number; height: number };
}

function EditMapViewGraph(props: EditMapViewGraphProps) {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] =
    useState<AlertColor>("success");

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const showSnackbar = (message: string, severity: AlertColor) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

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

  useEffect(() => {
    if (divRef.current) {
      const resizeObserver = new ResizeObserver(() => {
        if (divRef.current) {
          console.log("oops");
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
      if (imgDimensions.width == 0) {
        setImgDimensions({ width: img.width, height: img.height });
      }
    };
  }, [imgDimensions, props.imageSrc]);

  useEffect(() => {
    let repeat = false;
    const tempNodePosList: { [key: string]: FloorNodeInfo } = {};
    if (
      props.sizeFactor.height !=
      divDimensions.height / imgDimensions.height
    ) {
      props.setSizeFactor({
        width: divDimensions.width / imgDimensions.width,
        height: divDimensions.height / imgDimensions.height,
      });
    }
    nodes.forEach((node) => {
      const id: string = node.getNodeID();

      if (
        !props.scaledNodes[id] ||
        // @ts-expect-error It thinks that props.scaledNodes[id] is not being checked for undefined
        props.scaledNodes[id].x !=
          node.getX() * (divDimensions.width / imgDimensions.width)
      )
        repeat = true;
      tempNodePosList[id] = {
        key: node.getNodeID(),
        x: node.getX() * (divDimensions.width / imgDimensions.width),
        y: node.getY() * (divDimensions.height / imgDimensions.height),
        floor: node.getFloor(),
        type: node.getNodeType(),
        requests: [],
      };
    });
    if (repeat) {
      props.setScaledNodes(tempNodePosList);
    }
  }, [divDimensions, nodes, imgDimensions, props]);

  const moveBox = useCallback(
    async (id: string, left: number, top: number) => {
      console.log("time to move a box!");
      const oldNodePos = props.scaledNodes[id];
      if (oldNodePos) {
        oldNodePos.x = left;
        oldNodePos.y = top;
        const newPosX = left * (imgDimensions.width / divDimensions.width);
        const newPosY = top * (imgDimensions.height / divDimensions.height);
        console.log(newPosX, newPosY);
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
        props.setScaledNodes({ ...props.scaledNodes, [id]: oldNodePos });
        showSnackbar(`Move the Node ${id} in map successfully`, "success");
      }
    },
    [
      divDimensions.height,
      divDimensions.width,
      getAccessTokenSilently,
      imgDimensions.height,
      imgDimensions.width,
      props,
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

  // const [newPosX, setNewPosX] = useState( -1);
  // const [newPosY, setNewPosY] = useState(-1);

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
      const startPoint = props.scaledNodes[startNode];
      const endPoint = props.scaledNodes[endNode];
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

  function EditableNode(prop: { nodeKey: string }) {
    const nodeColor: string = "#009BA8";
    const animation: string = "border border-slate-300";
    // const input = calculateInput();

    const id = prop.nodeKey;
    const scaledNode = props.scaledNodes[id];
    let [x, y] = [-1, -1];
    if (scaledNode) {
      x = scaledNode.x;
      y = scaledNode.y;
    }

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
        key={prop.nodeKey}
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
        onClick={handleNodeClick(prop.nodeKey)}
        ref={drag}
      ></div>
    );
  }

  const renderNodes = () => {
    const values: ReactElement[] = [];
    Object.values(props.scaledNodes).forEach(
      (node: FloorNodeInfo | undefined) => {
        if (node != undefined && node.floor == floor) {
          values.push(<EditableNode nodeKey={node.key} />);
        }
      },
    );
    return values;
  };

  const handleMouseUp = (e: { clientX: number; clientY: number }) => {
    const tempDiv = document.getElementById("tempDiv");
    if (props.mode === "add_node" && tempDiv && context.bounds) {
      console.log(context.transformState);
      console.log(e.clientX, e.clientY);
      const worldX =
        (e.clientX - props.divPos[1] - context.transformState.positionX) /
        context.transformState.scale;
      const worldY =
        (e.clientY - props.divPos[0] - context.transformState.positionY) /
        context.transformState.scale;
      if (divRef.current) {
        const newPosX = worldX * (imgDimensions.width / divDimensions.width);
        const newPosY = worldY * (imgDimensions.height / divDimensions.height);
        props.mouseCallback(newPosX, newPosY);
      }
      const tempDiv = document.getElementById("tempDiv");
      if (tempDiv) {
        tempDiv.style.left = worldX + "px";
        tempDiv.style.top = worldY + "px";
      }
    }
  };

  return (
    <div
      ref={divRef}
      style={{ position: "relative" }}
      onMouseUp={handleMouseUp}
    >
      <div ref={drop}>
        <img
          src={props.imageSrc}
          className="object-contain h-full border-2 border-primary rounded-xl"
          alt="Map"
        />
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
              width: "6px",
              height: "6px",
              backgroundColor: "orangered",
              borderRadius: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 999,
            }}
          ></div>
        )}
      </div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
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
