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
} from "@mui/material";
// import Slide from "@mui/material/Slide";
// import { TransitionProps } from "@mui/material/transitions";
import { useAuth0 } from "@auth0/auth0-react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { medicalDeviceDelivery } from "common/src/medicalDeviceDelivery.ts";
import dayjs, { Dayjs } from "dayjs";
import BackgroundPattern from "../components/allyBackground.tsx";
import LocationDropdown from "../components/locationDropdown.tsx";
import axios from "axios";
import UserDropdown from "../components/userDropdown.tsx";

function MedicalDeviceRequest() {
  const { getAccessTokenSilently } = useAuth0();
  const [formData, setFormData] = useState<medicalDeviceDelivery>({
    employeeName: "",
    roomName: "",
    medicalDeviceName: "",
    quantity: 1,
    priority: "Medium",
    status: "Unassigned",
    deliveryDate: dayjs(),
  });

  // const Transition = React.forwardRef(function Transition(
  //   props: TransitionProps & {
  //     children: React.ReactElement<string, string>;
  //   },
  //   ref: React.Ref<unknown>,
  // ) {
  //   return (
  //     <Slide direction="up" ref={ref} {...props} children={props.children} />
  //   );
  // });

  const [open, setOpen] = useState(false);

  function clear() {
    setFormData({
      employeeName: "",
      roomName: "",
      medicalDeviceName: "",
      quantity: 1,
      priority: "Medium",
      status: "Unassigned",
      deliveryDate: null,
    });
  }

  function handlePriorityInput(e: SelectChangeEvent) {
    setFormData({ ...formData, priority: e.target.value });
  }

  function handleStatusInput(e: SelectChangeEvent) {
    setFormData({ ...formData, status: e.target.value });
  }

  function updateName(val: string) {
    setFormData({ ...formData, employeeName: val });
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

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const token = await getAccessTokenSilently();
    if (
      formData.employeeName == "" ||
      formData.roomName == "" ||
      formData.medicalDeviceName == "" ||
      formData.quantity == 0 ||
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

    try {
      await axios.post("api/medicalDevice", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
    } catch (e) {
      alert(
        "Error storing in the database, make sure nodes/edges are uploaded and you are logged in.",
      );
      console.error(e);
      return;
    }

    setOpen(true); // Open dialog box on successful submission
  }

  function handleSubmitClose() {
    setOpen(false);
    clear();
  }

  return (
    <div className="justify-center grid h-screen place-items-center bg-repeat mt-6">
      <BackgroundPattern />
      <div
        className="overflow-m-auto shadow-2xl border border-1 flex flex-col bg-background rounded-xl px-10 h-fit w-[700px] justify-center py-4"
        // style={{
        //     boxShadow: "1px 1px 0px #999, 2px 2px 0px #999, 3px 3px 0px #999, 4px 4px 0px #999, 5px 5px 0px #999, 6px 6px 0px #999"
        // }}>
      >
        <h1 className="m-2 font-header text-primary font-bold text-2xl text-center">
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
            {/*<TextField*/}
            {/*  onChange={handleFormInput}*/}
            {/*  value={formData.employeeName}*/}
            {/*  name="employeeName"*/}
            {/*  id="employeeName"*/}
            {/*  variant="filled"*/}
            {/*  label="Employee Name"*/}
            {/*  required={true}*/}
            {/*/>*/}

            <UserDropdown
              room={formData.employeeName}
              update={updateName}
              label={"Username"}
            />

            <FormControl variant="filled" required>
              <InputLabel id="priority">Priority</InputLabel>
              <Select
                name="priority"
                labelId="priority"
                id="priority"
                value={formData.priority}
                onChange={handlePriorityInput}
              >
                {/*<MenuItem value="">*/}
                {/*  <em>None</em>*/}
                {/*</MenuItem>*/}
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

            <FormControl variant="filled" required>
              <InputLabel id="status">Status</InputLabel>
              <Select
                name="Status"
                labelId="status"
                id="status"
                value={formData.status}
                onChange={handleStatusInput}
              >
                {/*<MenuItem value="">*/}
                {/*  <em>None</em>*/}
                {/*</MenuItem>*/}
                <MenuItem value={"Unassigned"}>Unassigned</MenuItem>
                <MenuItem value={"Assigned"}>Assigned</MenuItem>
                <MenuItem value={"InProgress"}>In Progress</MenuItem>
                <MenuItem value={"Closed"}>Closed</MenuItem>
              </Select>
            </FormControl>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                sx={{ bgcolor: "#eceff0" }}
                label="Delivery Date*"
                value={formData.deliveryDate}
                disablePast
                onChange={handleDateChange}
                //renderInput={(params) => <TextField {...params} required/>}
              />
            </LocalizationProvider>
            <div className="flex justify-center">
              <Button
                className="w-32 self-center pt-10"
                onClick={clear}
                id="requestClear"
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
                CLEAR
              </Button>

              <Button
                className="w-32 self-center pt-10"
                type="submit"
                id="requestSubmit"
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
                SUBMIT
              </Button>
            </div>
          </div>
        </form>
      </div>
      {/*<React.Fragment>*/}
      <Dialog
        open={open}
        onClose={handleSubmitClose}
        // TransitionComponent={Transition}
        // keepMounted
        // aria-describedby="alert-dialog-slide-description"
      >
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
      {/*</React.Fragment>*/}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker label="Delivery Date" />
      </LocalizationProvider>
    </div>
  );
}

export default MedicalDeviceRequest;
