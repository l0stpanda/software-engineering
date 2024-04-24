import React, { useState } from "react";
import { edgeType } from "common/src/edgesType.ts";
import { DeleteAllEdge, PostEdge } from "../objects/DAO_Edges.ts";
import { nodeType } from "common/src/nodeType.ts";
import { DeleteAllNode, PostNode } from "../objects/DAO_Nodes.ts";
import { Button, Dialog, DialogTitle } from "@mui/material";
//import BackgroundPattern from "./backgroundPattern.tsx";

const SingleFileUploader = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loadingDialog, setLoadingDialog] = useState(false);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  //Function to do uploads for edges and nodes

  const handleUpload = async () => {
    if (file) {
      setLoadingDialog(true);
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
          const arr: edgeType[] = [];
          for (let i = 1; i < edges_array.length - 1; i++) {
            const curr_data: {
              end_node: string;
              start_node: string;
              id: string;
            } = {
              id: edges_array[i][0].toString(),
              start_node: edges_array[i][1].toString(),
              end_node: edges_array[i][2].toString().replace("/r", ""),
            };
            arr.push(curr_data);
          }
          console.log(arr);
          PostEdge(arr);
        } catch (error) {
          //Throws error if Edges aren't loaded in correctly
          alert("Error loading Edges CSV");
          console.error(error);
          setLoadingDialog(false);
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
          const arr: nodeType[] = [];
          for (let i = 1; i < nodes_array.length - 1; i++) {
            const curr_data: nodeType = {
              node_id: nodes_array[i][0].toString(),
              x_c: nodes_array[i][1].toString(),
              y_c: nodes_array[i][2].toString(),
              floor: nodes_array[i][3].toString(),
              building: nodes_array[i][4].toString(),
              node_type: nodes_array[i][5].toString(),
              long_name: nodes_array[i][6].toString(),
              short_name: nodes_array[i][7].toString(),
            };
            arr.push(curr_data);
          }
          await PostNode(arr);
        } catch (error) {
          alert("Error Loading Nodes into Database");
          console.error(error);
          setLoadingDialog(false);
          return;
        }
        alert("Nodes CSV Loaded");
      } else {
        alert(
          "The imported file has to have 'node' or 'edge' in its title in order for us to know which database you want to upload to.",
        );
      }
      setLoadingDialog(false);
    }
  };

  return (
    //User interface for clicking a button to upload an edges/nodes.csv file
    <>
      <div className="flex flex-col bg-background rounded-xl px-6 h-fit w-[700px] justify-center py-5 gap-4">
        <h1 className="font-header text-primary font-bold text-3xl text-center">
          Upload Your File
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
        {file && (
          <Button
            type="button"
            className="w-50 self-center"
            sx={{ borderRadius: "30px" }}
            variant="contained"
            onClick={handleUpload}
          >
            Upload " {file.name.toString()} "
          </Button>
        )}
      </div>
      <Dialog open={loadingDialog}>
        <DialogTitle>Uploading file...</DialogTitle>
      </Dialog>
    </>
  );
};

export default SingleFileUploader;
