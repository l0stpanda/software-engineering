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
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import { MedicineDelivery } from "../common/MedicineDelivery.ts";
import MedicineRequestButtons from "../components/MedicineRequestButtons.tsx";
import { ChangeEvent, useState } from "react";
import BackgroundPattern from "../components/allyBackground.tsx";
import LocationDropdown from "../components/locationDropdown.tsx";

function MedicineDeliveryRequest() {
  const [delivery, setDelivery] = useState<MedicineDelivery>({
    employeeName: "",
    priority: "Medium",
    location: "",
    medicineName: "",
    quantity: "1",
    status: "Unassigned",
  });
  const [submissions, setSubmissions] = useState<MedicineDelivery[]>([]);

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

  function handleNameInput(e: ChangeEvent<HTMLInputElement>) {
    setDelivery({ ...delivery, employeeName: e.target.value });
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

  function handleMedicineInput(e: ChangeEvent<HTMLInputElement>) {
    setDelivery({ ...delivery, medicineName: e.target.value });
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

  function submit(delivery: MedicineDelivery) {
    setSubmissions([...submissions, delivery]);
    setOpen(true);
  }

  // State for whether form confirmation dialog is open or closed
  const [open, setOpen] = useState(false);

  // Handle closing the form confirmation dialog
  function handleSubmitClose() {
    setOpen(false);
    clear();
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
    <div className="justify-center grid min-h-screen max-h-fit place-items-center">
      <BackgroundPattern />
      <div className="m-auto mt-6 flex flex-col bg-background rounded-xl px-10 h-fit w-[700px] justify-center py-4">
        <h1
          className="text-2xl font-bold mb-4 text-center transform hover:-translate-y-2 transition-transform duration-300"
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
              <TextField
                onChange={handleNameInput}
                value={delivery.employeeName}
                name="employeeName"
                id="employeeName"
                variant="filled"
                label="Employee Name"
                placeholder="Name"
                required
                /*InputProps={{
                                  classes: {
                                    root: "transform hover:scale-105 transition-transform duration-300",
                                  },
                                }}*/
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
                  /*inputProps={{
                                      classes: {
                                        root: "transform hover:scale-105 transition-transform duration-300",
                                      },
                                    }}
                                    MenuProps={{
                                      PaperProps: {
                                        style: {
                                          transform: "translateZ(0)",
                                        },
                                      },
                                    }}*/
                >
                  <MenuItem value="">None</MenuItem>
                  <MenuItem value="Low">Low</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="High">High</MenuItem>
                  <MenuItem value="Emergency">Emergency</MenuItem>
                </Select>
              </FormControl>
              {/*<TextField*/}
              {/*    onChange={handleLocationInput}*/}
              {/*    value={delivery.location}*/}
              {/*    name="location"*/}
              {/*    id="location"*/}
              {/*    variant="filled"*/}
              {/*    label="Location Name"*/}
              {/*    placeholder="Location"*/}
              {/*    /*InputProps={{*/}
              {/*      classes: {*/}
              {/*        root: "transform hover:scale-105 transition-transform duration-300",*/}
              {/*      },*/}
              {/*    }}*/}
              {/*/>*/}
              <LocationDropdown
                room={delivery.location}
                update={handleLocationInput}
                label={"Room"}
              />
              <TextField
                onChange={handleMedicineInput}
                value={delivery.medicineName}
                name="medicineName"
                id="medicineName"
                variant="filled"
                label="Medicine Name"
                placeholder="Medicine Name"
                required
                /*InputProps={{
                                  classes: {
                                    root: "transform hover:scale-105 transition-transform duration-300",
                                  },
                                }}*/
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
                  /*inputProps={{
                                      classes: {
                                        root: "transform hover:scale-105 transition-transform duration-300",
                                      },
                                    }}
                                    MenuProps={{
                                      PaperProps: {
                                        style: {
                                          transform: "translateZ(0)",
                                        },
                                      },
                                    }}*/
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

      <div className="flex justify-center items-center">
        <div className="bg-white p-8 rounded-lg">
          <h2
            className="text-2xl font-bold mb-4 text-center transform hover:-translate-y-2 transition-transform duration-300"
            style={{
              color: "rgb(0 40 102 / 1)",
              fontFamily: "Nunito, sans-serif",
              fontSize: "34px",
              margin: "30px",
            }}
          >
            Submitted Requests
          </h2>
          <Table
            className="bg-gray rounded-xl justify-center py-10"
            sx={{ bgcolor: "#eceff0" }}
          >
            <TableHead className="w-full table-auto mt-4 border-collapse border-b-2 border-secondary">
              <TableRow>
                <TableCell className="px-4 py-2 text-sm font-semibold tracking-wide text-left bg-gray-100">
                  Index
                </TableCell>
                <TableCell className="px-4 py-2 text-sm font-semibold tracking-wide text-left bg-gray-100">
                  Employee Name
                </TableCell>
                <TableCell className="px-4 py-2 text-sm font-semibold tracking-wide text-left bg-gray-100">
                  Priority
                </TableCell>
                <TableCell className="px-4 py-2 text-sm font-semibold tracking-wide text-left bg-gray-100">
                  Location
                </TableCell>
                <TableCell className="px-4 py-2 text-sm font-semibold tracking-wide text-left bg-gray-100">
                  Medicine Name
                </TableCell>
                <TableCell className="px-4 py-2 text-sm font-semibold tracking-wide text-left bg-gray-100">
                  Quantity
                </TableCell>
                <TableCell className="px-4 py-2 text-sm font-semibold tracking-wide text-left bg-gray-100">
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {submissions.map((submission, index) => (
                <TableRow key={index}>
                  <TableCell className="px-4 py-2 text-sm font-semibold tracking-wide text-left bg-gray-100">
                    {index + 1}
                  </TableCell>
                  <TableCell className="px-4 py-2 text-sm font-semibold tracking-wide text-left bg-gray-100">
                    {submission.employeeName}
                  </TableCell>
                  <TableCell className="px-4 py-2 text-sm font-semibold tracking-wide text-left bg-gray-100">
                    {submission.priority}
                  </TableCell>
                  <TableCell className="px-4 py-2 text-sm font-semibold tracking-wide text-left bg-gray-100">
                    {submission.location}
                  </TableCell>
                  <TableCell className="px-4 py-2 text-sm font-semibold tracking-wide text-left bg-gray-100">
                    {submission.medicineName}
                  </TableCell>
                  <TableCell className="px-4 py-2 text-sm font-semibold tracking-wide text-left bg-gray-100">
                    {submission.quantity}
                  </TableCell>
                  <TableCell className="px-4 py-2 text-sm font-semibold tracking-wide text-left bg-gray-100">
                    {submission.status}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <Dialog open={open} onClose={handleSubmitClose}>
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
    </div>
  );
}

export default MedicineDeliveryRequest;
