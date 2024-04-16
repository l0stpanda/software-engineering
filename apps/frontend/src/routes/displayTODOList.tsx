import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import TODOListItem from "../components/TODOListItem.tsx";
import { toDo } from "common/src/toDo.ts";
import { Button, Dialog, TextField } from "@mui/material";
//import LoginDialog from "../components/loginDialog.tsx";

export default function DisplayTODOList() {
  const { getAccessTokenSilently, user } = useAuth0();
  const [toDoResponse, setToDoResponse] = useState<toDo>({
    task: "",
    priority: "",
    email: "",
  });

  // Use state for records being displayed
  const [records, setRecords] = useState<toDo[]>([]);

  const [open, setOpen] = useState<boolean>(false);

  // Get records from database, and update useState
  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const token = await getAccessTokenSilently();
        if (user != undefined) {
          const response = await axios.get(
            `/api/roomSchedulingRequest/${user.email}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );
          console.log(response.data);
          setRecords(response.data); // Assuming the data is an array of lost and found request data
        } else {
          alert("You need to login");
          return;
        }
      } catch (error) {
        console.error("Error fetching flower requests", error);
      }
    };

    fetchData().catch((error) => {
      console.error("Error from fetchData promise:", error);
    });
  }, [getAccessTokenSilently, user]);

  function handleFormUpdate(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setToDoResponse({ ...toDoResponse, [e.target.name]: e.target.value });
  }

  async function handleSubmit() {
    setToDoResponse({
      task: "",
      email: "",
      priority: "",
    });
    alert("New Task has been created");
    setOpen(false);
    return;
  }

  function handleOpen() {
    setOpen(true);
    return;
  }

  function handleSubmitClose() {
    setOpen(false);
    return;
  }

  return (
    <div className="px-8 p5 h-screen bg-background">
      <h1 className="my-2 font-header text-primary font-bold text-3xl text-center">
        TODO List
      </h1>
      <table className="w-full">
        <thead className="bg-secondary border-b-2 border-b-primary">
          <tr>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              ID
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              Status
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              Priority
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              Length of Reservation
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              Time of Reservation
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              Location
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              Delete
            </th>
            {/* Dynamically generate column headers */}
          </tr>
        </thead>
        <tbody>
          {/* Map through the records and create a row for each record */}
          {records.map((record) => (
            <TODOListItem
              key={record.email}
              email={record.email}
              priority={record.priority}
              task={record.task}
            />
          ))}
        </tbody>
      </table>

      <Button
        variant="contained"
        color="primary"
        component="span"
        sx={{ borderRadius: "30px" }}
        className="w-32 self-center text-center"
        onClick={handleOpen}
      >
        New Task
      </Button>

      <Dialog open={open} onClose={handleSubmitClose}>
        <div>
          <div className="m-auto flex flex-col bg-background rounded-xl px-6 min-w-96 h-fit justify-center py-4">
            <h1 className="my-3 font-header text-primary font-bold text-3xl text-center">
              New Task
            </h1>
            <div className="flex flex-col gap-2 my-2">
              <TextField
                onChange={handleFormUpdate}
                value={toDoResponse.task}
                variant="filled"
                fullWidth={true}
                label="Task"
                name="task"
                type="required"
              />
              <TextField
                onChange={handleFormUpdate}
                value={toDoResponse.priority}
                variant="filled"
                fullWidth={true}
                label="Priority"
                name="priority"
                type="required"
              />
              <TextField
                onChange={handleFormUpdate}
                value={toDoResponse.email}
                variant="filled"
                fullWidth={true}
                label="Email"
                name="email"
                type="required"
              />
              <Button
                onClick={handleSubmit}
                variant="contained"
                className="w-32 self-center"
                sx={{ borderRadius: "30px" }}
              >
                Create
              </Button>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
