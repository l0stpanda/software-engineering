// import { PrismaClient } from "../.prisma/client";
// import axios from "axios";
// import fs from 'fs';
//
//
//
//
// async function write_to_csv(CSVtype: string){
//     const resE = await axios.get("/api/readE", {
//         headers: { "Content-Type": "application/json" },
//     });
//     if (resE.status == 200) {
//         console.log("success");
//         console.log(resE.data);
//     } else {
//         console.log("Fail");
//         console.log(resE.statusText);
//     }
//
//     const resN = await axios.get("/api/readN", {
//         headers: { "Content-Type": "application/json" },
//     });
//     if (res.status == 200) {
//         console.log("success");
//         console.log(resN.data);
//     } else {
//         console.log("Fail");
//         console.log(resN.statusText);
//     }
//
//
//     try {
//         //this will delete all the previous content in those files
//         fs.writeFileSync(edgePath, "startNodeID,endNodeID\n");
//         fs.writeFileSync(nodePath, "nodeID,xcoord,ycoord,floor,building,nodeType,longName,shortName\n")
//     } catch (error) {
//         console.error("Couldn't write to files!", error);
//         return;
//     }
//     //write to edges csv file
//
//     for(let i = 0; i < edges_list.length; i++){
//         fs.appendFileSync(edgePath, edges_list[i].start_node + "," + edges_list[i].end_node + "\n");
//     }
//
//     //write to nodes csv file
//
//     for(let i = 0; i < nodes_list.length; i++){
//         fs.appendFileSync(nodePath, nodes_list[i].node_id + "," + nodes_list[i].x_c + "," + nodes_list[i].y_c + "," + nodes_list[i].floor + "," + nodes_list[i].building + "," + nodes_list[i].node_type + "," + nodes_list[i].long_name + "," + nodes_list[i].short_name + "\n");
//     }
//
// }
// export {write_to_csv}
