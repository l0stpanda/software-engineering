/*This is the functions that the front end should use repeatedly*/
import axios from "axios";

export async function ReadNode() {
  const res = await axios.get("/api/read/nodes");

  if (res.status == 200) {
    console.log("success");
    return res.data;
  } else {
    console.log(res.statusText);
  }
}
