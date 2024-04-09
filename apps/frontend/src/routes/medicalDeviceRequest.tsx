import React, { ChangeEvent, useState } from "react";
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
    } else if (
      !Number.isInteger(Number(formData.quantity)) ||
      Number(formData.quantity) < 0 ||
      Number(formData.quantity) > 100
    ) {
      alert("Quantity must be an integer between 0 and 100");
      return;
    }
    setArrayData((prevState) => [...prevState, formData]);
    setOpen(true); // Open dialog box on successful submission
    clear(); // Clear form data after submission
  }

  function handleSubmitClose() {
    setOpen(false);
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
            {/*<Button className="py-2 px-4 mt-3 rounded items-center"*/}
            {/*    onClick={clear}*/}
            {/*    variant="contained"*/}
            {/*    size="large"*/}
            {/*    sx={{borderRadius: "30px"}}*/}
            {/*>*/}
            {/*    CLEAR*/}
            {/*</Button>*/}
            <Button
              className="py-2 px-4 mt-3 rounded items-center"
              onClick={handleSubmit}
              type="submit"
              id="requestSubmit"
              variant="contained"
              size="large"
              sx={{ borderRadius: "30px" }}
            >
              SUBMIT
            </Button>
          </div>
        </div>
      </div>
      <Dialog open={open} onClose={handleSubmitClose}>
        <DialogTitle>We received your request!</DialogTitle>
        <DialogContent>
          <strong>Here are your responses:</strong>
          <br />
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

export default MedicalDeviceRequest;

// import React, { ChangeEvent, useState } from "react";
// import {
//     TextField,
//     Button,
//     FormControl,
//     Dialog,
//     DialogActions,
//     DialogContent,
//     DialogTitle,
//     InputLabel,
//     MenuItem,
//     Table,
//     TableHead,
//     TableRow,
//     TableCell,
//     TableBody,
// } from "@mui/material";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import Select, { SelectChangeEvent } from "@mui/material/Select";
// import { medicalDeviceDelivery } from "common/src/medicalDeviceDelivery.ts";
// import { Dayjs } from "dayjs";
// import BackgroundPattern from "../components/backgroundPattern.tsx";
//
// function MedicalDeviceRequest() {
//     const [formData, setFormData] = useState<medicalDeviceDelivery>({
//         employeeName: "",
//         roomName: "",
//         medicalDeviceName: "",
//         quantity: "",
//         priority: "",
//         status: "",
//         deliveryDate: null,
//     });
//
//     const [arrayData, setArrayData] = useState<medicalDeviceDelivery[]>([]);
//     const [open, setOpen] = useState(false);
//
//     function clearForm() {
//         setFormData({
//             employeeName: "",
//             roomName: "",
//             medicalDeviceName: "",
//             quantity: "",
//             priority: "",
//             status: "",
//             deliveryDate: null,
//         });
//     }
//
//     function handlePriorityInput(e: SelectChangeEvent) {
//         setFormData({ ...formData, priority: e.target.value });
//     }
//
//     function handleStatusInput(e: SelectChangeEvent) {
//         setFormData({ ...formData, status: e.target.value });
//     }
//
//     function handleDateChange(date: Dayjs | null) {
//         setFormData({ ...formData, deliveryDate: date });
//     }
//
//     function handleFormInput(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
//         const { name, value } = e.target;
//         setFormData((prevState) => ({ ...prevState, [name]: value }));
//     }
//
//     function handleSubmit() {
//         if (
//             formData.employeeName == "" ||
//             formData.roomName == "" ||
//             formData.medicalDeviceName == "" ||
//             formData.quantity == "" ||
//             formData.priority == "" ||
//             formData.status == "" ||
//             formData.deliveryDate == null
//         ) {
//             alert("Please Fill in All Fields");
//             return;
//         } else if (Number(formData.quantity) < 0 || Number(formData.quantity) > 100) {
//             alert("Quantity must be between 0 and 100");
//             return;
//         }
//         setArrayData((prevState) => [...prevState, formData]);
//         setOpen(true); // Open dialog box on successful submission
//         clearForm(); // Clear form data after submission
//     }
//
//     function handleSubmitClose() {
//         setOpen(false); // Close dialog box
//     }
//
//     return (
//         <div className="justify-center grid h-screen place-items-center">
//             <BackgroundPattern />
//             <div className="overflow-m-auto flex flex-col bg-background rounded-xl px-10 h-fit w-[700px] justify-center py-4">
//                 <h1 className="m-2 font-header text-primary font-bold text-3xl text-center">
//                     Medical Device Delivery Form
//                 </h1>
//                 <div className="flex flex-col gap-4 my-4">
//                     <TextField
//                         onChange={handleFormInput}
//                         value={formData.employeeName}
//                         name="employeeName"
//                         id="employeeName"
//                         variant="filled"
//                         label="Employee Name"
//                         required={true}
//                     />
//                     <FormControl variant="filled">
//                         <InputLabel id="priority">Priority*</InputLabel>
//                         <Select
//                             name="priority"
//                             labelId="priority"
//                             id="priority"
//                             value={formData.priority}
//                             onChange={handlePriorityInput}
//                         >
//                             <MenuItem value="">
//                                 <em>None</em>
//                             </MenuItem>
//                             <MenuItem value={"High"}>High</MenuItem>
//                             <MenuItem value={"Medium"}>Medium</MenuItem>
//                             <MenuItem value={"Low"}>Low</MenuItem>
//                             <MenuItem value={"Emergency"}>Emergency</MenuItem>
//                         </Select>
//                     </FormControl>
//                     <TextField
//                         onChange={handleFormInput}
//                         value={formData.roomName}
//                         name="roomName"
//                         id="roomName"
//                         variant="filled"
//                         label="Room Name"
//                         required={true}
//                     />
//                     <TextField
//                         onChange={handleFormInput}
//                         value={formData.medicalDeviceName}
//                         name="medicalDeviceName"
//                         id="medicalDeviceName"
//                         variant="filled"
//                         label="Medical Device Name"
//                         required={true}
//                     />
//                     <TextField
//                         onChange={handleFormInput}
//                         value={formData.quantity}
//                         name="quantity"
//                         id="quantity"
//                         variant="filled"
//                         label="Quantity"
//                         type="number"
//                         inputProps={{ min: 0, max: 100 }}
//                         required={true}
//                     />
//                     <FormControl variant="filled">
//                         <InputLabel id="status">Status*</InputLabel>
//                         <Select
//                             name="Status"
//                             labelId="status"
//                             id="status"
//                             value={formData.status}
//                             onChange={handleStatusInput}
//                         >
//                             <MenuItem value="">
//                                 <em>None</em>
//                             </MenuItem>
//                             <MenuItem value={"Unassigned"}>Unassigned</MenuItem>
//                             <MenuItem value={"Assigned"}>Assigned</MenuItem>
//                             <MenuItem value={"InProgress"}>InProgress</MenuItem>
//                             <MenuItem value={"Closed"}>Closed</MenuItem>
//                         </Select>
//                     </FormControl>
//                     <LocalizationProvider dateAdapter={AdapterDayjs}>
//                         <DatePicker
//                             sx={{ bgcolor: "#eceff0" }}
//                             label="Delivery Date*"
//                             value={formData.deliveryDate}
//                             disablePast
//                             onChange={handleDateChange}
//                         />
//                     </LocalizationProvider>
//                     <Button
//                         onClick={clearForm}
//                         variant="contained"
//                         size="large"
//                         sx={{ borderRadius: "30px" }}
//                     >
//                         CLEAR
//                     </Button>
//                     <Button
//                         onClick={handleSubmit}
//                         type="submit"
//                         id="requestSubmit"
//                         variant="contained"
//                         size="large"
//                         sx={{ borderRadius: "30px" }}
//                     >
//                         SUBMIT
//                     </Button>
//                 </div>
//             </div>
//             <Dialog open={open} onClose={handleSubmitClose}>
//                 <DialogTitle>We received your request!</DialogTitle>
//                 <DialogContent>
//                     <strong>Here are your responses:</strong>
//                     <br />
//                     {arrayData.length > 0 && (
//                         <Table>
//                             <TableHead>
//                                 <TableRow>
//                                     <TableCell>Employee Name</TableCell>
//                                     <TableCell>Room Name</TableCell>
//                                     <TableCell>Medical Device Name</TableCell>
//                                     <TableCell>Quantity</TableCell>
//                                     <TableCell>Priority</TableCell>
//                                     <TableCell>Status</TableCell>
//                                     <TableCell>Date</TableCell>
//                                 </TableRow>
//                             </TableHead>
//                             <TableBody>
//                                 {arrayData.map((data, index) => (
//                                     <TableRow key={index}>
//                                         <TableCell>{data.employeeName}</TableCell>
//                                         <TableCell>{data.roomName}</TableCell>
//                                         <TableCell>{data.medicalDeviceName}</TableCell>
//                                         <TableCell>{data.quantity}</TableCell>
//                                         <TableCell>{data.priority}</TableCell>
//                                         <TableCell>{data.status}</TableCell>
//                                         <TableCell>{data.deliveryDate?.toString()}</TableCell>
//                                     </TableRow>
//                                 ))}
//                             </TableBody>
//                         </Table>
//                     )}
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={handleSubmitClose} autoFocus>
//                         Okay
//                     </Button>
//                 </DialogActions>
//             </Dialog>
//         </div>
//     );
// }
//
// export default MedicalDeviceRequest;
//
