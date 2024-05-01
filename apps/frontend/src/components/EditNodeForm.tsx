import { MapNode } from "../objects/MapNode.ts";
import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { Alert, Snackbar } from "@mui/material";
import { AlertColor } from "@mui/material/Alert";
import { Graph } from "../objects/Graph.ts";
import { FloorNodeInfo } from "./FloorNode.tsx";

interface editNodeProps {
  node: MapNode;
  mode: string | null;
  graph: Graph;
  sizeFactor: { width: number; height: number };
  scaledNodes: {
    [p: string]: FloorNodeInfo | undefined;
  };
  setScaledNodes: (a: { [p: string]: FloorNodeInfo | undefined }) => void;
}

interface editNodeFormProps {
  ID: string;
  longName: string;
  floor: string;
  nodeType: string;
  shortName: string;
}

export default function EditNodeForm(props: editNodeProps) {
  const [nodeInfo, setNodeInfo] = useState<editNodeFormProps>({
    ID: props.node.getNodeID(),
    longName: props.node.getLongName(),
    floor: props.node.getFloor(),
    nodeType: props.node.getNodeType(),
    shortName: props.node.getShortName(),
  });
  const { getAccessTokenSilently } = useAuth0();
  const [editMode, setEditMode] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] =
    useState<AlertColor>("success");

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const showSnackbar = (message: string, severity: AlertColor) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };
  useEffect(() => {
    setEditMode(props.mode);
    setNodeInfo({
      ID: props.node.getNodeID(),
      longName: props.node.getLongName(),
      floor: props.node.getFloor(),
      nodeType: props.node.getNodeType(),
      shortName: props.node.getShortName(),
    });
  }, [props]);

  function handleNodeEdits(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setNodeInfo({ ...nodeInfo, [e.target.name]: e.target.value });
  }

  async function handleNodeSubmit() {
    console.log(props.node.getX(), props.node.getY(), props.sizeFactor);
    const token = await getAccessTokenSilently();
    if (editMode === "add_node") {
      // if we want to add a node
      axios
        .post(
          "/api/editMap/addNode",
          {
            node_id: nodeInfo.ID,
            longName: nodeInfo.longName,
            floor: props.node.getFloor(),
            nodeType: nodeInfo.nodeType,
            shortName: nodeInfo.shortName,
            x_c: props.node.getX().toString(),
            y_c: props.node.getY().toString(),
            building: props.node.getBuilding(),
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          },
        )
        .then(() => {
          showSnackbar("Successfully added node " + nodeInfo.ID, "success");
          props.graph.addNode(
            new MapNode(
              nodeInfo.ID,
              props.node.getX(),
              props.node.getY(),
              nodeInfo.floor,
              props.node.getBuilding(),
              nodeInfo.nodeType,
              nodeInfo.longName,
              nodeInfo.shortName,
            ),
          );
          props.scaledNodes[nodeInfo.ID] = {
            x: props.node.getX() * props.sizeFactor.width,
            y: props.node.getY() * props.sizeFactor.height,
            key: nodeInfo.ID,
            floor: nodeInfo.floor,
            type: nodeInfo.nodeType,
            requests: [],
            longName: nodeInfo.longName,
          };
        })
        .catch(() => {
          showSnackbar(
            "There was a problem creating the node. Make sure the node does not already exist.",
            "error",
          );
        });
    } else {
      //otherwise we are just editing the node information
      axios
        .post(
          "/api/editMap/editNodeInfo",
          {
            node_id: nodeInfo.ID,
            longName: nodeInfo.longName,
            floor: nodeInfo.floor,
            nodeType: nodeInfo.nodeType,
            shortName: nodeInfo.shortName,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          },
        )
        .then(() => {
          const node = props.graph.getNode(nodeInfo.ID);
          if (node)
            node.setInfo(
              nodeInfo.floor,
              nodeInfo.nodeType,
              nodeInfo.longName,
              nodeInfo.shortName,
            );
        });
    }
  }

  return (
    <div
      className="mr-8
                    ml-5
                    py-5
                    px-4
                    flex
                    flex-col
                    items-center
                    bg-background
                    rounded-xl
                    border-primary
                    border-2"
    >
      <h1
        className="text-primary
              font-header
              font-bold
              text-xl
              text-center
              "
      >
        Editing: {nodeInfo.ID}
      </h1>
      <div className="flex flex-col gap-2">
        {props.mode === "add_node" && (
          <TextField
            value={nodeInfo.ID}
            name="ID"
            onChange={handleNodeEdits}
            variant="filled"
            label="Node ID"
          />
        )}
        <TextField
          value={nodeInfo.longName}
          name="longName"
          onChange={handleNodeEdits}
          variant="filled"
          label="Long Name"
        />
        <TextField
          value={nodeInfo.nodeType}
          name="nodeType"
          onChange={handleNodeEdits}
          variant="filled"
          label="Node Type"
        />

        <TextField
          value={nodeInfo.shortName}
          name="shortName"
          onChange={handleNodeEdits}
          variant="filled"
          label="Short Name"
        />

        <Button
          type="button"
          variant="contained"
          className="submitButton"
          size="small"
          onClick={handleNodeSubmit}
          sx={{ borderRadius: "30px" }}
        >
          Submit
        </Button>
      </div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
