import React, { useEffect, useState } from "react";
import { Alert, Snackbar } from "@mui/material";
import { AlertColor } from "@mui/material/Alert";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import InventoryItem from "../components/inventoryItem.tsx";
import { inventoryType } from "common/src/inventoryType.ts";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";

//default test
export default function DisplayInventory() {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] =
    useState<AlertColor>("success");
  const [inventoryResponse, setinventoryResponse] = useState<inventoryType>({
    id: 0,
    name: "",
    type: "Medicine",
    quant: 0,
  });
  const { getAccessTokenSilently, user } = useAuth0();

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const showSnackbar = (message: string, severity: AlertColor) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  // Use state for records being displayed
  const [records, setRecords] = useState<inventoryType[]>([]);
  const [open, setOpen] = useState<boolean>(false);

  // Get records from database, and update useState
  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const token = await getAccessTokenSilently();
        const response = await axios.get("/api/inventory", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRecords(response.data); // Assuming the data is an array of inventory
      } catch (error) {
        console.error("Error fetching inventory list", error);
      }
    };

    fetchData().catch((error) => {
      console.error("Error from fetchData promise:", error);
    });
  }, [getAccessTokenSilently, user]);

  const onAdd = async (id: number, quantToAdd: number) => {
    const item = records.find((item) => item.id === id);
    if (!item) {
      console.error("Item not found in the state.");
      alert("Item not found");
      return;
    }

    const newQuant = item.quant + quantToAdd; // Calculate the new quantity

    try {
      const token = await getAccessTokenSilently();
      await axios.post(
        `/api/inventory/update`,
        {
          name: item.name, // API uses name to identify the item
          quant: newQuant, // Send the total new quantity
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // Update the state to reflect the new quantity locally
      const updatedRecords = records.map((record) => {
        if (record.id === id) {
          return { ...record, quant: newQuant };
        }
        return record;
      });
      setRecords(updatedRecords);
      showSnackbar(
        ` Add ${quantToAdd} to ${item.name} successfully`,
        "success",
      );
    } catch (error) {
      console.error("Failed to update the quantity on the server.", error);
      alert("Failed to update quantity");
    }
  };
  function handleFormUpdate(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setinventoryResponse({
      ...inventoryResponse,
      [name]: name === "quant" ? Number(value) : value,
    });
  }

  async function handleSubmit() {
    const updatedInventoryResponse = {
      ...inventoryResponse,
      quant: Number(inventoryResponse.quant),
    };
    if (updatedInventoryResponse.name == "") {
      showSnackbar("Name must be filled out", "error");
      return;
    }
    const token = await getAccessTokenSilently();
    try {
      await axios.post(`/api/inventory`, updatedInventoryResponse, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const received = await axios.get("/api/inventory", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRecords(received.data);

      showSnackbar("New Item has been created", "success");
    } catch (e) {
      console.error(e);
      showSnackbar("Problems have occurred", "error");
    }

    setinventoryResponse({
      id: 0,
      name: "",
      type: "Medicine",
      quant: 0,
    });
    setOpen(false);
  }
  const handleDelete = async () => {
    const item = records.find((record) => record.id === id);
    const itemName = item ? item.name : "Unknown Item"; // Default to "Unknown Item" if not found
    const itemID = item ? item.id : -1;
    // if (
    //   !window.confirm(
    //     `Are you sure you want to delete the inventory item ${itemName}?`,
    //   )
    // ) {
    //   return;
    // }

    try {
      const token = await getAccessTokenSilently();
      setConfirm(false);
      await axios.post(
        `/api/inventory/delete/${id}`,
        { id: itemID, name: itemName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const received = await axios.get("/api/inventory", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRecords(received.data);
    } catch (e) {
      console.error(e);
      return;
    }

    window.location.reload();
  };

  function handleOpen() {
    setOpen(true);
    return;
  }

  function handleSubmitClose() {
    setOpen(false);
    return;
  }

  function handleDropdownChange(e: SelectChangeEvent) {
    setinventoryResponse({ ...inventoryResponse, type: e.target.value });
  }

  const [confirm, setConfirm] = useState<boolean>(false);
  const [id, setId] = useState<number>();

  function confirmDelete(id: number) {
    setId(id);
    setConfirm(true);
  }

  function noDelete() {
    window.location.reload();
  }

  return (
    <React.Fragment>
      <div className="px-8 p5 h-screen bg-background">
        <div className="flex flex-row">
          <h1 className="my-2 font-header text-primary font-bold text-3xl text-center mx-auto">
            Inventory List
          </h1>
          <Button
            variant="contained"
            color="primary"
            component="span"
            sx={{ borderRadius: "30px", margin: "auto 0" }}
            className="w-50 text-center self-end"
            onClick={handleOpen}
          >
            New Inventory Item
          </Button>
        </div>
        <table className="w-full">
          <thead className="bg-secondary border-b-2 border-b-primary">
            <tr>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                Name
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                Type
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                Quantity
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                Add
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {/* Map through the records and create a row for each record */}
            {records.map((record) => (
              <InventoryItem
                key={record.id}
                id={record.id}
                name={record.name}
                type={record.type}
                quant={record.quant}
                onDelete={async () => confirmDelete(record.id)}
                onAdd={onAdd}
              />
            ))}
          </tbody>
        </table>

        <Dialog open={open} onClose={handleSubmitClose}>
          <form>
            <div className="m-auto flex flex-col bg-background rounded-xl px-6 min-w-96 h-fit justify-center py-4">
              <h1 className="my-3 font-header text-primary font-bold text-3xl text-center">
                New Item
              </h1>
              <div className="flex flex-col gap-2 my-2">
                <TextField
                  onChange={handleFormUpdate}
                  value={inventoryResponse.name}
                  variant="filled"
                  fullWidth={true}
                  required
                  label="Name"
                  name="name"
                  type="required"
                />

                <FormControl variant="filled" required>
                  <InputLabel id="type">Type</InputLabel>
                  <Select
                    name="type"
                    labelId="type"
                    id="type"
                    value={inventoryResponse.type}
                    onChange={handleDropdownChange}
                  >
                    <MenuItem value={"Medicine"}>Medicine</MenuItem>
                    <MenuItem value={"Medical Device"}>Medical Device</MenuItem>
                  </Select>
                </FormControl>

                <TextField
                  onChange={handleFormUpdate}
                  value={inventoryResponse.quant}
                  variant="filled"
                  fullWidth={true}
                  required
                  label="Quant"
                  name="quant"
                  type="required"
                />
                <Button
                  onClick={handleSubmit}
                  variant="contained"
                  className="w-32 self-center"
                  sx={{ borderRadius: "30px" }}
                >
                  Create
                </Button>
              </div>
            </div>
          </form>
        </Dialog>

        <Dialog open={confirm} onClose={noDelete}>
          <DialogTitle>Delete Confirmation</DialogTitle>
          <DialogContent>
            <strong>Are you sure you want to delete this request?</strong>
          </DialogContent>
          <DialogActions>
            <Button onClick={noDelete} autoFocus>
              No
            </Button>
            <Button onClick={handleDelete} autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity={snackbarSeverity}
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </div>
    </React.Fragment>
  );
}
