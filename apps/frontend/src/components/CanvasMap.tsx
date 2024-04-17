import React, { useState, useEffect, useRef } from "react";
import { Graph } from "../objects/Graph.ts";
import { FloorNodeInfo } from "./FloorNode.tsx";

interface CanvasProps {
  translateX: number;
  translateY: number;
  scale: number;
  img: string;
  graph: Graph;
}

function CanvasComponent(props: CanvasProps) {
  const [pan, setPan] = useState(false);
  const [originalX, setOriginalX] = useState(0);
  const [originalY, setOriginalY] = useState(0);
  const [translateX, setTranslateX] = useState(props.translateX);
  const [translateY, setTranslateY] = useState(props.translateY);
  const [scale, setScale] = useState(props.scale);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const nodes = props.graph.getMap();
  const floor = getFloorByImage(props.img);
  //console.log(floor);

  const scaledNodes: { [key: string]: FloorNodeInfo } = {};
  nodes.forEach((node) => {
    const id: string = node.getNodeID();
    scaledNodes[id] = {
      key: node.getNodeID(),
      x: node.getX(), //* (divDimensions.width / imgDimensions.width),
      y: node.getY(), //* (divDimensions.height / imgDimensions.height),
      floor: node.getFloor(),
    };
  });

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const backgroundImage = new Image();
        backgroundImage.src = props.img;
        backgroundImage.onload = () => {
          ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
        };
      }
    }
  }, [props.img]);

  const handleMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const { clientX, clientY } = event;
    setOriginalX(clientX - translateX);
    setOriginalY(clientY - translateY);
    setPan(true);
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (pan) {
      const { clientX, clientY } = event;
      setTranslateX(clientX - originalX);
      setTranslateY(clientY - originalY);
    }
  };

  const handleMouseUp = () => {
    setPan(false);
  };

  const handleWheel = (event: React.WheelEvent<HTMLCanvasElement>) => {
    const { clientX, clientY } = event;
    const adjX = clientX - 5000 / 2 - translateX;
    const adjY = clientY - 3400 / 2 - translateY;
    setTranslateX(adjX - (adjX - translateX) / 1.1);
    setTranslateY(adjY - (adjY - translateY) / 1.1);
    setScale(scale / 1.1);
  };

  function drawNode(ctx: CanvasRenderingContext2D, x: number, y: number) {
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI * 2); // Set a default radius of 5
    ctx.fillStyle = "red"; // Set a default color
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
    // id text
    // ctx.fillStyle = 'black';
    // ctx.font = '12px Arial';
    // ctx.fillText(id, x - 5, y + 5);
  }

  function renderNodes(ctx: CanvasRenderingContext2D) {
    Object.values(scaledNodes)
      .filter((node) => node.floor == floor)
      .map((node) => {
        drawNode(ctx, node.x, node.y);
      });
  }

  if (canvasRef.current) {
    const ctx = canvasRef.current.getContext("2d");
    if (ctx) {
      renderNodes(ctx);
    }
  }

  return (
    <canvas
      ref={canvasRef}
      id="canvas"
      style={{
        transform: `translate(${translateX}px, ${translateY}px) scale(${scale})`,
        display: "flex",
        width: "100%",
        height: "100%",
      }}
      height={3400}
      width={5000}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onWheel={handleWheel}
    ></canvas>
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

export default CanvasComponent;
