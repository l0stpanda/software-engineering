// import { Button, TextField } from "@mui/material";
// import { useState } from "react";
// import axios from "axios";
// import {toDo} from "common/src/toDo.ts";
//
// function LoginDialog() {
//
//
//   const [toDoResponse, setToDoResponse] = useState<toDo>({
//       task: "",
//     priority: "",
//     email: "",
//   });
//
//   function handleFormUpdate(e: React.ChangeEvent<HTMLTextAreaElement>) {
//     setToDoResponse({ ...toDoResponse, [e.target.name]: e.target.value });
//   }
//
//   async function handleSubmit() {
//       return;
//     }
//   }
//
//   return (
//     // Dialog has hidden classname so that it is not in the way right now
//     //<dialog open={true} className="w-full h-full flex bg-text bg-opacity-60">
//     <div>
//       <div className="m-auto flex flex-col bg-background rounded-xl px-6 min-w-96 h-fit justify-center py-4">
//         <h1 className="my-3 font-header text-primary font-bold text-3xl text-center">
//           Staff Login
//         </h1>
//         <div className="flex flex-col gap-2 my-2">
//           <TextField
//             onChange={handleFormUpdate}
//             value={toDoResponse.task}
//             variant="filled"
//             fullWidth={true}
//             label="Task"
//             name="task"
//             type="required"
//           />
//           <TextField
//             onChange={handleFormUpdate}
//             value={toDoResponse.priority}
//             variant="filled"
//             fullWidth={true}
//             label="Priority"
//             name="priority"
//             type="required"
//           />
//           <TextField
//               onChange={handleFormUpdate}
//               value={toDoResponse.email}
//               variant="filled"
//               fullWidth={true}
//               label="Email"
//               name="email"
//               type="required"
//           />
//           <Button
//             onClick={handleSubmit}
//             variant="contained"
//             className="w-32 self-center"
//             sx={{ borderRadius: "30px" }}
//           >
//             Login
//           </Button>
//         </div>
//       </div>
//     </div>
//     //</dialog>
//   );
// }
//
// export default LoginDialog;
