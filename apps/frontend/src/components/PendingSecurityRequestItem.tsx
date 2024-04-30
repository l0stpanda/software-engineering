import trashIcon from "../assets/trashicon.png";
import { Select, MenuItem, SelectChangeEvent } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

type securityRequestLocation = {
  id: number;
  date: string;
  description: string;
  type: string;
};
type securityRequest = {
  id: number;
  status: string;
  priority: string;
  date: string;
  description: string;
  securityRequestLocation: securityRequestLocation[];
};

function PendingSecurityRequest(props: securityRequest) {
  const { getAccessTokenSilently } = useAuth0();

  //Formats date string to date format
  function formatDate(requestDate: string) {
    const dateToFormat: Date = new Date(requestDate);
    return dateToFormat.toLocaleDateString();
  }

  const [status, setStatus] = useState<string>(props.status);

  async function handleStatusDropdown(e: SelectChangeEvent) {
    const token = await getAccessTokenSilently();
    setStatus(e.target.value);
    await axios.post(
      "/api/securityRequest/update",
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
      await axios.delete(`/api/securityRequest/${idVal}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (e) {
      console.log(e);
      return;
    }
    alert("Successfully deleted Security Request with ID number " + idVal);
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
      <td className="p-3 text-sm">
        {formatDate(props.securityRequestLocation[0].date)}
      </td>
      <td className="p-3 text-sm">
        {props.securityRequestLocation[0].description}
      </td>
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

export default PendingSecurityRequest;
