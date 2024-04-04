/*This is the functions that the front end should use repeatedly*/
import axios from "axios";

//Function used to collect the edges from the database to the frontend
export async function ReadEdge() {
  const res = await axios.get("/api/readE", {
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
