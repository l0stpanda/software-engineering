import { useAuth0 } from "@auth0/auth0-react";
import {
  Button,
  // Dialog,
  // FormControl,
  // InputLabel,
  // MenuItem,
  // Select,
  // SelectChangeEvent,
  // TextField,
} from "@mui/material";
import axios from "axios";

import { inventoryType } from "common/src/inventoryType.ts";

function InventoryItem(props: inventoryType) {
  const { getAccessTokenSilently } = useAuth0();

  //takes in the id of the request to be deleted and deletes in the database
  async function deleteData(idVal: number) {
    if (
      !window.confirm(
        `Are you sure you want to delete the inventory item with ID ${idVal}?`,
      )
    ) {
      return;
    }
    console.log(idVal);
    try {
      const token = await getAccessTokenSilently();
      //call to backend
      await axios.delete(`/api/inventory/${idVal}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (e) {
      console.log(e);
      alert("Problem Deleting");
      return;
    }
    alert("Successfully deleted inventory item with ID number " + idVal);
    //window must be reloaded on delete to show updated results
    window.location.reload();
  }

  return (
    <>
      <tr className="bg-background border-b-2 border-secondary" key={props.id}>
        <td className="p-3 text-sm">{props.name}</td>
        <td className="p-3 text-sm">{props.type}</td>
        <td className="p-3 text-sm">{props.quant}</td>
        <td className="p-3 text-sm">
          <Button
            variant="contained"
            color="primary"
            component="span"
            sx={{ borderRadius: "30px", margin: "auto 0" }}
            className="w-50 text-center self-end"
            onClick={() => deleteData(props.id)}
          >
            Delete
          </Button>
        </td>
      </tr>
    </>
  );
}

export default InventoryItem;
