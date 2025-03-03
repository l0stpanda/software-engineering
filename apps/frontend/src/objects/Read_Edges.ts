/*This is the functions that the front end should use repeatedly*/
import axios from "axios";

export async function ReadEdge() {
  const res = await axios.get("/api/read/edges", {
    headers: { "Content-Type": "application/json" },
  });

  if (res.status == 200) {
    console.log("success");
    console.log(res.data);
    return res.data;
  } else {
    console.log("Fail");
    console.log(res.statusText);
  }
}
