import React, { useState } from "react";
//import axios from "axios";
//import { edgeType } from "common/src/edgesType.ts";
import { ReadEdge } from "../objects/Read_Edges.ts";
//import { nodeType } from "common/src/nodeType.ts";
//import {ReadNode} from "../objects/DAO_Nodes.ts";

//This handles uploads and downloads on the same page
const SingleDisplay = () => {
  const [edges, setEdges] = useState(null); // Initialize state to hold the edges data

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
      <form>
        <input
          type="radio"
          id="radio1"
          name="options"
          value="option1"
          checked
        />
        <label htmlFor="radio1">Nodes</label>
        <br />
        <input type="radio" id="radio2" name="options" value="option2" />
        <label htmlFor="radio2">Edges</label>
        <br />
      </form>
      <button type="button" onClick={displayEdges}>
        display Edge table
      </button>
      {edges && <pre>{JSON.stringify(edges, null, 2)}</pre>}
    </>
  );
};

export default SingleDisplay;
