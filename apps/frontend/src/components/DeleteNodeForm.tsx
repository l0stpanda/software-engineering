import { MapNode } from "../objects/MapNode.ts";
import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

interface deleteNodeProps {
  node: MapNode | undefined;
}

export default function DeleteNodeForm(props: deleteNodeProps) {
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
        alert("Successfully deleted node " + nodeInfo?.getNodeID());
        window.location.reload();
      })
      .catch(() => {
        alert(
          "There was a problem deleting the node. Make sure the node already exist.",
        );
      });
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
    </div>
  );
}
