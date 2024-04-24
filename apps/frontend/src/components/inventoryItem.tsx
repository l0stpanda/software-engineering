import React, { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

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

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const input = event.target.value;
    if (input.trim() === "") {
      // If input is empty, set quantity to "0" and update the server with 0
      setQuantity("0");
      updateQuant(0);
    } else {
      const newQuant = parseInt(input, 10);
      if (!isNaN(newQuant)) {
        setQuantity(input);
        updateQuant(newQuant);
      }
    }
  }

  return (
    <>
      <tr className="bg-background border-b-2 border-secondary" key={props.id}>
        <td className="p-3 text-sm">{props.name}</td>
        <td className="p-3 text-sm">{props.type}</td>
        <td className="p-3 text-sm">
          <TextField
            style={{ width: "250px" }}
            onChange={handleChange}
            value={quantity}
            variant="filled"
            fullWidth={true}
            required
            label="Quant"
            name="quant"
            type="text"
          />
        </td>
        <td className="p-3 text-sm">
          <Button
            variant="contained"
            color="primary"
            component="span"
            sx={{ borderRadius: "30px", margin: "auto 0" }}
            className="w-50 text-center self-end"
            onClick={() => props.onDelete(props.id)}
          >
            Delete
          </Button>
        </td>
      </tr>
    </>
  );
}

export default InventoryItem;
