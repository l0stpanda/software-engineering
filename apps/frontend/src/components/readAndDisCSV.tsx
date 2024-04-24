import React, { useEffect, useState } from "react";
import { ReadEdge } from "../objects/Read_Edges.ts";
import { ReadNode } from "../objects/Read_Nodes.ts";
import { Edges, Nodes } from "database";
import { Tab, Tabs } from "@mui/material";

//start merge

import axios from "axios";
import { Button } from "@mui/material";
import { DeleteAllEdge, PostEdge } from "../objects/DAO_Edges.ts";
import { edgeType } from "common/src/edgesType.ts";
import { DeleteAllNode, PostNode } from "../objects/DAO_Nodes.ts";
import { nodeType } from "common/src/nodeType.ts";
import { useAuth0 } from "@auth0/auth0-react";
import PendingUser from "./PendingUser.tsx";

//end merge

//upload start
// import React, { useState } from "react";
// import { edgeType } from "common/src/edgesType.ts";
// import { DeleteAllEdge, PostEdge } from "../objects/DAO_Edges.ts";
// import { nodeType } from "common/src/nodeType.ts";
// import { DeleteAllNode, PostNode } from "../objects/DAO_Nodes.ts";
import { Dialog, DialogTitle } from "@mui/material";
//upload end

/*interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
    edges?: Edges[];
    nodes?: Nodes[];
}*/
type User = {
  id: string;
  email: string;
  username: string;
  role: string;
};
//This handles uploads and downloads on the same page
function SingleDisplay() {
  const [edges, setEdges] = useState<Edges[]>([]); // Initialize state to hold the edges data
  const [nodes, setNode] = useState<Nodes[]>([]); // Initialize state to hold the nodes data
  const [tableDisplayed, setTableDisplaying] = useState<number>(0);
  const [users, setUsers] = useState<User[]>([]);
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    async function fetchData() {
      try {
        const edgeData = await ReadEdge();
        const nodeData = await ReadNode();
        const token = await getAccessTokenSilently();
        const response = await axios.get("/api/userAdding", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEdges(edgeData);
        setNode(nodeData);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [getAccessTokenSilently]);

  //  async function displayEdges() {
  //    console.log("Displaying edges...");
  //    try {
  //      const data = await ReadEdge(); // Call ReadEdge and wait for the data
  //      setEdges(data); // Update state with the received data
  //    } catch (error) {
  //      console.error("Error fetching edges:", error);
  //    }
  //  }

  // async function displayNodes() {
  //   console.log("Displaying nodes...");
  //   try {
  //     const data = await ReadNode(); // Call ReadEdge and wait for the data
  //     setNode(data); // Update state with the received data
  //   } catch (error) {
  //     console.error("Error fetching nodes:", error);
  //   }
  // }

  // Change tabs by switching between 0 and 1
  function handleTabChange(event: React.SyntheticEvent, newValue: number) {
    setTableDisplaying(newValue);
  }

  // Start merge here
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

  // end merge

  //uplaod merge start
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
              end_node: edges_array[i][2].toString().replace(/\r/gm, ""),
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

      //Handles users
      else if (file.name.toString().toLowerCase().includes("user")) {
        console.log("USERS UPLOADING");
        try {
          const users: string = await file.text();
          setFile(null);
          const users_array: string[][] = users
            .split("\n")
            .map((row: string): string[] => {
              return row.split(",");
            });

          const newUsers: User[] = [];
          for (let i = 1; i < users_array.length - 1; i++) {
            const curr_data: User = {
              id: users_array[i][0].toString(),
              email: users_array[i][1].toString(),
              username: users_array[i][2].toString().replace(/\r/gm, ""),
              role: users_array[i][3].toString(),
            };
            newUsers.push(curr_data);
          }

          await axios.post("/api/userAdding/uploadUsers", newUsers, {
            headers: {
              "Content-Type": "application/json",
            },
          });
        } catch (error) {
          //Throws error if Edges aren't loaded in correctly
          alert("Error loading Edges CSV");
          console.error(error);
          setLoadingDialog(false);
          return;
        }
        alert("Users CSV loaded successfully");
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
          "The imported file has to have 'node' or 'edge' or 'users' in its title in order for us to know which database you want to upload to.",
        );
      }
      setLoadingDialog(false);
    }
  };

  //upload merge ends

  return (
    <div className="flex flex-col px-6 bg-background py-1">
      <div className="grid grid-cols-2">
        {/*download buttonss*/}
        <div className=" inline-flex bg-background rounded-xl px-6 h-fit justify-left pt-5 gap-4">
          <div>
            <h1 className="font-header text-primary font-bold text-3xl text-center">
              Download Files
            </h1>
            <p className=" font-body text-primary text-sm text-left pb-5">
              Download the node, edge, or user files
            </p>
          </div>

          {/*<h1 className=" font-body text-primary text-2xl text-center pb-4">*/}
          {/*    Download node or edge file*/}
          {/*</h1>*/}
          {/*Download Node CSV button*/}
          <label className="pt-2">
            <Button
              variant="contained"
              color="primary"
              component="span"
              sx={{ borderRadius: "30px" }}
              className="w-32 self-center text-center"
              onClick={() => handleDownload("/api/read/nodes", "Nodes.csv")}
            >
              Node CSV
            </Button>
          </label>
          {/*Download Edge CSV button*/}
          <label className="pt-2">
            <Button
              variant="contained"
              color="primary"
              component="span"
              sx={{ borderRadius: "30px" }}
              className="w-32 self-center text-center"
              onClick={() => handleDownload("/api/read/edges", "Edges.csv")}
            >
              Edge CSV
            </Button>
          </label>
          <label className="pt-2">
            <Button
              variant="contained"
              color="primary"
              component="span"
              sx={{ borderRadius: "30px" }}
              className="w-32 self-center text-center"
              onClick={() => handleDownload("/api/read/users", "users.csv")}
            >
              User CSV
            </Button>
          </label>
          {/*View Table button*/}
        </div>
        {/*download buttonss*/}

        {/*upload buttonss*/}
        <div className="inline-flex bg-background rounded-xl px-6 h-fit justify-left pt-5 gap-4">
          <div className="grid-cols-2">
            <h1 className="font-header text-primary font-bold text-3xl text-left">
              Upload Files
            </h1>
            <p className=" font-body text-primary text-sm text-left pb-5">
              Enter a CSV file titled "edges", "nodes", or "users"
            </p>
          </div>

          {/*Ugly input box for CSV upload*/}
          <input
            style={{ display: "none" }}
            id="contained-button-file"
            type="file"
            onChange={handleFileChange}
            accept=".csv"
          />
          {/*Pretty input box for CSV upload*/}
          <label className="pt-2 " htmlFor="contained-button-file">
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
            <label className="pt-2">
              <Button
                type="button"
                className="w-50 self-center"
                sx={{ borderRadius: "30px" }}
                variant="contained"
                onClick={handleUpload}
              >
                Upload " {file.name.toString()} "
              </Button>
            </label>
          )}
        </div>
        <Dialog open={loadingDialog}>
          <DialogTitle>Uploading file...</DialogTitle>
        </Dialog>
        {/*upload buttonss*/}
      </div>

      <div>
        <hr className="" />
        <h1 className="font-header text-primary font-bold text-3xl text-center px-6 h-fit justify-center pt-10 gap-4 -m-5">
          View Tables
        </h1>

        <Tabs
          value={tableDisplayed}
          onChange={(event, newValue) => handleTabChange(event, newValue)}
          className=""
        >
          <Tab label="Edges Table" id="tab-1" value={0} />
          <Tab label="Nodes Table" id="tab-2" value={1} />
          <Tab label="Users Table" id="users-tab" value={2} />
        </Tabs>
      </div>

      <div hidden={tableDisplayed !== 0} id={`tab-${0}`}>
        {tableDisplayed === 0 && (
          <table className="w-full">
            <thead className="bg-secondary border-b-2 border-b-primary sticky top-0">
              <tr>
                <th className="p-3 text-sm font-semibold tracking-wide text-left">
                  Edge ID
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
            <thead className="bg-secondary border-b-2 border-b-primary sticky top-0">
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
      <div
        hidden={tableDisplayed !== 2}
        id="tab-2"
        style={{ paddingTop: "30px" }}
      >
        <table className="w-full">
          <thead>
            <tr>
              <th>Email</th>
              <th>Username</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <PendingUser
                key={user.id}
                id={user.id}
                email={user.email}
                username={user.username}
                role={user.role}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SingleDisplay;
