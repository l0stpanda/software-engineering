import { Button, TextField } from "@mui/material";
import { useState } from "react";
import axios from "axios";

function LoginDialog() {
  type loginRes = {
    username: string;
    password: string;
    role: string;
  };

  const [loginResponse, setLoginResponse] = useState({
    username: "",
    password: "",
    role: "",
  });

  function handleFormUpdate(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setLoginResponse({ ...loginResponse, [e.target.name]: e.target.value });
  }

  async function handleSubmit() {
    await axios.delete("/api/login/delete");
    //Make the admin user
    const make: loginRes = {
      username: "admin",
      password: "admin",
      role: "admin",
    };
    await axios.post("/api/login/make", make, {
      headers: { "Content-Type": "application/json" },
    });
    //check the inputs to see if the user
    const checkThis: loginRes = {
      username: loginResponse.username,
      password: loginResponse.password,
      role: "admin",
    };
    const auth: string = await axios
      .post("/api/login/check", checkThis, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => response.data);
    if (auth == "No Go") {
      alert("Authorization INVALID TRY AGAIN");
      setLoginResponse({ username: "", password: "", role: "" });
      return;
    } else if (auth == "Yes Authorized") {
      window.location.href = "/map";
      setLoginResponse({ username: "", password: "", role: "" });
      return;
    }
  }

  return (
    // Dialog has hidden classname so that it is not in the way right now
    //<dialog open={true} className="w-full h-full flex bg-text bg-opacity-60">
    <div>
      <div className="m-auto flex flex-col bg-background rounded-xl px-6 min-w-96 h-fit justify-center py-4">
        <h1 className="my-3 font-header text-primary font-bold text-3xl text-center">
          Staff Login
        </h1>
        <div className="flex flex-col gap-2 my-2">
          <TextField
            onChange={handleFormUpdate}
            value={loginResponse.username}
            variant="filled"
            fullWidth={true}
            label="Username"
            name="username"
          />
          <TextField
            onChange={handleFormUpdate}
            value={loginResponse.password}
            variant="filled"
            type="password"
            fullWidth={true}
            label="Password"
            name="password"
          />
          <a href="/" className="text-sm underline text-primary self-end">
            Forgot your password?
          </a>
          <Button
            onClick={handleSubmit}
            variant="contained"
            className="w-32 self-center"
            sx={{ borderRadius: "30px" }}
          >
            Login
          </Button>
        </div>
      </div>
    </div>
    //</dialog>
  );
}

export default LoginDialog;
