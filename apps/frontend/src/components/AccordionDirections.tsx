import { directionInfo } from "../objects/Pathfinding";
import { AccordionDetails, AccordionSummary } from "@mui/material";
import StraightIcon from "@mui/icons-material/Straight";
import TurnLeftIcon from "@mui/icons-material/TurnLeft";
import TurnRightIcon from "@mui/icons-material/TurnRight";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import Accordion from "@mui/material/Accordion";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import lowerLevel1 from "../assets/00_thelowerlevel1.png";
import lowerLevel2 from "../assets/00_thelowerlevel2.png";
import floor1 from "../assets/01_thefirstfloor.png";
import floor2 from "../assets/02_thesecondfloor.png";
import floor3 from "../assets/03_thethirdfloor.png";

interface AccordionDirectionsProps {
  data: directionInfo;
  setImgState: (imgState: string) => void;
}

function AccordionDirections(props: AccordionDirectionsProps) {
  function onChange(event: React.SyntheticEvent, expanded: boolean) {
    if (expanded) {
      switch (props.data.floor) {
        case "L2":
          props.setImgState(lowerLevel2);
          break;
        case "L1":
          props.setImgState(lowerLevel1);
          break;
        case "1":
          props.setImgState(floor1);
          break;
        case "2":
          props.setImgState(floor2);
          break;
        case "3":
          props.setImgState(floor3);
          break;
      }
    }
  }

  const output: JSX.Element[] = [];
  const data = props.data;

  for (let i = 0; i < data.directions.length; i++) {
    if (data.directions[i] == "Continue straight at ") {
      if (i + 1 == data.directions.length) {
        output.push(
          <div className="flex text-text font-body px-1 py-2">
            <div className="float-left content-center">
              <StraightIcon sx={{ fontSize: 40 }}></StraightIcon>
            </div>
            <div className="flex text-center self-center">
              {data.directions[i]} {data.nodes[i]}
            </div>
          </div>,
        );
      } else {
        output.push(
          <>
            <div className="flex border-primary border-b text-text font-body px-1 py-2">
              <div className="float-left content-center">
                <StraightIcon sx={{ fontSize: 40 }}></StraightIcon>
              </div>
              <div className="flex text-center self-center">
                {data.directions[i]} {data.nodes[i]}
              </div>
            </div>
          </>,
        );
      }
    } else if (data.directions[i] == "Turn left at ") {
      if (i + 1 == data.directions.length) {
        output.push(
          <>
            <div className="flex text-text font-body px-1 py-2">
              <div className="float-left content-center">
                <TurnLeftIcon sx={{ fontSize: 40 }}></TurnLeftIcon>
              </div>
              <div className="flex text-center self-center">
                {data.directions[i]} {data.nodes[i]}
              </div>
            </div>
          </>,
        );
      } else {
        output.push(
          <>
            <div className="flex border-primary border-b text-text font-body px-1 py-2">
              <div className="float-left content-center">
                <TurnLeftIcon sx={{ fontSize: 40 }}></TurnLeftIcon>
              </div>
              <div className="flex text-center self-center">
                {data.directions[i]} {data.nodes[i]}
              </div>
            </div>
          </>,
        );
      }
    } else if (data.directions[i] == "Turn right at ") {
      if (i + 1 == data.directions.length) {
        output.push(
          <>
            <div className="flex text-text font-body px-1 py-2">
              <div className="float-left content-center">
                <TurnRightIcon sx={{ fontSize: 40 }}></TurnRightIcon>
              </div>
              <div className="flex text-center self-center">
                {data.directions[i]} {data.nodes[i]}
              </div>
            </div>
          </>,
        );
      } else {
        output.push(
          <>
            <div className="flex border-primary border-b text-text font-body px-1 py-2">
              <div className="float-left content-center">
                <TurnRightIcon sx={{ fontSize: 40 }}></TurnRightIcon>
              </div>
              <div className="flex text-center self-center">
                {data.directions[i]} {data.nodes[i]}
              </div>
            </div>
          </>,
        );
      }
    } else {
      if (i + 1 == data.directions.length) {
        output.push(
          <>
            <div className="flex text-text font-body px-1 py-2">
              <div className="float-left content-center">
                <TrendingUpIcon sx={{ fontSize: 40 }}></TrendingUpIcon>
              </div>
              <div className="flex text-center self-center">
                {data.directions[i]} {data.nodes[i]}
              </div>
            </div>
          </>,
        );
      } else {
        output.push(
          <>
            <div className="flex border-primary border-b text-text font-body px-1 py-2">
              <div className="float-left content-center">
                <TrendingUpIcon sx={{ fontSize: 40 }}></TrendingUpIcon>
              </div>
              <div className="flex text-center self-center">
                {data.directions[i]} {data.nodes[i]}
              </div>
            </div>
          </>,
        );
      }
    }
  }

  return (
    <>
      <Accordion onChange={onChange} disableGutters={true}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <b>Floor: {data.floor}</b>
        </AccordionSummary>
        <AccordionDetails>{output}</AccordionDetails>
      </Accordion>
    </>
  );
}

export default AccordionDirections;
