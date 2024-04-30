import { DeleteOutline } from "@mui/icons-material";
import React, { useState } from "react";
import {
  Button,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
interface InventoryItemProps {
  id: number;
  name: string;
  type: string;
  quant: number;
  onDelete: (id: number) => Promise<void>;
  onAdd: (id: number, quantToAdd: number) => Promise<void>;
}

function InventoryItem(props: InventoryItemProps) {
  const lowToRed = 10;
  const lowToYellow = 50;

  const [open, setOpen] = useState(false);
  const [quantityToAdd, setQuantityToAdd] = useState<number>(0);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAddQuantity = async () => {
    if (quantityToAdd > 0) {
      await props.onAdd(props.id, quantityToAdd);
      setQuantityToAdd(0); // Reset input after submission
    }
    handleClose();
  };
  const quantityStyle = {
    backgroundColor:
      props.quant < lowToRed
        ? "red"
        : props.quant < lowToYellow
          ? "yellow"
          : "transparent",
  };

  return (
    <>
      <tr className="bg-background border-b-2 border-secondary" key={props.id}>
        <td className="p-3 text-sm">{props.name}</td>
        <td className="p-3 text-sm">{props.type}</td>
        <td className="p-3 text-sm" style={quantityStyle}>
          {props.quant}
        </td>
        <td className="p-3 text-sm">
          <Button
            variant="contained"
            color="primary"
            component="span"
            sx={{ borderRadius: "30px", margin: "auto 0" }}
            className="w-50 text-center self-end"
            onClick={handleOpen}
          >
            Add
          </Button>
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
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Quantity</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="quantityToAdd"
            label="Additional Quantity"
            type="number"
            fullWidth
            value={quantityToAdd}
            onChange={(e) => setQuantityToAdd(parseInt(e.target.value, 10))}
            inputProps={{ min: "0" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddQuantity}>Submit</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default InventoryItem;
