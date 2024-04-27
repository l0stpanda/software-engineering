import React from "react";
import {
  TextField,
  Select,
  InputLabel,
  FormControl,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { SelectChangeEvent } from "@mui/material/Select";
import { MedicineDelivery } from "../common/MedicineDelivery.ts";
import MedicineRequestButtons from "../components/MedicineRequestButtons.tsx";
import { ChangeEvent, useState } from "react";
import LocationDropdown from "../components/locationDropdown.tsx";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import UserDropdown from "../components/userDropdown.tsx";
import MedicineDropdown from "./MedicineDropdown.tsx";
function MedicineDeliveryReq() {
  const { getAccessTokenSilently } = useAuth0();
  const [delivery, setDelivery] = useState<MedicineDelivery>({
    employeeName: "",
    priority: "Medium",
    location: "",
    medicineName: "",
    quantity: "1",
    status: "Unassigned",
  });

  function clear() {
    setDelivery({
      employeeName: "",
      priority: "Medium",
      location: "",
      medicineName: "",
      quantity: "1",
      status: "Unassigned",
    });
  }

  // function handleNameInput(e: ChangeEvent<HTMLInputElement>) {
  //   setDelivery({ ...delivery, employeeName: e.target.value });
  // }

  const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<string, string>;
    },
    ref: React.Ref<unknown>,
  ) {
    return (
      <Slide direction="up" ref={ref} {...props} children={props.children} />
    );
  });

  function updateName(val: string) {
    setDelivery({ ...delivery, employeeName: val });
  }
  function handlePriorityInput(
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent,
  ) {
    const name = e.target.name;
    const value = e.target.value;
    setDelivery({ ...delivery, [name]: value });
  }

  function handleLocationInput(val: string) {
    setDelivery({ ...delivery, location: val });
  }

  function handleMedicineInput(val: string) {
    setDelivery({ ...delivery, medicineName: val });
  }

  function handleQuantityInput(e: ChangeEvent<HTMLInputElement>) {
    setDelivery({ ...delivery, quantity: e.target.value });
  }

  // function handleQuantityInput( e : ChangeEvent<HTMLInputElement>)
  // //   e:
  // //     | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  // //     | SelectChangeEvent,
  // // ) {
  // //   const name = e.target.name;
  // //   const value = e.target.value;
  //   setDelivery({ ...delivery, quantity: e.target.value });
  // }

  function handleStatusInput(
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent,
  ) {
    const name = e.target.name;
    const value = e.target.value;
    setDelivery({ ...delivery, [name]: value });
  }

  async function submit(delivery: MedicineDelivery) {
    const token = await getAccessTokenSilently();
    try {
      await axios.post("/api/medicineRequest", delivery, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
    } catch (e) {
      alert("Error storing in the database.");
      console.error(e);
      return;
    }
    setOpen(true);
  }

  // State for whether form confirmation dialog is open or closed
  const [open, setOpen] = useState(false);

  // Handle closing the form confirmation dialog
  function handleSubmitClose() {
    setOpen(false);
    clear();
    window.location.reload();
  }
  async function handleSubmit() {
    // Catch required fields not being filled out
    if (
      delivery.employeeName == "" ||
      delivery.location == "" ||
      delivery.medicineName == ""
    ) {
      alert(
        "employeeName, location, and medicineName Form must all be filled out",
      );
      return;
    }
  }

  return (
    <div className="w-full">
      <div className="m-auto mt-6 flex flex-col px-10 h-full w-full justify-center py-4">
        <h1
          className="font-extrabold text-3xl text-center transition-transform hover:scale-110 -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;"
          style={{
            color: "rgb(0 40 102 / 1)",
            fontFamily: "Nunito, sans-serif",
            fontSize: "34px",
            margin: "5px",
          }}
        >
          Medicine Delivery Form
        </h1>
        <p
          className="text-2xl font-bold mb-4 text-center"
          style={{
            color: "black",
            fontFamily: "PTSans, sans-serif",
            fontSize: "20px",
            margin: "5px",
          }}
        >
          Qiushi and Vincent
        </p>
        <div className="formDiv">
          <div className="inputDiv">
            <form className="flex flex-col gap-4 my-4" onSubmit={handleSubmit}>
              <UserDropdown
                room={delivery.employeeName}
                update={updateName}
                label={"Username"}
              />
              <FormControl variant="filled" fullWidth required>
                <InputLabel id="priority-label">Priority</InputLabel>
                <Select
                  labelId="priority-label"
                  id="priority"
                  value={delivery.priority}
                  onChange={handlePriorityInput}
                  name="priority"
                  required
                >
                  <MenuItem value="">None</MenuItem>
                  <MenuItem value="Low">Low</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="High">High</MenuItem>
                  <MenuItem value="Emergency">Emergency</MenuItem>
                </Select>
              </FormControl>

              <MedicineDropdown
                room={delivery.medicineName}
                update={handleMedicineInput}
                label={"Medicine Name"}
              />

              <LocationDropdown
                room={delivery.location}
                update={handleLocationInput}
                label={"Room"}
              />
              <TextField
                onChange={handleQuantityInput}
                value={delivery.quantity}
                name="quantity"
                id="quantity"
                variant="filled"
                type="number"
                inputProps={{ min: 0, max: 100, step: 1 }}
                label="Quantity"
                required={true}
              />

              <FormControl variant="filled" fullWidth required>
                <InputLabel id="status-label">Status</InputLabel>
                <Select
                  labelId="status-label"
                  id="status"
                  value={delivery.status}
                  onChange={handleStatusInput}
                  name="status"
                  required
                >
                  <MenuItem value="">None</MenuItem>
                  <MenuItem value="Unassigned">Unassigned</MenuItem>
                  <MenuItem value="Assigned">Assigned</MenuItem>
                  <MenuItem value="InProgress">InProgress</MenuItem>
                  <MenuItem value="Closed">Closed</MenuItem>
                </Select>
              </FormControl>
            </form>
          </div>
          <div className="flex justify-center">
            <MedicineRequestButtons
              delivery={delivery}
              clear={clear}
              submit={submit}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center"></div>
      <React.Fragment>
        <Dialog
          open={open}
          onClose={handleSubmitClose}
          TransitionComponent={Transition}
          keepMounted
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>We received your request!</DialogTitle>
          <DialogContent>
            <strong>Here are your responses:</strong>
            <br />
            Employee Name: {delivery.employeeName}
            <br />
            Priority: {delivery.priority}
            <br />
            Location: {delivery.location}
            <br />
            Medicine Name: {delivery.medicineName}
            <br />
            Quantity: {delivery.quantity}
            <br />
            Status: {delivery.status}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleSubmitClose} autoFocus>
              Okay
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </div>
  );
}

export default MedicineDeliveryReq;
