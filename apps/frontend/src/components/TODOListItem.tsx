import trashIcon from "../assets/trashicon.png";
//import React, { useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { Checkbox } from "@mui/material";
import { useState } from "react";
//import LoginDialog from "./loginDialog.tsx";

// import {
//     Dialog,
// } from "@mui/material";
//import { toDo } from "common/src/toDo.ts";
type toDoNow = {
  id: number;
  user_id: string | undefined;
  task: string;
  priority: string;
  email: string | undefined;
  username: string | undefined;
  role: string | undefined;
  complete: boolean;
};
function TODOListItem(props: toDoNow) {
  const { getAccessTokenSilently } = useAuth0();

  const [completed, setCompleted] = useState(props.complete);

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
      alert("Problem Deleting");
      return;
    }
    alert("Successfully deleted TODO item with ID number " + idVal);
    //window must be reloaded on delete to show updated results
    window.location.reload();
  }

  async function updateTodo() {
    try {
      const token = await getAccessTokenSilently();
      setCompleted(!completed);
      await axios.post(
        `/api/todoStuff/${props.id}`,
        { bool: !completed },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      //call to backend
    } catch (e) {
      console.log(e);
      alert("Problem Checking Off");
      return;
    }
    // alert("Successfully updated TODO item with ID number " + props.id);
    //window must be reloaded on delete to show updated results
    //window.location.reload();
  }

  return (
    <>
      <tr className="bg-background border-b-2 border-secondary" key={props.id}>
        <td className="p-3 text-sm">
          <Checkbox checked={completed} onChange={updateTodo} />
        </td>
        <td className="p-3 text-sm">{props.id}</td>
        <td className="p-3 text-sm">{props.priority}</td>
        <td className="p-3 text-sm">{props.task}</td>
        <td className="p-3 text-sm">
          <button>
            <img
              onClick={() => deleteData(props.id)}
              src={trashIcon}
              alt="Trash icon"
              className="px-7 flex justify-center transform h-6 hover:scale-125"
            />
          </button>
        </td>
      </tr>
    </>
  );
}

export default TODOListItem;
