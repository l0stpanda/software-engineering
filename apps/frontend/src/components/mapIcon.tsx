import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import mapImg from "../assets/00_thelowerlevel1.png";

const MapIcon = () => {
  const [isHovered, setIsHovered] = useState(false);
  const circleRef = useRef<HTMLDivElement | null>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ padding: "20px" }} // Increase or decrease this value to adjust the hitbox size
    >
      <div
        className="flex flex-col items-left relative"
        style={{
          marginBottom: "-120px",
          marginTop: "60px",
          marginLeft: "-10px",
        }}
      >
        <Link to="/map">
          <div
            ref={circleRef}
            className={`relative rounded-full overflow-hidden transition-all duration-500 ease-in-out ${
              isHovered ? "w-64 h-12 translate-x-4" : "w-12 h-12"
            }`}
            style={{ transitionTimingFunction: "ease-in-out" }}
          >
            <img
              src={mapImg}
              className={`absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 ease-in-out ${
                isHovered ? "scale-125" : "scale-100"
              }`}
              alt="Map Preview"
              style={{ transitionTimingFunction: "ease-in-out" }}
            />
          </div>
        </Link>
        <div
          className={`absolute bottom-0 transform -translate-x-1/2 bg-primary px-0 py-1 rounded shadow transition-all duration-400 ease-in-out ${
            isHovered ? "opacity-0 translate-y-8" : "opacity-100 translate-y-0"
          }`}
          style={{
            borderRadius: "10px",
            marginBottom: "70px",
            marginLeft: "100px",
          }}
        >
          <div className="font-thin mt-1 items-center">
            <input
              type="text"
              className="text-left bg-primary whitespace-nowrap"
              value="View Map"
              readOnly
              style={{
                color: "white",
                paddingLeft: "10px",
                paddingRight: "-100px",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapIcon;
