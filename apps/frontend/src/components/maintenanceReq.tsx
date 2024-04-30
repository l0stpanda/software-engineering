import { maintenanceReqType } from "common/src/maintenanceReqType.ts";
import { Dayjs } from "dayjs";
import UserDropdown from "./userDropdown.tsx";
import LocationDropdown from "./locationDropdown.tsx";

import React, { FormEvent, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  //TextField,
} from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import axios from "axios";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";

function MaintenanceReq() {
  const { getAccessTokenSilently } = useAuth0();

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

  const [formData, setFormData] = useState<maintenanceReqType>({
    name: "",
    date: null,
    priority: "Medium",
    status: "Unassigned",
    maintainType: "",
    location: "",
  });

  const [open, setOpen] = useState(false);

  function updateName(name: string) {
    setFormData({ ...formData, name: name });
  }

  function updateLocation(loc: string) {
    setFormData({ ...formData, location: loc });
  }

  function handleDateChange(date: Dayjs | null) {
    setFormData({ ...formData, date: date });
  }

  function handlePriorityInput(e: SelectChangeEvent) {
    setFormData({ ...formData, priority: e.target.value });
  }

  function handleStatusInput(e: SelectChangeEvent) {
    setFormData({ ...formData, status: e.target.value });
  }

  function handleTypeInput(e: SelectChangeEvent) {
    setFormData({ ...formData, maintainType: e.target.value });
  }

  function clear() {
    setFormData({
      name: "",
      date: null,
      priority: "Medium",
      status: "Unassigned",
      maintainType: "",
      location: "",
    });
  }

  function handleSubmitClose() {
    setOpen(false);
    clear();
    window.location.reload();
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const token = await getAccessTokenSilently();
    if (
      formData.name == "" ||
      formData.location == "" ||
      formData.date == null ||
      formData.priority == "" ||
      formData.status == "" ||
      formData.maintainType == ""
    ) {
      alert("All fields need to be filled");
      return;
    }

    try {
      await axios.post("api/maint", formData, {
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

  return (
    <div className="w-full">
      <div className="m-auto mt-3 flex flex-col px-10 h-full w-full justify-center py-1">
        <h1 className="my-2 font-header text-primary font-extrabold text-3xl text-center">
          Maintenance Request
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 my-4">
            <UserDropdown
              room={formData.name}
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
                <MenuItem value={"High"}>High</MenuItem>
                <MenuItem value={"Medium"}>Medium</MenuItem>
                <MenuItem value={"Low"}>Low</MenuItem>
                <MenuItem value={"Emergency"}>Emergency</MenuItem>
              </Select>
            </FormControl>

            <LocationDropdown
              room={formData.location}
              update={updateLocation}
              label={"Location"}
            />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                sx={{ bgcolor: "#eceff0" }}
                label="Request Date"
                value={formData.date}
                disablePast
                onChange={handleDateChange}
                // slotProps={{
                //     textField: {
                //         required: true,
                //     },
                // }}
              />
            </LocalizationProvider>

            <FormControl variant="filled" required>
              <InputLabel id="type">Type</InputLabel>
              <Select
                name="Type"
                labelId="type"
                id="type"
                value={formData.maintainType}
                onChange={handleTypeInput}
              >
                <MenuItem value={"Electrician"}>Electrician</MenuItem>
                <MenuItem value={"Mechanic"}>Mechanic</MenuItem>
                <MenuItem value={"Plumber"}>Plumber</MenuItem>
                <MenuItem value={"Technician"}>Technician</MenuItem>
              </Select>
            </FormControl>

            <FormControl variant="filled" required>
              <InputLabel id="status">Status</InputLabel>
              <Select
                name="Status"
                labelId="status"
                id="status"
                value={formData.status}
                onChange={handleStatusInput}
              >
                <MenuItem value={"Unassigned"}>Unassigned</MenuItem>
                <MenuItem value={"Assigned"}>Assigned</MenuItem>
                <MenuItem value={"InProgress"}>In Progress</MenuItem>
                <MenuItem value={"Closed"}>Closed</MenuItem>
              </Select>
            </FormControl>

            <div className="flex justify-center mt-3">
              <Button
                className="w-32 self-center pt-10"
                onClick={clear}
                id="requestClear"
                variant="contained"
                size="large"
                sx={{
                  borderRadius: "30px",
                  marginRight: "20px",
                  transition: "transform 0.3s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.1)",
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
                    transform: "scale(1.1)",
                  },
                }}
              >
                SUBMIT
              </Button>
            </div>
          </div>
        </form>
      </div>

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
            Name: {formData.name}
            <br />
            Location: {formData.location}
            <br />
            Date: {formData.date?.toString()}
            <br />
            Priority: {formData.priority}
            <br />
            Type: {formData.maintainType}
            <br />
            Status: {formData.status}
          </DialogContent>

          <DialogActions>
            <Button onClick={handleSubmitClose} autoFocus>
              Okay
            </Button>
          </DialogActions>
        </Dialog>
        <div className="text-text ml-2 font-header place-self-right">
          Credits: Sam
        </div>
      </React.Fragment>
    </div>
  );
}

export default MaintenanceReq;
