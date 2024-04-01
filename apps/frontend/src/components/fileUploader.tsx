import React, { useState } from "react";
//import axios from "axios";
import { edgeType } from "common/src/edgesType.ts";
import { DeleteAllEdge, PostEdge } from "../objects/DAO_Edges.ts";
import { nodeType } from "common/src/nodeType.ts";
import { DeleteAllNode, PostNode } from "../objects/DAO_Nodes.ts";

//This handles uploads and downloads on the same page
const SingleFileUploader = () => {
  const [file, setFile] = useState<File | null>(null);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (file) {
      console.log("Uploading file...");

      const formData = new FormData();
      formData.append("file", file);

      //Handles edges
      if (file.name.toString().toLowerCase().includes("edge")) {
        console.log("EDGES UPLOADING");
        try {
          const edges: string = await file.text();
          const edges_array: string[][] = edges
            .split("\n")
            .map((row: string): string[] => {
              return row.split(",");
            });

          await DeleteAllEdge();

          for (let i = 1; i < edges_array.length - 1; i++) {
            const curr_data: edgeType = {
              type: "Edges",
              start_node: edges_array[i][0].toString(),
              end_node: edges_array[i][1].toString().replace("/r", ""),
            };

            await PostEdge(curr_data);
          }
        } catch (error) {
          console.error(error);
        }
      }

      //Handles nodes
      else if (file.name.toString().toLowerCase().includes("node")) {
        console.log("IMPORTING NODES");
        try {
          const nodes: string = await file.text();
          const nodes_array: string[][] = nodes
            .split("\n")
            .map((row: string): string[] => {
              return row.split(",");
            });
          await DeleteAllNode();
          for (let i = 1; i < nodes_array.length - 1; i++) {
            const curr_data: nodeType = {
              type: "Nodes",
              node_id: nodes_array[i][0].toString(),
              x_c: nodes_array[i][1].toString(),
              y_c: nodes_array[i][2].toString(),
              floor: nodes_array[i][3].toString(),
              building: nodes_array[i][4].toString(),
              node_type: nodes_array[i][5].toString(),
              long_name: nodes_array[i][6].toString(),
              short_name: nodes_array[i][7].toString(),
            };
            await PostNode(curr_data);
          }
        } catch (error) {
          console.error(error);
        }
      } else {
        alert(
          "The imported file has to have 'node' or 'edge' in its title in order for us to know which database you want to upload to.",
        );
      }
    }
  };

  return (
    <>
      <input id="type" type="text" />
      <input id="file" type="file" accept=".csv" onChange={handleFileChange} />
      {file && <button onClick={handleUpload}>Upload a file</button>}
    </>
  );
};

export default SingleFileUploader;
