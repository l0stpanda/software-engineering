
import React, { useEffect, useState } from "react";
import { ReadEdge } from "../objects/Read_Edges.ts";
import { ReadNode } from "../objects/Read_Nodes.ts";
import { Edges, Nodes } from "database";

//This handles uploads and downloads on the same page
const SingleDisplay = () => {
  const [edges, setEdges] = useState<Edges[]>([]); // Initialize state to hold the edges data
  const [nodes, setNode] = useState<Nodes[]>([]); // Initialize state to hold the edges data
  useEffect(() => {
    displayEdges().then();
    displayNodes().then();
  }, []);
  const displayEdges = async () => {
    console.log("Displaying edges...");
    try {
      const data = await ReadEdge(); // Call ReadEdge and wait for the data
      setEdges(data); // Update state with the received data
    } catch (error) {
      console.error("Error fetching edges:", error);
    }
  };


  const displayNodes = async () => {
    console.log("Displaying nodes...");
    try {
      const data = await ReadNode(); // Call ReadEdge and wait for the data
      setNode(data); // Update state with the received data
    } catch (error) {
      console.error("Error fetching edges:", error);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <table style={{ width: "100%" }}>
        <thead>
          <tr style={{ borderWidth: "2px", borderColor: "black" }}>
            <th>Start Node</th>
            <th>End Node</th>
          </tr>
        </thead>
        <tbody>
          {edges.map((field) => (
            <tr style={{ borderWidth: "2px", borderColor: "black" }}>
              <td style={{ textAlign: "center" }}>{field.start_node}</td>
              <td style={{ textAlign: "center" }}>{field.end_node}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <table>
        <thead>
          <tr style={{ borderWidth: "2px", borderColor: "black" }}>
            <th>ID</th>
            <th>Type</th>
            <th>Floor</th>
            <th>X_COORD</th>
            <th>Y_COORD</th>
            <th>Building</th>
            <th>Short Name</th>
            <th>Long Name</th>
          </tr>
        </thead>
        <tbody>
          {nodes.map((field) => (
            <tr style={{ borderWidth: "2px", borderColor: "black" }}>
              <td style={{ textAlign: "center" }}>{field.node_id}</td>
              <td style={{ textAlign: "center" }}>{field.node_type}</td>
              <td style={{ textAlign: "center" }}>{field.floor}</td>
              <td style={{ textAlign: "center" }}>{field.x_c}</td>
              <td style={{ textAlign: "center" }}>{field.y_c}</td>
              <td style={{ textAlign: "center" }}>{field.building}</td>
              <td style={{ textAlign: "center" }}>{field.short_name}</td>
              <td style={{ textAlign: "center" }}>{field.long_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SingleDisplay;
