import React, { useEffect, useState } from "react";
import { ReadEdge } from "../objects/Read_Edges.ts";
import { ReadNode } from "../objects/Read_Nodes.ts";
import { Edges, Nodes } from "database";
import { Tab, Tabs } from "@mui/material";

/*interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
    edges?: Edges[];
    nodes?: Nodes[];
}*/

//This handles uploads and downloads on the same page
const SingleDisplay = () => {
  const [edges, setEdges] = useState<Edges[]>([]); // Initialize state to hold the edges data
  const [nodes, setNode] = useState<Nodes[]>([]); // Initialize state to hold the nodes data
  const [tableDisplayed, setTableDisplaying] = useState<number>(0);


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

  // Change tabs by switching between 0 and 1
  function handleTabChange() {
    setTableDisplaying(Math.abs(tableDisplayed - 1));
  }

  return (
    <div className="flex flex-col px-6 bg-background">
      <div>
        <Tabs
          value={tableDisplayed}
          onChange={handleTabChange}
          className="my-2"
        >
          <Tab label="Edges Table" id="tab-1" />
          <Tab label="Nodes Table" id="tab-2" />
        </Tabs>
      </div>

      <div hidden={tableDisplayed !== 0} id={`tab-${0}`}>
        {tableDisplayed === 0 && (
          <table className="w-full">
        <thead className="bg-secondary border-b-2 border-b-primary">
          <tr>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              Node ID
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              Start Node
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              End Node
            </th>
          </tr>
        </thead>
        <tbody>
          {edges.map((field) => (
            <tr className="bg-background border-b-2 border-secondary">
              <td className="p-3 text-sm">{field.id}</td>
              <td className="p-3 text-sm">{field.start_node}</td>
              <td className="p-3 text-sm">{field.end_node}</td>
            </tr>
          ))}
        </tbody>
      </table>
        )}
      </div>

      <div hidden={tableDisplayed !== 1} id={`tab-${1}`}>
        {tableDisplayed === 1 && (
          <table className="w-full">
            <thead className="bg-secondary border-b-2 border-b-primary">
              <tr>
                <th className="p-3 text-sm font-semibold tracking-wide text-left">
                  ID
                </th>
                <th className="p-3 text-sm font-semibold tracking-wide text-left">
                  Type
                </th>
                <th className="p-3 text-sm font-semibold tracking-wide text-left">
                  Floor
                </th>
                <th className="p-3 text-sm font-semibold tracking-wide text-left">
                  X_COORD
                </th>
                <th className="p-3 text-sm font-semibold tracking-wide text-left">
                  Y_COORD
                </th>
                <th className="p-3 text-sm font-semibold tracking-wide text-left">
                  Building
                </th>
                <th className="p-3 text-sm font-semibold tracking-wide text-left">
                  Short Name
                </th>
                <th className="p-3 text-sm font-semibold tracking-wide text-left">
                  Long Name
                </th>
              </tr>
            </thead>
            <tbody>
              {nodes.map((field) => (
                <tr className="bg-background border-b-2 border-secondary">
                  <td className="p-3 text-sm">{field.node_id}</td>
                  <td className="p-3 text-sm">{field.node_type}</td>
                  <td className="p-3 text-sm">{field.floor}</td>
                  <td className="p-3 text-sm">{field.x_c}</td>
                  <td className="p-3 text-sm">{field.y_c}</td>
                  <td className="p-3 text-sm">{field.building}</td>
                  <td className="p-3 text-sm">{field.short_name}</td>
                  <td className="p-3 text-sm">{field.long_name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default SingleDisplay;
