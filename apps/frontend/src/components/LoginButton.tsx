import React, { useState } from "react";
import loginIcon from "../assets/loginIcon.png";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  const [isHovered, setIsHovered] = useState(false);

  async function setLoginOpen() {
    await loginWithRedirect({
      appState: {
        returnTo: "map",
      },
    });
  }

  return (
    <button
      className={`bg-primary text-background font-body p-7 rounded-full transition-all duration-500 ease-in-out flex items-center justify-center relative ${isHovered ? "w-full p-10" : "w-12 h-12"}`}
      onClick={setLoginOpen}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ transitionTimingFunction: "ease-in-out" }}
    >
      <img
        src={loginIcon}
        alt="Login Icon"
        className={`absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-in-out ${isHovered ? "opacity-0" : "opacity-100"}`}
      />
      <span
        className={`opacity-0 absolute left-4 transition-all duration-100 ease-in-out whitespace-nowrap ${isHovered ? "opacity-100" : "opacity-0"}`}
      >
        Staff Member? <strong>Login Here</strong>
      </span>
    </button>
  );
};

export default LoginButton;
