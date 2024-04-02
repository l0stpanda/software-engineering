import React from "react";
import mapImg from "../assets/LL1Map.png";
import { Button, TextField } from "@mui/material";
import {
  TransformWrapper,
  TransformComponent,
  useControls,
} from "react-zoom-pan-pinch";

function Map() {
  const Controls = () => {
    const { zoomIn, zoomOut } = useControls();
    return (
      <div className="fixed pt-10 px-3 z-10 flex gap-2">
        <Button
          onClick={() => zoomIn()}
          type="button"
          id="zoomInBut"
          variant="contained"
          className="zoomInBut"
          size="small"
          sx={{ borderRadius: "30px" }}
        >
          +
        </Button>
        <Button
          onClick={() => zoomOut()}
          type="button"
          id="zoomOutBut"
          variant="contained"
          className="zoomOutBut"
          size="small"
          sx={{ borderRadius: "30px" }}
        >
          -
        </Button>
      </div>
    );
  };

  return (
    <div>
      {/*Location and Destination Box*/}
      <div
        className="my-8
                   flex
                   flex-row-reverse
                   min-h-screen
                   max-w-screen-2xl
                   justify-start"
      >
        {/*Map Image*/}
        <div className="w-2/3">
          <TransformWrapper>
            <Controls />
            <TransformComponent>
              <img src={mapImg} className="object-contain h-full" alt="Map" />
            </TransformComponent>
          </TransformWrapper>
        </div>

        {/*headers and stuff*/}
        <div
          className="flex flex-col
                w-1/4
                mt-10"
        >
          <div
            className="mr-8
                    ml-5
                    py-5
                    flex
                    flex-col
                    items-center
                    bg-background
                    rounded-xl
                    border-primary
                    border-2"
          >
            <div className="">
              <h2 className="text-primary font-header pb-4">
                Where would you like to go?
              </h2>
              <TextField
                id="outlined-basic"
                variant="outlined"
                label="Location"
                sx={{
                  input: {
                    color: "primary",
                    background: "background",
                  },
                }}
              />
              <br />
              <TextField
                id="outlined-basic"
                variant="outlined"
                label="Destination"
                sx={{
                  input: {
                    color: "primary",
                    background: "background",
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Map;
