import { Dayjs } from "dayjs";

export interface securityRequest {
  username: string;
  location: string;
  status: string;
  emp_name: string;
  priority: string;
  incidentDescription: string;
  incidentTime: Dayjs | null;
  actionTaken: string;
}
