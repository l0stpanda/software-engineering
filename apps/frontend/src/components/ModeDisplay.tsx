import { useState } from "react";

interface ModeDisplayProps {
  handleMode: (mode: string) => void;
  mode: string;
}

const ModeDisplay = (props: ModeDisplayProps) => {
  const [mode, setMode] = useState(props.mode); // State to track the current mode

  const handleModeToggle = () => {
    // Toggle between 'info' and 'path' modes
    setMode(mode === "info" ? "path" : "info");
    props.handleMode(mode === "info" ? "path" : "info");
  };

  return (
    <div
      className="fixed top-20 left-[50%] transform -translate-x-1/2 cursor-pointer"
      onClick={handleModeToggle}
    >
      <div className="flex flex-col items-center justify-center px-4 py-2 bg-background bg-opacity-75 text-white rounded-lg shadow-md border border-gray-200">
        <h2 className="text-lg font-medium transition-opacity duration-300 hover:opacity-75">
          {mode === "info" ? "Info Mode" : "Path Mode"}
        </h2>
        <p className="text-xs text-gray-300">Click to toggle</p>
      </div>
    </div>
  );
};

export default ModeDisplay;
