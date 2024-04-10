import React from "react";
import {
  TextField,
  Select,
  InputLabel,
  FormControl,
  MenuItem,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import { MedicineDelivery } from "../common/MedicineDelivery.ts";
import MedicineRequestButtons from "../components/MedicineRequestButtons.tsx";
import { ChangeEvent, useState } from "react";
import BackgroundPattern from "../components/allyBackground.tsx";

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

  return (
    <div className="justify-center grid h-screen place-items-center">
      <BackgroundPattern />
      <div className="m-auto flex flex-col bg-background rounded-xl px-6 h-fit w-[700px] justify-center py-4">
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
                InputProps={{
                  classes: {
                    root: "transform hover:scale-105 transition-transform duration-300",
                  },
                }}
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
                  inputProps={{
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
                  }}
                >
                  <MenuItem value="Low">Low</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="High">High</MenuItem>
                  <MenuItem value="Emergency">Emergency</MenuItem>
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
                InputProps={{
                  classes: {
                    root: "transform hover:scale-105 transition-transform duration-300",
                  },
                }}
              />
              <TextField
                onChange={handleMedicineInput}
                value={delivery.medicineName}
                name="medicineName"
                id="medicineName"
                variant="filled"
                label="Medicine Name"
                placeholder="Medicine Name"
                InputProps={{
                  classes: {
                    root: "transform hover:scale-105 transition-transform duration-300",
                  },
                }}
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
                  inputProps={{
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
                  }}
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
                  inputProps={{
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
                  }}
                >
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
          <table className="w-full border-collapse bg-white rounded-lg transform hover:scale-105 transition-transform duration-300">
            <thead>
              <tr>
                <th
                  className="px-4 py-2 border border-gray-400 rounded-tl-lg"
                  style={{ color: "#050315", fontFamily: "Nunito, sans-serif" }}
                >
                  Index
                </th>
                <th
                  className="px-4 py-2 border border-gray-400"
                  style={{ color: "#050315", fontFamily: "Nunito, sans-serif" }}
                >
                  Employee Name
                </th>
                <th
                  className="px-4 py-2 border border-gray-400"
                  style={{ color: "#050315", fontFamily: "Nunito, sans-serif" }}
                >
                  Priority
                </th>
                <th
                  className="px-4 py-2 border border-gray-400"
                  style={{ color: "#050315", fontFamily: "Nunito, sans-serif" }}
                >
                  Location
                </th>
                <th
                  className="px-4 py-2 border border-gray-400"
                  style={{ color: "#050315", fontFamily: "Nunito, sans-serif" }}
                >
                  Medicine Name
                </th>
                <th
                  className="px-4 py-2 border border-gray-400"
                  style={{ color: "#050315", fontFamily: "Nunito, sans-serif" }}
                >
                  Quantity
                </th>
                <th
                  className="px-4 py-2 border border-gray-400 rounded-tr-lg"
                  style={{ color: "#050315", fontFamily: "Nunito, sans-serif" }}
                >
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((submission, index) => (
                <tr key={index}>
                  <td
                    className="px-4 py-2 border border-gray-400 rounded-bl-lg"
                    style={{
                      color: "rgb(0 40 102 / 1)",
                      fontFamily: "Nunito, sans-serif",
                    }}
                  >
                    {index + 1}
                  </td>
                  <td
                    className="px-4 py-2 border border-gray-400"
                    style={{
                      color: "rgb(0 40 102 / 1)",
                      fontFamily: "Nunito, sans-serif",
                    }}
                  >
                    {submission.employeeName}
                  </td>
                  <td
                    className="px-4 py-2 border border-gray-400"
                    style={{
                      color: "rgb(0 40 102 / 1)",
                      fontFamily: "Nunito, sans-serif",
                    }}
                  >
                    {submission.priority}
                  </td>
                  <td
                    className="px-4 py-2 border border-gray-400"
                    style={{
                      color: "rgb(0 40 102 / 1)",
                      fontFamily: "Nunito, sans-serif",
                    }}
                  >
                    {submission.location}
                  </td>
                  <td
                    className="px-4 py-2 border border-gray-400"
                    style={{
                      color: "rgb(0 40 102 / 1)",
                      fontFamily: "Nunito, sans-serif",
                    }}
                  >
                    {submission.medicineName}
                  </td>
                  <td
                    className="px-4 py-2 border border-gray-400"
                    style={{
                      color: "rgb(0 40 102 / 1)",
                      fontFamily: "Nunito, sans-serif",
                    }}
                  >
                    {submission.quantity}
                  </td>
                  <td
                    className="px-4 py-2 border border-gray-400 rounded-br-lg"
                    style={{
                      color: "rgb(0 40 102 / 1)",
                      fontFamily: "Nunito, sans-serif",
                    }}
                  >
                    {submission.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default MedicineDeliveryRequest;
