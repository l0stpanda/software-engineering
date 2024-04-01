/*This is the functions that the front end should use repeatedly*/
import axios from "axios";
import { nodeType } from "common/src/nodeType.ts";

export async function ReadNode(curr_data: nodeType) {
  const res = await axios.post("/api/readN", curr_data, {
    headers: { "Content-Type": "application/json" },
  });

  if (res.status == 200) {
    console.log("success");
    return res.data;
  } else {
    console.log(res.statusText);
  }
}
