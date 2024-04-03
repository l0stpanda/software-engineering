/*This is the functions that the front end should use repeatedly*/
import axios from "axios";
import { edgeType } from "common/src/edgesType.ts";

//Function to send edges from the frontend to the database
export async function PostEdge(curr_data: edgeType) {
  const res = await axios.post("/api/import", curr_data, {
    headers: { "Content-Type": "application/json" },
  });
  if (res.status == 200) {
    //Logs a success is the post is successful and logs the start node
    console.log(curr_data.start_node);
    console.log("success");
  } else {
    //Throws error if the post is unsuccessful
    console.log(res.statusText);
  }
}
//Function to delete all edges from the database
export async function DeleteAllEdge() {
  await axios.delete("/api/import", {
    headers: { "Content-Type": "application/json" },
  });
}
