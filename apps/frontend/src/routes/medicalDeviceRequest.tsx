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
//     const [currentFormData, setCurrentFormData] = useState<medicalDeviceDelivery>({
//         employeeName: "",
//         roomName: "",
//         medicalDeviceName: "",
//         quantity: "",
//         priority: "",
//         status: "",
//         deliveryDate: null,
//     });
//
//     const [openDialog, setOpenDialog] = useState(false);
//     const [arrayData, setArrayData] = useState<medicalDeviceDelivery[]>([]);
//     function clear() {
//         setCurrentFormData({
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
//         setCurrentFormData({ ...currentFormData, priority: e.target.value });
//     }
//
//     function handleStatusInput(e: SelectChangeEvent) {
//         setCurrentFormData({ ...currentFormData, status: e.target.value });
//     }
//
//     function handleDateChange(date: Dayjs | null) {
//         setCurrentFormData({ ...currentFormData, deliveryDate: date });
//     }
//
//     function handleFormInput(
//         e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
//     ) {
//         const { name, value } = e.target;
//         setCurrentFormData((prevState) => ({ ...prevState, [name]: value }));
//     }
//
//     function handleSubmit() {
//         if (
//             currentFormData.employeeName === "" ||
//             currentFormData.roomName === "" ||
//             currentFormData.medicalDeviceName === "" ||
//             currentFormData.quantity === "" ||
//             currentFormData.priority === "" ||
//             currentFormData.status === "" ||
//             currentFormData.deliveryDate === null
//         ) {
//             alert("Please Fill in All Fields");
//             return;
//         } else if (
//             !Number.isInteger(Number(currentFormData.quantity)) ||
//             Number(currentFormData.quantity) < 0 ||
//             Number(currentFormData.quantity) > 100
//         ) {
//             alert("Quantity must be an integer between 0 and 100");
//             return;
//         }
//         setArrayData((prevState) => [...prevState, currentFormData]);
//         setOpenDialog(true); // Open dialog box on successful submission
//     }
//
//     function handleSubmitClose() {
//         setOpenDialog(false);
//         clear();
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
//                         value={currentFormData.employeeName}
//                         name="employeeName"
//                         id="employeeName"
//                         variant="filled"
//                         label="Employee Name"
//                         required={true}
//                     />
//                     <TextField
//                         onChange={handleFormInput}
//                         value={currentFormData.roomName}
//                         name="roomName"
//                         id="roomName"
//                         variant="filled"
//                         label="Room Name"
//                         required={true}
//                     />
//                     <TextField
//                         onChange={handleFormInput}
//                         value={currentFormData.medicalDeviceName}
//                         name="medicalDeviceName"
//                         id="medicalDeviceName"
//                         variant="filled"
//                         label="Medical Device Name"
//                         required={true}
//                     />
//                     <TextField
//                         onChange={handleFormInput}
//                         value={currentFormData.quantity}
//                         name="quantity"
//                         id="quantity"
//                         variant="filled"
//                         type="number"
//                         inputProps={{ min: 0, max: 100, step: 1 }}
//                         label="Quantity"
//                         required={true}
//                     />
//                     <FormControl variant="filled">
//                         <InputLabel id="priority">Priority*</InputLabel>
//                         <Select
//                             name="priority"
//                             labelId="priority"
//                             id="priority"
//                             value={currentFormData.priority}
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
//                     <FormControl variant="filled">
//                         <InputLabel id="status">Status*</InputLabel>
//                         <Select
//                             name="Status"
//                             labelId="status"
//                             id="status"
//                             value={currentFormData.status}
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
//                             value={currentFormData.deliveryDate}
//                             disablePast
//                             onChange={handleDateChange}
//                         />
//                     </LocalizationProvider>
//                     <div className="flex justify-center">
//                         <Button
//                             className="py-2 px-4 mt-3 rounded items-center"
//                             onClick={handleSubmit}
//                             type="submit"
//                             id="requestSubmit"
//                             variant="contained"
//                             size="large"
//                             sx={{ borderRadius: "30px" }}
//                         >
//                             SUBMIT
//                         </Button>
//                     </div>
//                 </div>
//             </div>
//             <Dialog open={openDialog} onClose={handleSubmitClose} maxWidth="xl">
//                 <DialogTitle className="text-lg font-semibold">We received your request!</DialogTitle>
//                 <DialogContent className="p-8">
//                     <strong>Here is your response:</strong>
//                     <br />
//                     <div className="overflow-x-auto">
//                         <Table className="w-full table-auto mt-4">
//                             <TableHead className="w-full table-auto mt-4 border-collapse border border-gray-200">
//                                 <TableRow>
//                                     <TableCell className="px-4 py-2 text-sm font-semibold tracking-wide text-left bg-gray-100">Employee Name</TableCell>
//                                     <TableCell className="px-4 py-2 text-sm font-semibold tracking-wide text-left bg-gray-100">Room Name</TableCell>
//                                     <TableCell className="px-4 py-2 text-sm font-semibold tracking-wide text-left bg-gray-100">Medical Device Name</TableCell>
//                                     <TableCell className="px-4 py-2 text-sm font-semibold tracking-wide text-left bg-gray-100">Quantity</TableCell>
//                                     <TableCell className="px-4 py-2 text-sm font-semibold tracking-wide text-left bg-gray-100">Priority</TableCell>
//                                     <TableCell className="px-4 py-2 text-sm font-semibold tracking-wide text-left bg-gray-100">Status</TableCell>
//                                     <TableCell className="px-4 py-2 text-sm font-semibold tracking-wide text-left bg-gray-100">Date</TableCell>
//                                 </TableRow>
//                             </TableHead>
//                             <TableBody>
//                                 <TableRow>
//                                     <TableCell className="px-4 py-2 text-sm font-semibold tracking-wide text-left bg-gray-100">{currentFormData.employeeName}</TableCell>
//                                     <TableCell className="px-4 py-2 text-sm font-semibold tracking-wide text-left bg-gray-100">{currentFormData.roomName}</TableCell>
//                                     <TableCell className="px-4 py-2 text-sm font-semibold tracking-wide text-left bg-gray-100">{currentFormData.medicalDeviceName}</TableCell>
//                                     <TableCell className="px-4 py-2 text-sm font-semibold tracking-wide text-left bg-gray-100">{currentFormData.quantity}</TableCell>
//                                     <TableCell className="px-4 py-2 text-sm font-semibold tracking-wide text-left bg-gray-100">{currentFormData.priority}</TableCell>
//                                     <TableCell className="px-4 py-2 text-sm font-semibold tracking-wide text-left bg-gray-100">{currentFormData.status}</TableCell>
//                                     <TableCell className="px-4 py-2 text-sm font-semibold tracking-wide text-left bg-gray-100">{currentFormData.deliveryDate?.toString()}</TableCell>
//                                 </TableRow>
//                             </TableBody>
//                         </Table>
//                     </div>
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={handleSubmitClose} autoFocus>
//                         Okay
//                     </Button>
//                 </DialogActions>
//             </Dialog>
//             {arrayData.length > 0 && (
//             <Table className="w-full table-auto mt-4">
//                 <TableHead className="w-full table-auto mt-4 border-collapse border border-gray-200">
//                     <TableRow>
//                         <TableCell className="px-4 py-2 text-sm font-semibold tracking-wide text-left bg-gray-100">Employee Name</TableCell>
//                         <TableCell className="px-4 py-2 text-sm font-semibold tracking-wide text-left bg-gray-100">Room Name</TableCell>
//                         <TableCell className="px-4 py-2 text-sm font-semibold tracking-wide text-left bg-gray-100">Medical Device Name</TableCell>
//                         <TableCell className="px-4 py-2 text-sm font-semibold tracking-wide text-left bg-gray-100">Quantity</TableCell>
//                         <TableCell className="px-4 py-2 text-sm font-semibold tracking-wide text-left bg-gray-100">Priority</TableCell>
//                         <TableCell className="px-4 py-2 text-sm font-semibold tracking-wide text-left bg-gray-100">Status</TableCell>
//                         <TableCell className="px-4 py-2 text-sm font-semibold tracking-wide text-left bg-gray-100">Date</TableCell>
//                     </TableRow>
//                 </TableHead>
//                 <TableBody>
//                     {arrayData.map((data, index) => (
//                         <TableRow key={index}>
//                             <TableCell className="px-4 py-2 text-sm font-semibold tracking-wide text-left bg-gray-100">{data.employeeName}</TableCell>
//                             <TableCell className="px-4 py-2 text-sm font-semibold tracking-wide text-left bg-gray-100">{data.roomName}</TableCell>
//                             <TableCell className="px-4 py-2 text-sm font-semibold tracking-wide text-left bg-gray-100">{data.medicalDeviceName}</TableCell>
//                             <TableCell className="px-4 py-2 text-sm font-semibold tracking-wide text-left bg-gray-100">{data.quantity}</TableCell>
//                             <TableCell className="px-4 py-2 text-sm font-semibold tracking-wide text-left bg-gray-100">{data.priority}</TableCell>
//                             <TableCell className="px-4 py-2 text-sm font-semibold tracking-wide text-left bg-gray-100">{data.status}</TableCell>
//                             <TableCell className="px-4 py-2 text-sm font-semibold tracking-wide text-left bg-gray-100">{data.deliveryDate?.toString()}</TableCell>
//                         </TableRow>
//                     ))}
//                 </TableBody>
//             </Table>
//         )}
//         </div>
//     );
// }
//
// export default MedicalDeviceRequest;

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
      <Dialog open={open} onClose={handleSubmitClose} maxWidth="xl">
        <DialogTitle className="text-lg font-semibold">
          We received your request!
        </DialogTitle>
        <DialogContent className="p-8">
          <strong>Here is your response:</strong>
          <br />
          <div className="overflow-x-auto">
            <Table className="w-full table-auto mt-4">
              <TableHead className="w-full table-auto mt-4 border-collapse border border-gray-200">
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
                <TableRow>
                  <TableCell className="px-4 py-2 text-sm font-semibold tracking-wide text-left bg-gray-100">
                    {formData.employeeName}
                  </TableCell>
                  <TableCell className="px-4 py-2 text-sm font-semibold tracking-wide text-left bg-gray-100">
                    {formData.roomName}
                  </TableCell>
                  <TableCell className="px-4 py-2 text-sm font-semibold tracking-wide text-left bg-gray-100">
                    {formData.medicalDeviceName}
                  </TableCell>
                  <TableCell className="px-4 py-2 text-sm font-semibold tracking-wide text-left bg-gray-100">
                    {formData.quantity}
                  </TableCell>
                  <TableCell className="px-4 py-2 text-sm font-semibold tracking-wide text-left bg-gray-100">
                    {formData.priority}
                  </TableCell>
                  <TableCell className="px-4 py-2 text-sm font-semibold tracking-wide text-left bg-gray-100">
                    {formData.status}
                  </TableCell>
                  <TableCell className="px-4 py-2 text-sm font-semibold tracking-wide text-left bg-gray-100">
                    {formData.deliveryDate?.toString()}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmitClose} autoFocus>
            Okay
          </Button>
        </DialogActions>
      </Dialog>
      {arrayData.length > 0 && (
        <Table className="w-full table-auto mt-4">
          <TableHead className="w-full table-auto mt-4 border-collapse border border-gray-200">
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
      )}
    </div>
  );
}

export default MedicalDeviceRequest;
