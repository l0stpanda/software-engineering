import { useAuth0 } from "@auth0/auth0-react";
import trashIcon from "../assets/trashicon.png";

import axios from "axios";

import { inventoryType } from "common/src/inventoryType.ts";

function InventoryItem(props: inventoryType) {
  const { getAccessTokenSilently } = useAuth0();

  //takes in the id of the request to be deleted and deletes in the database
  async function deleteData(idVal: number) {
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
        <td className="p-3 text-sm">{props.id}</td>
        <td className="p-3 text-sm">{props.name}</td>
        <td className="p-3 text-sm">{props.type}</td>
        <td className="p-3 text-sm">{props.quant}</td>
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
    </>
  );
}

export default InventoryItem;
