import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import TODOListItem from "../components/TODOListItem.tsx";
//import { toDo } from "common/src/toDo.ts";
import {
  Button,
  Dialog,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
//import LoginDialog from "../components/loginDialog.tsx";
type toDoNow = {
  id: number;
  task: string;
  priority: string;
  email: string | undefined;
  complete: boolean;
};

export default function DisplayTODOList() {
  const { getAccessTokenSilently, user } = useAuth0();

  const [toDoResponse, setToDoResponse] = useState<toDoNow>({
    id: 0,
    task: "",
    priority: "",
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    email: user.email,
    complete: false,
  });

  // Use state for records being displayed
  const [records, setRecords] = useState<toDoNow[]>([]);

  const [open, setOpen] = useState<boolean>(false);

  // Get records from database, and update useState
  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const token = await getAccessTokenSilently();
        if (user != undefined) {
          const response = await axios.get(`/api/todoStuff/${user.email}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
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
    const token = await getAccessTokenSilently();
    try {
      await axios.post(`/api/todoStuff`, toDoResponse, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (e) {
      console.log(e);
      alert("Problems have occured");
      return;
    }

    setToDoResponse({
      id: 0,
      task: "",
      email: "",
      priority: "",
      complete: false,
    });
    alert("New Task has been created");
    setOpen(false);
    window.location.reload();
  }

  function handleOpen() {
    setOpen(true);
    return;
  }

  function handleSubmitClose() {
    setOpen(false);
    return;
  }

  function handleDropdownChange(e: SelectChangeEvent) {
    setToDoResponse({ ...toDoResponse, priority: e.target.value });
  }

  return (
    <div className="px-8 p5 h-screen bg-background">
      <div className="flex flex-row">
        <h1 className="my-2 font-header text-primary font-bold text-3xl text-center mx-auto">
          Task Board
        </h1>
        <Button
          variant="contained"
          color="primary"
          component="span"
          sx={{ borderRadius: "30px", margin: "auto 0" }}
          className="w-32 text-center self-end"
          onClick={handleOpen}
        >
          New Task
        </Button>
      </div>
      <table className="w-full">
        <thead className="bg-secondary border-b-2 border-b-primary">
          <tr>
            <th className="p-3 text-sm font-semibold tracking-wide text-left max-w-8">
              Completed
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              ID
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              Priority
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              Task
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
              key={record.id}
              id={record.id}
              email={record.email}
              priority={record.priority}
              task={record.task}
              complete={record.complete}
            />
          ))}
        </tbody>
      </table>

      <Dialog open={open} onClose={handleSubmitClose}>
        <form>
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
                required
                label="Task"
                name="task"
                type="required"
              />

              <FormControl variant="filled" required>
                <InputLabel id="priority">Priority</InputLabel>
                <Select
                  name="priority"
                  labelId="priority"
                  id="priority"
                  value={toDoResponse.priority}
                  onChange={handleDropdownChange}
                >
                  <MenuItem value={"High"}>High</MenuItem>
                  <MenuItem value={"Medium"}>Medium</MenuItem>
                  <MenuItem value={"Low"}>Low</MenuItem>
                  <MenuItem value={"Emergency"}>Emergency</MenuItem>
                </Select>
              </FormControl>

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
        </form>
      </Dialog>
    </div>
  );
}
