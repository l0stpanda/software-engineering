//import React, { useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import {
  Checkbox,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  TextField,
  Divider,
  IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
//import LoginDialog from "./loginDialog.tsx";

// import {
//     Dialog,
// } from "@mui/material";
import { Alert, Snackbar } from "@mui/material";
import { AlertColor } from "@mui/material/Alert";
import AddIcon from "@mui/icons-material/Add";
import { DeleteOutline } from "@mui/icons-material";
import SubTodoItem from "./subTodoItem.tsx";
//import { toDo } from "common/src/toDo.ts";

type subTodo = {
  id: number;
  id_relation: number;
  task: string;
  complete: boolean;
};

type toDoNow = {
  id: number;
  user_id: string | undefined;
  task: string;
  priority: string;
  email: string | undefined;
  username: string | undefined;
  role: string | undefined;
  complete: boolean;
  subtasks: subTodo[];
};

function TODOListItem(props: toDoNow) {
  const { getAccessTokenSilently } = useAuth0();

  const [completed, setCompleted] = useState(props.complete);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] =
    useState<AlertColor>("success");

  const [newSubtask, setNewSubtask] = useState<string>("");

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const showSnackbar = (message: string, severity: AlertColor) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  //takes in the id of the request to be deleted and deletes in the database
  async function deleteData(idVal: number) {
    console.log(idVal);
    try {
      const token = await getAccessTokenSilently();
      //call to backend
      await axios.delete(`/api/todoStuff/${idVal}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (e) {
      console.log(e);
      showSnackbar("Problem Deleting", "error");
      return;
    }
    showSnackbar(
      "Successfully deleted TODO item with ID number " + idVal,
      "success",
    );
    //window must be reloaded on delete to show updated results
    window.location.reload();
  }

  async function updateTodo() {
    try {
      const token = await getAccessTokenSilently();
      setCompleted(!completed);
      await axios.post(
        `/api/todoStuff/${props.id}`,
        { complete: !completed },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      //call to backend
    } catch (e) {
      console.log(e);
      showSnackbar("Problem Checking Off", "error");
      return;
    }
  }

  async function handleNewSubtask() {
    if (newSubtask == "" || newSubtask.length > 45) {
      showSnackbar("New subtask must be between 1 and 40 characters", "error");
      return;
    }
    try {
      const token = await getAccessTokenSilently();
      const newSubtasks = props.subtasks ? props.subtasks : [];
      newSubtasks.push({
        id: 0,
        id_relation: props.id,
        task: newSubtask,
        complete: false,
      });
      await axios.post(
        `/api/todoStuff/${props.id}`,
        {
          id_relation: props.id,
          task: newSubtask,
          complete: false,
        },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      //call to backend
    } catch (e) {
      console.log(e);
      showSnackbar("Could not add new subtask", "error");
      return;
    }
    setNewSubtask("");
  }

  function handleSubtaskChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setNewSubtask(e.target.value);
  }

  return (
    <>
      <tr className="bg-background border-b-2 border-secondary">
        <td className="p-3 text-sm">
          <Checkbox checked={completed} onChange={updateTodo} />
        </td>
        <td className="p-3 text-sm">{props.id}</td>
        <td className="p-3 text-sm">{props.priority}</td>
        <td className="p-3 text-sm">
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>
                <strong>{props.task}</strong>
              </Typography>
            </AccordionSummary>
            <Divider />
            <AccordionDetails>
              {props.subtasks && props.subtasks.length > 0 ? (
                <div className="mb-2">
                  {props.subtasks.map((subtask, index) => (
                    <SubTodoItem subtask={subtask} index={index} />
                  ))}
                </div>
              ) : (
                <></>
              )}
              <div className="flex flex-row gap-2">
                <TextField
                  variant="outlined"
                  placeholder="New subtask"
                  size="small"
                  type="string"
                  fullWidth
                  onChange={handleSubtaskChange}
                  value={newSubtask}
                />
                <IconButton onClick={handleNewSubtask}>
                  <AddIcon />
                </IconButton>
              </div>
            </AccordionDetails>
          </Accordion>
        </td>
        <td className="p-3 text-sm">
          <IconButton
            className="px-7 flex justify-center transform hover:scale-125"
            onClick={() => deleteData(props.id)}
          >
            <DeleteOutline color="error" />
          </IconButton>
        </td>
      </tr>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}

export default TODOListItem;
