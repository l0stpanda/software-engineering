//import { Icon } from "@mui/material";
import LoopIcon from "@mui/icons-material/Loop";

export default function SpinningLoader() {
  return (
    <div className="flex w-screen h-screen justify-center">
      <LoopIcon
        className="h-6 w-6 animate-spin my-auto"
        color="primary"
        fontSize="large"
      ></LoopIcon>
    </div>
  );
}
