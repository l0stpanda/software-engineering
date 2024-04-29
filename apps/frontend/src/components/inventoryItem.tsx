import React, { useEffect, useState } from "react";
import { IconButton, TextField } from "@mui/material";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { DeleteOutline } from "@mui/icons-material";

interface InventoryItemProps {
  id: number;
  name: string;
  type: string;
  quant: number;
  onDelete: (id: number) => Promise<void>;
}

function InventoryItem(props: InventoryItemProps) {
  const [quantity, setQuantity] = useState(props.quant.toString());
  const { getAccessTokenSilently, user } = useAuth0();
  const LOW_QUANTITY_THRESHOLD = 10;
  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const token = await getAccessTokenSilently();
        await axios.get("/api/inventory", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (error) {
        console.error("Error fetching inventory list", error);
      }
    };
    fetchData().catch((error) => {
      console.error("Error from fetchData promise:", error);
    });
  }, [getAccessTokenSilently, user]);

  async function updateQuant(newQuant: number) {
    try {
      const token = await getAccessTokenSilently();
      const response = await axios.post(
        `/api/inventory/update`,
        {
          name: props.name,
          quant: newQuant,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log("Update successful:", response.data);
    } catch (e) {
      console.error(e);
      alert("Problem updating quantity");
    }
  }

  async function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const input = event.target.value;
    const token = await getAccessTokenSilently();
    let prevNumber: number = 0;
    let send: number;
    if (input.trim() === "") {
      setQuantity("");
    } else {
      send = parseInt(input, 10);
      if (!isNaN(send)) {
        setQuantity(input);
      }
      const values = await axios.get("/api/inventory", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(values.data);
      for (let i = 0; i < values.data.length; i++) {
        if (values.data[i].name == props.name) {
          prevNumber = values.data[i].quant;
        }
      }
      if (prevNumber != undefined && prevNumber < send) {
        updateQuant(send).then();
      }
    }
  }

  const rowStyle =
    props.quant < LOW_QUANTITY_THRESHOLD ? { backgroundColor: "yellow" } : {};

  return (
    <>
      <tr className="bg-background border-b-2 border-secondary" key={props.id}>
        <td className="p-3 text-sm">{props.name}</td>
        <td className="p-3 text-sm">{props.type}</td>
        <td className="p-3 text-sm">
          <TextField
            style={{ width: "250px", ...rowStyle }}
            onChange={handleChange}
            value={quantity}
            variant="filled"
            fullWidth={true}
            required
            label="Quantity"
            name="quant"
            type="text"
          />
        </td>
        <td className="p-3 text-sm">
          <IconButton
            className="px-7 flex justify-center transform hover:scale-125"
            onClick={() => props.onDelete(props.id)}
          >
            <DeleteOutline color="error" />
          </IconButton>
        </td>
      </tr>
    </>
  );
}

export default InventoryItem;
