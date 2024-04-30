import {
  Select,
  MenuItem,
  SelectChangeEvent,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { DeleteOutline } from "@mui/icons-material";

type GeneralReq = {
  id: number;
  type: string;
  location: string;
  long_name_loc: string;
  status: string;
  emp_name: string;
  priority: string;
};

function PendingFlowerReq(props: GeneralReq) {
  const { getAccessTokenSilently } = useAuth0();

  // Formats date string to date format
  // function formatDate(requestDate: string) {
  //   const dateToFormat: Date = new Date(requestDate);
  //   return dateToFormat.toLocaleDateString();
  // }

  const [status, setStatus] = useState<string>(props.status);
  const [confirm, setConfirm] = useState<boolean>(false);
  const [id, setId] = useState<number>();

  async function handleStatusDropdown(e: SelectChangeEvent) {
    const token = await getAccessTokenSilently();
    setStatus(e.target.value);
    await axios.post(
      "/api/fetchAll/update",
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

  // Formats date string to time format
  // function formatTime(requestDate: string) {
  //   const dateToFormat: Date = new Date(requestDate);
  //   return dateToFormat.toLocaleTimeString();
  // }

  //takes in the id of the request to be deleted and deletes in the database
  async function deleteData() {
    console.log(id);
    setConfirm(false);
    try {
      const token = await getAccessTokenSilently();
      //call to backend
      await axios.delete(`api/fetchAll/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (e) {
      console.log(e);
      return;
    }

    window.location.reload();
  }

  function confirmDelete(id: number) {
    setId(id);
    setConfirm(true);
  }

  function noDelete() {
    window.location.reload();
  }

  return (
    <React.Fragment>
      <tr className="bg-background border-b-2 border-secondary" key={props.id}>
        <td className="p-3 text-sm">{props.type}</td>
        <td className="p-3 text-sm">
          <Select
            name="status"
            required={true}
            label="Status"
            onChange={handleStatusDropdown}
            value={status}
            defaultValue={props.status}
            size="small"
          >
            <MenuItem value={"Unassigned"}>Unassigned</MenuItem>
            <MenuItem value={"Assigned"}>Assigned</MenuItem>
            <MenuItem value={"InProgress"}>In Progress</MenuItem>
            <MenuItem value={"Closed"}>Closed</MenuItem>
          </Select>
        </td>
        <td className="p-3 text-sm">{props.priority}</td>
        <td className="p-3 text-sm">{props.long_name_loc}</td>
        <td className="p-3 text-sm">{props.emp_name}</td>
        <td className="p-3 text-sm">
          <IconButton
            className="px-7 flex justify-center transform hover:scale-125"
            onClick={() => confirmDelete(props.id)}
          >
            <DeleteOutline color="error" />
          </IconButton>
        </td>
      </tr>

      <Dialog open={confirm} onClose={noDelete}>
        <DialogTitle>Delete Confirmation</DialogTitle>
        <DialogContent>
          <strong>Are you sure you want to delete this request?</strong>
        </DialogContent>
        <DialogActions>
          <Button onClick={noDelete} autoFocus>
            No
          </Button>
          <Button onClick={deleteData} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default PendingFlowerReq;
