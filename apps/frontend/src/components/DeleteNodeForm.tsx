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
interface deleteNodeProps {
  node: MapNode | undefined;
  graph: Graph;
  scaledNodes: { [a: string]: FloorNodeInfo | undefined };
  update: boolean;
  setUpdate: (a: boolean) => void;
}

export default function DeleteNodeForm(props: deleteNodeProps) {
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
  const [nodeInfo, setNodeInfo] = useState(props.node);
  const { getAccessTokenSilently } = useAuth0();
  useEffect(() => {
    setNodeInfo(props.node);
  }, [props]);

  async function handleNodeSubmit() {
    const token = await getAccessTokenSilently();
    axios
      .post(
        "/api/editMap/deleteNode",
        {
          node_id: nodeInfo?.getNodeID(),
          longName: nodeInfo?.getLongName(),
          floor: nodeInfo?.getFloor(),
          nodeType: nodeInfo?.getNodeType(),
          shortName: nodeInfo?.getShortName(),
          x_c: nodeInfo?.getX().toString(),
          y_c: nodeInfo?.getY().toString(),
          building: nodeInfo?.getBuilding(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      )
      .then(() => {
        showSnackbar(
          "Successfully deleted node " + nodeInfo?.getNodeID(),
          "success",
        );
        if (nodeInfo) {
          props.scaledNodes[nodeInfo?.getNodeID()] = undefined;
          props.graph.removeNode(nodeInfo);
          props.setUpdate(!props.update);
        }
      })
      .catch(() => {
        showSnackbar(
          "There was a problem deleting the node. Make sure the node already exist.",
          "error",
        );
      });
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
        Delete Node
      </h1>
      <div className="flex flex-col gap-2">
        <TextField
          value={nodeInfo !== undefined ? nodeInfo.getLongName() : ""}
          placeholder="Select a node"
          name="nodeStart"
          variant="filled"
          disabled
          label="Node ID"
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
