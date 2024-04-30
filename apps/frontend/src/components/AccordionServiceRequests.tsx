import { AccordionDetails, AccordionSummary, Typography } from "@mui/material";

import Accordion from "@mui/material/Accordion";

type GeneralReq = {
  id: number;
  type: string;
  location: string;
  long_name_loc: string;
  status: string;
  emp_name: string;
  priority: string;
};

interface AccordionServiceRequestsProps {
  data: GeneralReq;
}

function AccordionServiceRequests(props: AccordionServiceRequestsProps) {
  const data = props.data;

  return (
    <div>
      <Accordion>
        <AccordionSummary>
          <b>
            {" "}
            {data.type}: {data.id}{" "}
          </b>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <strong>ID:</strong> {data.id}
            <br />
            <strong>Type:</strong> {data.type}
            <br />
            <strong>By:</strong> {data.emp_name}
            <br />
            <strong>Status:</strong> {data.status}
            <br />
            <strong>Room:</strong> {data.location}
            <br />
            <strong>Priority:</strong> {data.priority} <hr />
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default AccordionServiceRequests;
