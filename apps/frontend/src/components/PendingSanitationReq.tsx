import trashIcon from "../assets/trashicon.png";
import { Select, MenuItem, SelectChangeEvent } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

type SanitationReq = {
  room_name: string;
  severity: string;
  hazardous: string;
};
type LostFoundData = {
  id: number;
  status: string;
  priority: string;
  sanitationID: SanitationReq[];
};

function PendingSanitationRequest(props: LostFoundData) {
  const { getAccessTokenSilently } = useAuth0();

  const [status, setStatus] = useState<string>(props.status);
  //const [priority, setPrior] = useState<string>(props.priority);

  async function handleStatusDropdown(e: SelectChangeEvent) {
    const token = await getAccessTokenSilently();
    setStatus(e.target.value);
    await axios.post(
      "/api/sanitationReq/update",
      {
        id: props.id,
        status: e.target.value,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return;
  }

  //takes in the id of the request to be deleted and deletes in the database
  async function deleteData(idVal: number) {
    console.log(idVal);
    try {
      const token = await getAccessTokenSilently();
      //call to backend
      await axios.delete(`/api/sanitationRequest/${idVal}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (e) {
      console.log(e);
      return;
    }
    alert(
      "Successfully deleted Pending Sanitation Request with ID number " + idVal,
    );
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
          <MenuItem value={"Unassigned"}>Unassigned</MenuItem>
          <MenuItem value={"Assigned"}>Assigned</MenuItem>
          <MenuItem value={"InProgress"}>In Progress</MenuItem>
          <MenuItem value={"Closed"}>Closed</MenuItem>
        </Select>
      </td>
      <td className="p-3 text-sm">{props.priority}</td>
      <td className="p-3 text-sm">{props.sanitationID[0].severity}</td>
      <td className="p-3 text-sm">{props.sanitationID[0].room_name}</td>
      <td className="p-3 text-sm">{props.sanitationID[0].hazardous}</td>
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

export default PendingSanitationRequest;
