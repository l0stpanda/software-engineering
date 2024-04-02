import React, { useState } from "react";
//import axios from "axios";
//import { edgeType } from "common/src/edgesType.ts";
import { ReadEdge } from "../objects/Read_Edges.ts";
//import { nodeType } from "common/src/nodeType.ts";
import { ReadNode } from "../objects/Read_Nodes.ts";

//This handles uploads and downloads on the same page
const SingleDisplay = () => {
  const [edges, setEdges] = useState(null); //
  const [nodes, setNodes] = useState(null); //// Initialize state to hold the edges data

  const displayNodes = async () => {
    console.log("Displaying nodes...");
    try {
      const data = await ReadNode(); // Call ReadNode and wait for the data
      setNodes(data); // Update state with the received data
    } catch (error) {
      console.error("Error fetching nodes:", error);
    }
  };
  const displayEdges = async () => {
    console.log("Displaying edges...");
    try {
      const data = await ReadEdge(); // Call ReadEdge and wait for the data
      setEdges(data); // Update state with the received data
    } catch (error) {
      console.error("Error fetching edges:", error);
    }
  };

  return (
    <>
      <button type="button" onClick={displayEdges}>
        display Edge table
      </button>
      <button type="button" onClick={displayNodes}>
        display Node table
      </button>
      {edges && <pre>{JSON.stringify(edges, null, 2)}</pre>}
      {nodes && <pre>{JSON.stringify(nodes, null, 2)}</pre>}
    </>
  );
};

export default SingleDisplay;
