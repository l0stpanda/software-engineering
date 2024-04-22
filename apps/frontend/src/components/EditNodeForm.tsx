import { MapNode } from "../objects/MapNode.ts";
import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

interface editNodeProps {
  node: MapNode;
  mode: string | null;
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
    console.log(props.node.getX(), props.node.getY(), props.node.getBuilding());
    const token = await getAccessTokenSilently();
    if (editMode === "add_node") {
      axios
        .post(
          "/api/editMap/addNode",
          {
            node_id: nodeInfo.ID,
            longName: nodeInfo.longName,
            floor: nodeInfo.floor,
            nodeType: nodeInfo.nodeType,
            shortName: nodeInfo.shortName,
            x_c: props.node.getX().toString(),
            y_c: props.node.getY().toString(),
            building: "asdhbb",
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          },
        )
        .then(() => {
          alert("Successfully added node " + nodeInfo.ID);
          window.location.reload();
        })
        .catch(() => {
          alert(
            "There was a problem creating the node. Make sure the node does not already exist.",
          );
        });
    } else {
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
        .then();
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
        Editing:{" "}
        {props.mode === "add_node" ? (
          <TextField
            value={nodeInfo.ID}
            name="ID"
            onChange={handleNodeEdits}
            variant="filled"
            label="Node ID"
          />
        ) : (
          nodeInfo.ID
        )}
      </h1>
      <div className="flex flex-col gap-2">
        <TextField
          value={nodeInfo.longName}
          name="longName"
          onChange={handleNodeEdits}
          variant="filled"
          label="Long Name"
        />
        <TextField
          value={nodeInfo.floor}
          name="floor"
          onChange={handleNodeEdits}
          variant="filled"
          label="Floor"
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
    </div>
  );
}
