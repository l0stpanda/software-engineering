/*This is the functions that the front end should use repeatedly*/
import axios from "axios";
import { nodeType } from "common/src/nodeType.ts";

export async function PostNode(curr_data: nodeType) {
  const res = await axios.post("/api/importN", curr_data, {
    headers: { "Content-Type": "application/json" },
  });

  if (res.status == 200) {
    console.log(curr_data.node_id);
    console.log("success");
  } else {
    console.log(res.statusText);
  }
}

export async function DeleteAllNode() {
  await axios.delete("/api/importN", {
    headers: { "Content-Type": "application/json" },
  });
}
