import { MapNode } from "../objects/MapNode.ts";
import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import axios from "axios";

interface editNodeProps {
  node: MapNode;
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

  useEffect(() => {
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

  function handleNodeSubmit() {
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
        { headers: {} },
      )
      .then();
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
        Editing: {nodeInfo.ID}
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
