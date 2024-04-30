import { MapNode } from "../objects/MapNode.ts";
import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { Alert, Snackbar } from "@mui/material";
import { AlertColor } from "@mui/material/Alert";
import { MapEdge } from "../objects/MapEdge.ts";

interface createEdgeProps {
  nodes: MapNode[];
  update: boolean;
  setUpdate: (a: boolean) => void;
}

// interface editNodeProps {
//   nodeStart: MapNode | null;
//   nodeEnd: MapNode | null;
// }

// interface editNodeFormProps {
//   ID: string;
//   longName: string;
//   floor: string;
//   nodeType: string;
//   shortName: string;
// }

export default function CreateEdgeForm(props: createEdgeProps) {
  const [edgeInfo, setEdgeInfo] = useState<MapNode[]>(props.nodes);
  const { getAccessTokenSilently } = useAuth0();
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
    setEdgeInfo(props.nodes);
    //console.log(edgeInfo);
  }, [props]);

  // useEffect(() => {
  //     console.log(props.nodes);
  //     if (props.nodes.length == 1) {
  //         setEdgeInfo({
  //           nodeStart: props.nodes[0],
  //             nodeEnd: null,
  //         });
  //     } else if (props.nodes.length == 2) {
  //         setEdgeInfo({
  //             nodeStart: props.nodes[0],
  //             nodeEnd: props.nodes[1],
  //         });
  //     }
  // }, [props]);

  async function handleEdgeSubmit() {
    if (
      edgeInfo[0].getLongName() != "" &&
      edgeInfo[1].getLongName() != "" &&
      edgeInfo[0].getNodeID() !== edgeInfo[1].getNodeID()
    ) {
      const token = await getAccessTokenSilently();
      axios
        .post(
          "/api/editMap/addEdge",
          {
            id: edgeInfo[1].getNodeID() + "_" + edgeInfo[0].getNodeID(),
            start_node: edgeInfo[0].getNodeID(),
            end_node: edgeInfo[1].getNodeID(),
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
            "Successfully created edge from " +
              edgeInfo[0].getLongName() +
              " to " +
              edgeInfo[1].getLongName(),
            "success",
          );
          const edge = new MapEdge(edgeInfo[0], edgeInfo[1]);
          edgeInfo[0].addAdjacency(edge);
          edgeInfo[1].addAdjacency(edge);
          props.setUpdate(!props.update);
        })
        .catch(() => {
          showSnackbar(
            "There was a problem creating the edge. Make sure the edge does not already exist.",
            "error",
          );
        });
    }
  }

  return (
    <div
      className="mr-8
                    ml-5
                    py-5
                    px-0
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
        New Edge
      </h1>
      <div className="flex flex-col gap-2">
        <TextField
          value={edgeInfo[0].getLongName()}
          placeholder="Select a node"
          name="nodeStart"
          variant="filled"
          disabled
          label="First Node"
        />
        <TextField
          value={edgeInfo[1].getLongName()}
          placeholder="Select another node"
          name="nodeEnd"
          variant="filled"
          disabled
          label="Second Node"
        />

        <Button
          type="button"
          variant="contained"
          className="submitButton"
          size="small"
          onClick={handleEdgeSubmit}
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
