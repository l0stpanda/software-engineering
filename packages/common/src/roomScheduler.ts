import { Dayjs } from "dayjs";
export interface roomSchedulerFields {
  employName: string;
  startTime: Dayjs | null;
  lengthRes: string;
  roomNum: string;
  reqStatus: string;
  priority: string;
}
