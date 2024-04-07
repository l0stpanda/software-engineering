// export default function MedicalDeviceRequest() {
//   return <div className=""></div>;
// }

import React, { ChangeEvent, useState } from "react";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { medicalDeviceDelivery } from "../../../../packages/common/src/medicalDeviceDelivery.ts";
import { Dayjs } from "dayjs";

function MedicalDeviceRequest() {
  const [formData, setFormData] = useState<medicalDeviceDelivery>({
    employeeName: "",
    roomName: "",
    medicalDeviceName: "",
    quantity: "",
    priority: "",
    status: "",
    deliveryDate: null,
  });

  const [arrayData, setArrayData] = useState<medicalDeviceDelivery[]>([]);

  function clear() {
    setFormData({
      employeeName: "",
      roomName: "",
      medicalDeviceName: "",
      quantity: "",
      priority: "",
      status: "",
      deliveryDate: null,
    });
  }

  function handlePriorityInput(e: SelectChangeEvent) {
    setFormData({ ...formData, priority: e.target.value });
  }

  function handleStatusInput(e: SelectChangeEvent) {
    setFormData({ ...formData, status: e.target.value });
  }

  function handleQuantityInput(e: SelectChangeEvent) {
    setFormData({ ...formData, quantity: e.target.value });
  }

  function handleDateChange(date: Dayjs | null) {
    setFormData({ ...formData, deliveryDate: date });
  }

  function handleFormInput(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  }

  function handleSubmit() {
    if (
      formData.employeeName == "" ||
      formData.roomName == "" ||
      formData.medicalDeviceName == "" ||
      formData.quantity == "" ||
      formData.priority == "" ||
      formData.status == "" ||
      formData.deliveryDate == null
    ) {
      alert("Please Fill in All Fields");
      return;
    }
    setArrayData((prevState) => [...prevState, formData]);
    clear();
  }

  return (
    <div className={"SanitationDiv"}>
      <h1>Medical Device Delivery Form</h1>
      <div className="">
        <TextField
          onChange={handleFormInput}
          value={formData.employeeName}
          name="employeeName"
          id="employeeName"
          variant="filled"
          label="Employee Name"
          required={true}
        />
      </div>
      <div>
        <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="priority">Priority*</InputLabel>
          <Select
            name="priority"
            labelId="priority"
            id="priority"
            value={formData.priority}
            onChange={handlePriorityInput}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"High"}>High</MenuItem>
            <MenuItem value={"Medium"}>Medium</MenuItem>
            <MenuItem value={"Low"}>Low</MenuItem>
            <MenuItem value={"Emergency"}>Emergency</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className={"roomName"}>
        <TextField
          onChange={handleFormInput}
          value={formData.roomName}
          name="roomName"
          id="roomName"
          variant="filled"
          label="Room Name"
          required={true}
        />
      </div>
      <br></br>
      <div>
        <TextField
          onChange={handleFormInput}
          value={formData.medicalDeviceName}
          name="medicalDeviceName"
          id="medicalDeviceName"
          variant="filled"
          label="Medical Device Name"
          style={{ width: "250px" }}
          required={true}
        />
      </div>
      <div>
        <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="Quantity">Quantity*</InputLabel>
          <Select
            name="Quantity"
            labelId="quantity"
            id="quantity"
            value={formData.quantity}
            onChange={handleQuantityInput}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"1"}>1</MenuItem>
            <MenuItem value={"2"}>2</MenuItem>
            <MenuItem value={"3"}>3</MenuItem>
            <MenuItem value={"4"}>4</MenuItem>
            <MenuItem value={"5"}>5</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div>
        <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="status">Status*</InputLabel>
          <Select
            name="Status"
            labelId="status"
            id="status"
            value={formData.status}
            onChange={handleStatusInput}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"Unassigned"}>Unassigned</MenuItem>
            <MenuItem value={"Assigned"}>Assigned</MenuItem>
            <MenuItem value={"InProgress"}>InProgress</MenuItem>
            <MenuItem value={"Closed"}>Closed</MenuItem>
          </Select>
        </FormControl>
        <div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Delivery Date*"
              value={formData.deliveryDate}
              onChange={handleDateChange}
              // renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </div>
      </div>
      <Button onClick={handleSubmit}>SUBMIT</Button>
      <Button onClick={clear}>CLEAR</Button>

      {arrayData.length > 0 && (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Employee Name</TableCell>
              <TableCell>Room Name</TableCell>
              <TableCell>Medical Device Name</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Priority</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {arrayData.map((data, index) => (
              <TableRow key={index}>
                <TableCell>{data.employeeName}</TableCell>
                <TableCell>{data.roomName}</TableCell>
                <TableCell>{data.medicalDeviceName}</TableCell>
                <TableCell>{data.quantity}</TableCell>
                <TableCell>{data.priority}</TableCell>
                <TableCell>{data.status}</TableCell>
                <TableCell>{data.deliveryDate?.toString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}

export default MedicalDeviceRequest;
