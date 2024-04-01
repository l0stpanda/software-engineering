import React from "react";
//import axios from "axios";
import { PostReq } from "../objects/DAO_FlowerReq.ts";
import { flowerRequestType } from "common/src/flowerRequest.ts";

export default function FlowerRequest() {
  const [formData, setFormData] = React.useState<flowerRequestType>({
    room: "",
    sent_by: "",
    note: "",
    deliv: "",
  });

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await PostReq(formData);
    setFormData({ ...formData, room: "", note: "", sent_by: "", deliv: "" });
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Sent By:
        <input
          type="text"
          name="sent_by"
          value={formData.sent_by}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        Room
        <input
          type="text"
          name="room"
          value={formData.room}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        Note
        <input
          type="text"
          name="note"
          value={formData.note}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        Note
        <input
          type="text"
          name="deliv"
          value={formData.note}
          onChange={handleInputChange}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}
