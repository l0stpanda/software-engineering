import axios from "axios";
import { flowerRequestType } from "common/src/flowerRequest.ts";

export async function PostReq(formData: flowerRequestType) {
  const res = await axios.post("/api/flowerRequest", formData, {
    headers: { "Content-Type": "application/json" },
  });
  if (res.status == 200) {
    console.log(formData.sent_by);
    console.log("success");
  } else {
    console.log(res.statusText);
  }
}
