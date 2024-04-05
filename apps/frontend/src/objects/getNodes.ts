/*This is the functions that the front end should use repeatedly*/
// import axios from "axios";
// import { edgeType } from "common/src/edgesType.ts";
//
// export async function getAllEdges() {
//   const res = await axios.get("/api/import/ge").then(function (response) {
//     console.log(response.data);
//   });
//   console.log(res);
// }
//
// //FOR NODES
// export async function PostEdge(curr_data: edgeType) {
//   const res = await axios.post("/api/import", curr_data, {
//     headers: { "Content-Type": "application/json" },
//   });
//   if (res.status == 200) {
//     console.log(curr_data.start_node);
//     console.log("success");
//   } else {
//     console.log(res.statusText);
//   }
// }
