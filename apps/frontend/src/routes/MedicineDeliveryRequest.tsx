import React from "react";
import {
  // Button,
  // Dialog,
  // DialogActions,
  // DialogContent,
  // DialogTitle,
  TextField,
  Select,
  // MenuItem,
  InputLabel,
  FormControl,
  MenuItem,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import { MedicineDelivery } from "../common/MedicineDelivery.ts";
import MedicineRequestButtons from "../components/MedicineRequestButtons.tsx";
import { ChangeEvent, useState } from "react";

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

  function handleLocationInput(e: ChangeEvent<HTMLInputElement>) {
    setDelivery({ ...delivery, location: e.target.value });
  }

  function handleMedicineInput(e: ChangeEvent<HTMLInputElement>) {
    setDelivery({ ...delivery, medicineName: e.target.value });
  }

  function handleQuantityInput(
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent,
  ) {
    const name = e.target.name;
    const value = e.target.value;
    setDelivery({ ...delivery, [name]: value });
  }

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
    clear(); // Optionally clear form after submission
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

  // Your page is everything in this div
  return (
    <div className="justify-center grid h-screen place-items-center">
      <div className="m-auto flex flex-col bg-background rounded-xl px-6 h-fit w-[700px] justify-center py-4">
        <h1 className="my-2 font-header text-primary font-bold text-3xl text-center">
          Medicine Delivery Form
        </h1>
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
              />
              <FormControl variant="filled" fullWidth>
                <InputLabel id="priority-label">Priority</InputLabel>
                <Select
                  labelId="priority-label"
                  id="priority"
                  value={delivery.priority}
                  onChange={handlePriorityInput}
                  name="priority"
                  required
                >
                  <MenuItem value="Low">Low</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="High">High</MenuItem>
                  <MenuItem value="Emergency">Emergency</MenuItem>
                  <MenuItem value="Unassigned">Unassigned</MenuItem>
                  <MenuItem value="Assigned">Assigned</MenuItem>
                  <MenuItem value="InProgress">InProgress</MenuItem>
                  <MenuItem value="Closed">Closed</MenuItem>
                </Select>
              </FormControl>
              <TextField
                onChange={handleLocationInput}
                value={delivery.location}
                name="location"
                id="location"
                variant="filled"
                label="Location Name"
                placeholder="Location"
              />
              <TextField
                onChange={handleMedicineInput}
                value={delivery.medicineName}
                name="medicineName"
                id="medicineName"
                variant="filled"
                label="Medicine Name"
                placeholder="Medicine Name"
              />
              <FormControl variant="filled" fullWidth>
                <InputLabel id="quantity-label">Quantity</InputLabel>
                <Select
                  labelId="quantity-label"
                  id="quantity"
                  value={delivery.quantity}
                  onChange={handleQuantityInput}
                  name="quantity"
                  required
                >
                  {[...Array(15).keys()].map((num) => (
                    <MenuItem key={num + 1} value={num + 1}>
                      {num + 1}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl variant="filled" fullWidth>
                <InputLabel id="status-label">Status</InputLabel>
                <Select
                  labelId="status-label"
                  id="status"
                  value={delivery.status}
                  onChange={handleStatusInput}
                  name="status"
                  required
                >
                  <MenuItem value="Unassigned">Unassigned</MenuItem>
                  <MenuItem value="Assigned">Assigned</MenuItem>
                  <MenuItem value="InProgress">InProgress</MenuItem>
                  <MenuItem value="Closed">Closed</MenuItem>
                </Select>
              </FormControl>
            </form>
          </div>
          <MedicineRequestButtons
            delivery={delivery}
            clear={clear}
            submit={submit}
          />
        </div>
        <h2>Submitted Requests</h2>
        <ul className="submission-list">
          {submissions.map((submission, index) => (
            <li key={index}>
              {index + 1}. EmployeeName: {submission.employeeName}, Priority：
              {submission.priority}, Location：{submission.location},
              MedicineName:{submission.medicineName}, Quantity:{" "}
              {submission.quantity}, Status: {submission.status}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MedicineDeliveryRequest;
