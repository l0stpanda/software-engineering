import React, { ChangeEvent, FormEvent, useState } from "react";
import {
  TextField,
  Button,
  FormControl,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
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
import { medicalDeviceDelivery } from "common/src/medicalDeviceDelivery.ts";
import { Dayjs } from "dayjs";
import BackgroundPattern from "../components/allyBackground.tsx";
import LocationDropdown from "../components/locationDropdown.tsx";

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
  const [open, setOpen] = useState(false);

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

  function handleDateChange(date: Dayjs | null) {
    setFormData({ ...formData, deliveryDate: date });
  }

  function handleFormInput(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  }

  function updateRoom(val: string) {
    setFormData({ ...formData, roomName: val });
  }
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (
      formData.employeeName == "" ||
      formData.roomName == "" ||
      formData.medicalDeviceName == "" ||
      formData.quantity == "" ||
      formData.priority == "" ||
      formData.status == "" ||
      formData.deliveryDate == null
    ) {
      return;
    }
    if (
      !Number.isInteger(Number(formData.quantity)) ||
      Number(formData.quantity) < 0 ||
      Number(formData.quantity) > 100
    ) {
      alert("Quantity must be an integer between 0 and 100");
      return;
    }
    setArrayData((prevState) => [...prevState, formData]);
    setOpen(true); // Open dialog box on successful submission
  }

  function handleSubmitClose() {
    setOpen(false);
    clear();
  }

  return (
    <div className="justify-center grid h-screen place-items-center bg-repeat">
      <BackgroundPattern />
      <div className="overflow-m-auto flex flex-col bg-background rounded-xl px-10 h-fit w-[700px] justify-center py-4">
        <h1 className="m-2 font-header text-primary font-bold text-3xl text-center">
          Medical Device Delivery Form
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
          Najum and Sahil
        </p>
        <form onSubmit={handleSubmit}>
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
            {/*<TextField*/}
            {/*  onChange={handleFormInput}*/}
            {/*  value={formData.roomName}*/}
            {/*  name="roomName"*/}
            {/*  id="roomName"*/}
            {/*  variant="filled"*/}
            {/*  label="Room Name"*/}
            {/*  required={true}*/}
            {/*/>*/}
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
            <LocationDropdown
              room={formData.roomName}
              update={updateRoom}
              label={"Room"}
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
            <TextField
              onChange={handleFormInput}
              value={formData.quantity}
              name="quantity"
              id="quantity"
              variant="filled"
              type="number"
              inputProps={{ min: 0, max: 100, step: 1 }}
              label="Quantity"
              required={true}
            />

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
                disablePast
                onChange={handleDateChange}
                // renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <div className="flex justify-center">
              <Button
                className="w-32 self-center pt-10"
                type="submit"
                id="requestSubmit"
                variant="contained"
                size="large"
                sx={{
                  borderRadius: "30px",
                  marginRight: "10px",
                  transition: "transform 0.3s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              >
                SUBMIT
              </Button>

              <Button
                className="w-32 self-center pt-10"
                onClick={clear}
                id="requestClear"
                variant="contained"
                size="large"
                sx={{
                  borderRadius: "30px",
                  transition: "transform 0.3s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              >
                CLEAR
              </Button>
            </div>
          </div>
        </form>
      </div>
      <Dialog open={open} onClose={handleSubmitClose}>
        <DialogTitle>We received your request!</DialogTitle>
        <DialogContent>
          <strong>Here are your responses:</strong>
          <br />
          Employee Name: {formData.employeeName}
          <br />
          Room Name: {formData.roomName}
          <br />
          Medical Device Name: {formData.medicalDeviceName}
          <br />
          Quantity: {formData.quantity}
          <br />
          Priority: {formData.priority}
          <br />
          Status: {formData.status}
          <br />
          Date:{formData.deliveryDate?.toString()}
        </DialogContent>

        <DialogActions>
          <Button onClick={handleSubmitClose} autoFocus>
            Okay
          </Button>
        </DialogActions>
      </Dialog>

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
              Employee Name
            </TableCell>
            <TableCell className="px-4 py-2 text-sm font-semibold tracking-wide text-left bg-gray-100">
              Room Name
            </TableCell>
            <TableCell className="px-4 py-2 text-sm font-semibold tracking-wide text-left bg-gray-100">
              Medical Device Name
            </TableCell>
            <TableCell className="px-4 py-2 text-sm font-semibold tracking-wide text-left bg-gray-100">
              Quantity
            </TableCell>
            <TableCell className="px-4 py-2 text-sm font-semibold tracking-wide text-left bg-gray-100">
              Priority
            </TableCell>
            <TableCell className="px-4 py-2 text-sm font-semibold tracking-wide text-left bg-gray-100">
              Status
            </TableCell>
            <TableCell className="px-4 py-2 text-sm font-semibold tracking-wide text-left bg-gray-100">
              Date
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {arrayData.map((data, index) => (
            <TableRow key={index}>
              <TableCell className="px-4 py-2 text-sm font-semibold tracking-wide text-left bg-gray-100">
                {data.employeeName}
              </TableCell>
              <TableCell className="px-4 py-2 text-sm font-semibold tracking-wide text-left bg-gray-100">
                {data.roomName}
              </TableCell>
              <TableCell className="px-4 py-2 text-sm font-semibold tracking-wide text-left bg-gray-100">
                {data.medicalDeviceName}
              </TableCell>
              <TableCell className="px-4 py-2 text-sm font-semibold tracking-wide text-left bg-gray-100">
                {data.quantity}
              </TableCell>
              <TableCell className="px-4 py-2 text-sm font-semibold tracking-wide text-left bg-gray-100">
                {data.priority}
              </TableCell>
              <TableCell className="px-4 py-2 text-sm font-semibold tracking-wide text-left bg-gray-100">
                {data.status}
              </TableCell>
              <TableCell className="px-4 py-2 text-sm font-semibold tracking-wide text-left bg-gray-100">
                {data.deliveryDate?.toString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default MedicalDeviceRequest;
