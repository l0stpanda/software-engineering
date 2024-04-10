import trashIcon from "../assets/trashicon.png";
import { Select, MenuItem, SelectChangeEvent } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";

type FlowerReqData = {
  id: number;
  name: string;
  requestDate: string;
  status: string;
};
function PendingRequestItem(props: FlowerReqData) {
  // Formats date string to date format
  function formatDate(requestDate: string) {
    const dateToFormat: Date = new Date(requestDate);
    return dateToFormat.toLocaleDateString();
  }

  const [status, setStatus] = useState<string>(props.status);

  async function handleStatusDropdown(e: SelectChangeEvent) {
    setStatus(e.target.value);
    await axios.post("/api/flowerRequest/update", {
      id: props.id,
      status: e.target.value,
    });
    return;
  }

  // Formats date string to time format
  function formatTime(requestDate: string) {
    const dateToFormat: Date = new Date(requestDate);
    return dateToFormat.toLocaleTimeString();
  }

  //takes in the id of the request to be deleted and deletes in the database
  async function deleteData(idVal: number) {
    console.log(idVal);
    try {
      //call to backend
      await axios.delete(`api/flowerRequest/${idVal}`);
    } catch (e) {
      console.log(e);
      return;
    }
    alert("Successfully deleted flower request with ID number " + idVal);
    //window must be reloaded on delete to show updated results
    window.location.reload();
  }

  return (
    <tr className="bg-background border-b-2 border-secondary" key={props.id}>
      <td className="p-3 text-sm">{props.id}</td>
      <td className="p-3 text-sm">
        <Select
          name="status"
          required={true}
          label="Status"
          onChange={handleStatusDropdown}
          value={status}
          defaultValue={props.status}
        >
          <MenuItem value={"unassigned"}>Unassigned</MenuItem>
          <MenuItem value={"assigned"}>Assigned</MenuItem>
          <MenuItem value={"inprogress"}>In Progress</MenuItem>
          <MenuItem value={"closed"}>Closed</MenuItem>
        </Select>
      </td>
      <td className="p-3 text-sm">{formatDate(props.requestDate)}</td>
      <td className="p-3 text-sm">{formatTime(props.requestDate)}</td>
      <td className="p-3 text-sm">{props.name}</td>
      <td className="p-3 text-sm">
        <button>
          <img
            onClick={() => deleteData(props.id)}
            src={trashIcon}
            alt="Trash icon"
            className="px-7 flex justify-center transform h-6 hover:scale-125"
          />
        </button>
      </td>
    </tr>
  );
}

export default PendingRequestItem;
