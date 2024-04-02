import FloorNode from "./FloorNode.tsx";
import lowerLevel1 from "../assets/00_thelowerlevel1.png";
//import {useEffect, useState} from "react";
import { Graph } from "../objects/Graph.ts";
import { MapNode } from "../objects/MapNode.ts";

export interface InputNode {
  nodeID: string;
  xcoord: number;
  ycoord: number;
  floor: string;
  building: string;
  nodeType: string;
  longName: string;
  shortName: string;
}

export interface Edge {
  startNodeID: string;
  endNodeID: string;
}

interface FloorMapProps {
  inputLocations: string[];
}

function FloorMap(props: FloorMapProps) {
  console.log(props.inputLocations);
  const graphMap = () => {
    const graph: Graph = new Graph(new Map<string, MapNode>());
    graph.loadGraph();
    return graph;
  };

  return (
    <>
      <FloorNode
        imageSrc={lowerLevel1}
        graph={graphMap()}
        inputLoc={props.inputLocations}
      />
    </>
  );
}

export default FloorMap;
