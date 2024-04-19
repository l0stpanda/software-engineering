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

// import { inventoryType } from "common/src/inventoryType.ts";

interface InventoryItemProps {
  id: number;
  name: string;
  type: string;
  quant: number;
  onDelete: (id: number) => Promise<void>;
}
function InventoryItem(props: InventoryItemProps) {
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
