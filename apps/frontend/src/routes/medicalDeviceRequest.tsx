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
import BackgroundPattern from "../components/backgroundPattern.tsx";

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
    <div className="justify-center grid h-screen place-items-center">
      <BackgroundPattern />
      <div className="overflow-m-auto flex flex-col bg-background rounded-xl px-10 h-fit w-[700px] justify-center py-4">
        <h1 className="m-2 font-header text-primary font-bold text-3xl text-center">
          Medical Device Delivery Form
        </h1>
        <div className="flex flex-col gap-4 my-4">
          <TextField
            onChange={handleFormInput}
            value={formData.employeeName}
            name="employeeName"
            id="employeeName"
            variant="filled"
            label="Employee Name"
            required={true}
          />
          <FormControl variant="filled">
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
          <TextField
            onChange={handleFormInput}
            value={formData.roomName}
            name="roomName"
            id="roomName"
            variant="filled"
            label="Room Name"
            required={true}
          />
          <TextField
            onChange={handleFormInput}
            value={formData.medicalDeviceName}
            name="medicalDeviceName"
            id="medicalDeviceName"
            variant="filled"
            label="Medical Device Name"
            required={true}
          />
          <FormControl variant="filled">
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
          <FormControl variant="filled">
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
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              sx={{ bgcolor: "#eceff0" }}
              label="Delivery Date*"
              value={formData.deliveryDate}
              onChange={handleDateChange}
              // renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <Button
            onClick={clear}
            variant="contained"
            size="large"
            sx={{ borderRadius: "30px" }}
          >
            CLEAR
          </Button>
          <Button
            onClick={handleSubmit}
            type="submit"
            id="requestSubmit"
            variant="contained"
            size="large"
            sx={{ borderRadius: "30px" }}
          >
            SUBMIT
          </Button>

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
      </div>
    </div>
  );
}

export default MedicalDeviceRequest;
