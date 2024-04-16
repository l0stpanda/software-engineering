import { useCallback, useEffect, useRef, useState } from "react";
import { Graph } from "../objects/Graph.ts";
import { FloorNodeInfo } from "./FloorNode.tsx";
import { MapEdge } from "../objects/MapEdge.ts";
import { useDrag, useDrop } from "react-dnd";
import type { XYCoord } from "react-dnd";
import { DragItem } from "../objects/DragItem.ts";

//import mapImg from "../assets/00_thelowerlevel1.png";

interface EditMapViewGraphProps {
  imageSrc: string;
  graph: Graph;
  divDim: { width: number; height: number };
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
  // const [clicked, setClicked] = useState<string[]>([]);
  const floor: string = getFloorByImage(props.imageSrc);
  const nodes = props.graph.getMap();

  // Will be changed soon
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [draggable, setDraggable] = useState<boolean>(true);

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

  // const [nodePositions, setNodePositions] = useState<{
  //     [id: number]: {
  //         left: number;
  //         top: number;
  //     };
  // }>({});

  const [scaledNodes, setScaledNodes] = useState<{
    [key: string]: FloorNodeInfo;
  }>({});

  //const scaledNodes: { [key: string]: FloorNodeInfo } = {};
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
    (id: string, left: number, top: number) => {
      console.log("time to move a box!");
      const oldNodePos = scaledNodes[id];
      oldNodePos.x = left;
      oldNodePos.y = top;
      console.log(left + " " + top);
      // Axios call here
      setScaledNodes({ ...scaledNodes, [id]: oldNodePos });
    },
    [scaledNodes, setScaledNodes],
  );

  const [, drop] = useDrop(
    () => ({
      accept: "Node",
      drop(item: DragItem, monitor) {
        const delta = monitor.getDifferenceFromInitialOffset() as XYCoord;
        const left = Math.round(item.x + delta.x);
        const top = Math.round(item.y + delta.y);
        moveBox(item.id, left, top);
        return undefined;
      },
    }),
    [moveBox],
  );

  // const handleNodeClick = (nodeid: string) => () => {
  //   if (clicked.length < 2 && !clicked.includes(nodeid)) {
  //     setClicked((prevClicked) => [...prevClicked, nodeid]);
  //     //set the start node to green
  //   }
  //   if (clicked.length == 2) {
  //     setClicked([nodeid]);
  //   }
  // };

  // const calculateInput = (): string[] => {
  //   let input: string[] = [];
  //   if (clicked.length === 2) {
  //     input = [clicked[0], clicked[1]];
  //   } else {
  //     console.log("Invalid IDs.");
  //   }
  //
  //   return input;
  // };

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
            className="animate-pulse"
          />,
        );
      }
    }
    console.log(lines);
    return lines;
  };

  function EditableNode(props: { nodeKey: string }) {
    const nodeColor: string = "#009BA8";
    const animation: string = "border border-slate-300 hover:border-red-400";
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

    //console.log(node.key, ids.startId, ids.endId);
    //if start node
    // if (props.nodeKey == input[0]) {
    //   nodeColor = "#39FF14";
    //   animation = animation.concat(" animate-bounce -m-[2.8px]");
    // }
    // //if end node
    // else if (props.nodeKey == input[1]) {
    //   nodeColor = "red";
    //   animation = animation.concat(" animate-bounce -m-[2.8px]");
    // }
    // //neither
    // else {
    //}

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
        // onClick={handleNodeClick(props.nodeKey)}
        ref={drag}
      ></div>
    );
  }

  function renderNodes() {
    return Object.values(scaledNodes)
      .filter((node) => node.floor == floor)
      .map((node) => <EditableNode nodeKey={node.key} />);
  }

  return (
    <div ref={divRef} style={{ position: "relative" }}>
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
