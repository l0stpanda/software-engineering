import React, { useState } from "react";
import axios from "axios";
import BackgroundPattern from "./backgroundPattern.tsx";
import { Button } from "@mui/material";
import { edgeType } from "common/src/edgesType.ts";
import { nodeType } from "common/src/nodeType.ts";
import { DeleteAllNode, PostNode } from "../objects/DAO_Nodes.ts";
import { DeleteAllEdge, PostEdge } from "../objects/DAO_Edges.ts";
const DownloadAndUploader = () => {
  const [file, setFile] = useState<File | null>(null);
  const handleDownload = async (apiPath: string, fileName: string) => {
    try {
      const response = await axios.get(apiPath);
      const dataList = response.data;

      // CSV header
      const headers = Object.keys(dataList[0]);
      //const csvHeader = headers.join(",") + "\r\n";

      // CSV rows
      const csvRows = dataList
        .map((row: { [x: string]: string }) => {
          return headers
            .map((fieldName) => {
              let field = row[fieldName] ?? ""; // Use an empty string if the field is undefined
              // Remove carriage return characters and escape double quotes
              field = field.toString().replace(/\r/gm, "").replace(/"/g, '""');
              // If the field contains a comma, wrap it in double quotes
              return field.includes(",") ? `"${field}"` : field;
            })
            .join(",");
        })
        .join("\r\n");

      // Create a Blob for the CSV content
      const blob = new Blob([csvRows], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);

      // Create a temporary link to trigger the download
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url); // Clean up the URL object
    } catch (error) {
      console.error("Couldn't download the file!", error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  //Function to do uploads for edges and nodes

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
          setFile(null);
          const edges_array: string[][] = edges
            .split("\n")
            .map((row: string): string[] => {
              return row.split(",");
            });

          //Clears the edges to make way for the new upload
          await DeleteAllEdge();

          //Fills in the edges from the new uploaded file
          for (let i = 1; i < edges_array.length - 1; i++) {
            const curr_data: edgeType = {
              type: "Edges",
              start_node: edges_array[i][0].toString(),
              end_node: edges_array[i][1].toString().replace("/r", ""),
            };
            //Makes the backend database accessible to the frontend
            await PostEdge(curr_data);
          }
        } catch (error) {
          //Throws error if Edges aren't loaded in correctly
          alert("Error loading Edges CSV");
          console.error(error);
          return;
        }
        alert("Edges CSV loaded successfully");
      }

      //Same functionality as above, but now for nodes
      else if (file.name.toString().toLowerCase().includes("node")) {
        console.log("IMPORTING NODES");
        try {
          const nodes: string = await file.text();
          setFile(null);
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
          alert("Error Loading Nodes into Database");
          console.error(error);
          return;
        }
        alert("Nodes CSV Loaded");
      } else {
        alert(
          "The imported file has to have 'node' or 'edge' in its title in order for us to know which database you want to upload to.",
        );
      }
    }
  };

  return (
    <div className="justify-center grid h-screen place-items-center">
      <BackgroundPattern />
      <div className="m-auto flex flex-col bg-background rounded-xl px-6 h-fit w-[700px] justify-center py-5 gap-4">
        <h1 className="font-header text-primary font-bold text-3xl text-center">
          Enter Your File
        </h1>
        <h1 className=" font-body text-primary text-2xl text-center pb-4">
          Enter a csv file with "edges" or "nodes" in the title
        </h1>
        {/*Ugly input box for CSV upload*/}
        <input
          style={{ display: "none" }}
          id="contained-button-file"
          type="file"
          onChange={handleFileChange}
          accept=".csv"
        />
        {/*Pretty input box for CSV upload*/}
        <label className="self-center" htmlFor="contained-button-file">
          <Button
            variant="contained"
            color="primary"
            component="span"
            sx={{ borderRadius: "30px" }}
            className="w-32"
          >
            Upload File
          </Button>
        </label>
        <Button
          type="button"
          className="w-32 self-center"
          sx={{ borderRadius: "30px" }}
          variant="contained"
          component="a"
          href="displayTables"
        >
          View Tables
        </Button>
        {file && (
          <button onClick={handleUpload} style={{ marginTop: "5%" }}>
            Upload a file
          </button>
        )}
      </div>

      <div className="m-auto flex flex-col bg-background rounded-xl px-6 h-fit w-[700px] justify-center py-5 gap-4">
        <h1 className="font-header text-primary font-bold text-3xl text-center">
          Download Files
        </h1>
        <h1 className=" font-body text-primary text-2xl text-center pb-4">
          Download node or edge file
        </h1>
        {/*Download Node CSV button*/}
        <Button
          variant="contained"
          color="primary"
          component="span"
          sx={{ borderRadius: "30px" }}
          className="w-32 self-center text-center"
          onClick={() => handleDownload("/api/read/nodes", "Nodes.csv")}
        >
          Download Node CSV
        </Button>
        {/*Download Edge CSV button*/}
        <Button
          variant="contained"
          color="primary"
          component="span"
          sx={{ borderRadius: "30px" }}
          className="w-32 self-center text-center"
          onClick={() => handleDownload("/api/read/edges", "Edges.csv")}
        >
          Download Edge CSV
        </Button>
        {/*View Table button*/}
        <Button
          type="button"
          className="w-32 self-center"
          sx={{ borderRadius: "30px" }}
          variant="contained"
          component="a"
          href="displayTables"
        >
          View Tables
        </Button>
      </div>
    </div>
  );
};
export default DownloadAndUploader;
