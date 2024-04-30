import React, { useState, useEffect, useRef } from "react";
import HomeImage1 from "../assets/HomeImage1.jpg";
import HomeImage2 from "../assets/HomeImage2.jpg";
import HomeImage3 from "../assets/HomeImage3.jpg";
import HomeImage4 from "../assets/HomeImage4.jpg";
const images = [HomeImage1, HomeImage2, HomeImage3, HomeImage4];

const SmoothSlideshow = () => {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timer = useRef<number | null>(null); // Use a ref to keep track of the timer

  const handleMouseEnter = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrent((current) => (current + 1) % images.length);
        setIsTransitioning(false);
      }, 500); // adjust transition duration as needed
    }
    if (timer.current !== null) {
      window.clearInterval(timer.current); // Clear the interval when the mouse enters
    }
  };

  const handleMouseLeave = () => {
    timer.current = window.setInterval(() => {
      // Set the interval again when the mouse leaves
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrent((current) => (current + 1) % images.length);
        setIsTransitioning(false);
      }, 500); // adjust transition duration as needed
    }, 3000); // change image every 3 seconds
  };

  useEffect(() => {
    timer.current = window.setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrent((current) => (current + 1) % images.length);
        setIsTransitioning(false);
      }, 500); // adjust transition duration as needed
    }, 3000); // change image every 3 seconds

    return () => {
      if (timer.current !== null) {
        window.clearInterval(timer.current); // clean up on unmount
      }
    };
  }, []);

  return (
    <div
      className="fadeIn w-full h-screen flex items-center justify-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <style>
        {`
            @keyframes fadeIn {
                0% {
                    opacity: 0;
                }
                100% {
                    opacity: 1;
                }
            }
            @keyframes slideOut {
                0% {
                    transform: translateX(0);
                    opacity: 1;
                }
                100% {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
            .animate-fadeIn {
                animation: fadeIn 0.5s ease-in-out;
            }
            .animate-slideOut {
                animation: slideOut 0.5s ease-in-out;
            }
            `}
      </style>
      <div className="relative w-full h-full">
        {images.map((image, index) => (
          <img
            key={index}
            className={`w-full h-auto object-cover absolute top-0 left-0 ${
              index === current
                ? isTransitioning
                  ? "animate-slideOut"
                  : "animate-fadeIn"
                : "opacity-0"
            }`}
            src={image}
            alt={`slide ${index}`}
            style={{ borderRadius: "10px", maxHeight: "100vh" }} // Add this line
          />
        ))}
      </div>
    </div>
  );
};

export default SmoothSlideshow;
