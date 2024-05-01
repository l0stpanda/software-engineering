//import mapImg from "../assets/00_thelowerlevel1.png";
import heroImage from "../assets/heroImage.png";
import React, { useState, useEffect } from "react";
// import { Dialog } from "@mui/material";
//import LoginDialog from "../components/loginDialog.tsx";
//import { useAuth0 } from "@auth0/auth0-react";
import SmoothSlideshow from "../components/SmoothSlideshow";
//import loginIcon from '../assets/loginIcon.png';
import LoginButton from "../components/LoginButton";
import MapIcon from "../components/mapIcon";

function HeroPage() {
  // Import login from Auth0
  //const { loginWithRedirect } = useAuth0();

  // Use state for whether login dialog is visible or not
  //const [dialogOpen, setDialogOpen] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);

  // Open login dialog
  // async function setLoginOpen() {
  //   await loginWithRedirect({
  //     appState: {
  //       returnTo: "map",
  //     },
  //   });
  // }

  // Close login dialog
  // function setLoginClose() {
  //   setDialogOpen(false);
  // }

  useEffect(() => {
    // Show title after a delay
    const titleTimeout = setTimeout(() => {
      setShowTitle(true);
    }, 1000);

    // Show subtitle after a delay
    const subtitleTimeout = setTimeout(() => {
      setShowSubtitle(true);
    }, 2000);

    // Clean up the timeouts
    return () => {
      clearTimeout(titleTimeout);
      clearTimeout(subtitleTimeout);
    };
  }, []);

  return (
    <div
      className="flex flex-row h-screen w-screen bg-primary overflow-hidden max-w-screen"
      style={{
        backgroundImage: `url(${heroImage})`,
        backgroundSize: "100%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "left",
        animationName: "parallaxSlide",
        animationDuration: "70s",
        animationIterationCount: "infinite",
        animationTimingFunction: "linear",
        transform: "scale(1)", // scale the whole page to 90% of its original size
      }}
    >
      <div className="flex flex-col w-49/50 items-start">
        <div
          className="flex flex-col text-left h-full px-20 rounded"
          style={{ marginTop: "130px" }}
        >
          <div
            className="relative"
            style={{ borderRadius: "10px", padding: "20px" }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                right: -150,
                bottom: 0,
                left: 0,
                background: "rgba(0, 40, 102 , 0.4)",
                zIndex: -1,
                borderRadius: "15px",
              }}
            ></div>
            <h3
              className={`m-0 text-background font-header text-5xl mb-2 hover:translate-x-2 transition-transform duration-300 font-bold shadow ${
                showTitle ? "opacity-100 animate-fadeInLeft" : "opacity-0"
              } transition-opacity
      duration-1000 transform hover:translate-x-2
      transition-transform ease-in-out duration-300`}
              style={{ fontSize: "55px" }}
            >
              Brigham and Women's Hospital
            </h3>
            <h1 className="m-0 text-background font-header text-5xl mb-8 hover:translate-x-2 transition-transform duration-300">
              <span
                className={`inline-block bg-white text-4xl mb-2 ${
                  showSubtitle ? "opacity-100 animate-fadeInLeft" : "opacity-0"
                } transition-opacity duration-1000`}
                style={{ fontSize: "30px", margin: "0", fontWeight: 100 }}
              >
                Transforming Medicine Through
              </span>
              <br />
              <span
                className={`inline-block bg-white text-4xl ${
                  showSubtitle
                    ? "opacity-100 animate-fadeInLeft animate-delay-500"
                    : "opacity-0"
                } transition-opacity duration-1000`}
                style={{ fontSize: "30px", margin: "0", fontWeight: 100 }}
              >
                Life-Giving Breakthroughs
              </span>
            </h1>
          </div>
          <div
            className="flex flex-row w-full animate-fadeInLeft"
            style={{
              animationDelay: "2.5s",
              animationDuration: "2s",
            }}
          >
            <MapIcon />
          </div>
          <div
            className="flex flex-row w-full animate-fadeInLeft"
            style={{
              marginTop: "200px",
              animationDelay: "2.5s",
              animationDuration: "2s",
            }}
          >
            <LoginButton />
          </div>
          <div
            className="justify-end mb-2 ml-2 w-full"
            style={{ marginTop: "100px" }}
          >
            <p
              className={`text-xs text-background font-serif items-end ${
                showTitle
                  ? "opacity-100 animate-fadeInLeft animate-delay-1400"
                  : "opacity-0"
              } transition-opacity 
        duration-1000 transform hover:translate-x-2 
        transition-transform ease-in-out duration-1000`}
            >
              Disclaimer: This website is a term project exercise for WPI CS
              3733 Software Engineering (Prof. Wong) and is not to be confused
              with the actual Brigham & Women’s Hospital website
            </p>
          </div>
        </div>
      </div>
      <div
        className="flex flex-col w-1/3 p-11 shadow-md animate-fadeInLeft"
        style={{
          marginLeft: "100px",
          animationDelay: "3s",
          animationDuration: "2s",
        }}
      >
        <SmoothSlideshow />
      </div>
    </div>
  );
}

export default HeroPage;
