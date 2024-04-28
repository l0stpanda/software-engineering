import { Alert, Checkbox, Snackbar } from "@mui/material";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { AlertColor } from "@mui/material/Alert";

type subTodo = {
  id: number;
  id_relation: number;
  task: string;
  complete: boolean;
};

export default function SubTodoItem(props: {
  subtask: subTodo;
  index: number;
}) {
  const { getAccessTokenSilently } = useAuth0();
  const [checked, setChecked] = useState<boolean>(props.subtask.complete);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] =
    useState<AlertColor>("success");
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  const showSnackbar = (message: string, severity: AlertColor) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  async function handleCheckedSubtask(e: React.ChangeEvent<HTMLInputElement>) {
    try {
      const token = await getAccessTokenSilently();
      setChecked(!e.target.checked);
      await axios.post(
        `/api/subTodo/${parseInt(e.target.name)}`,
        {
          complete: !e.target.checked,
        },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      //call to backend
    } catch (e) {
      console.log(e);
      showSnackbar("Could not change checkbox for subtask", "error");
      return;
    }
  }

  return (
    <div className="flex flex-row gap-2">
      <Checkbox
        size="small"
        checked={checked}
        name={props.subtask.id.toString()}
        onChange={handleCheckedSubtask}
      />
      <div className="my-auto" key={props.index}>
        {props.subtask.task}
      </div>
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
    </div>
  );
}
