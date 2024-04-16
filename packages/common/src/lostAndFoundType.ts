import { Dayjs } from "dayjs";

export interface lostAndFound {
  name: string;
  date: Dayjs | null;
  priority: string;
  status: string;
  type: string;
  objectDesc: string;
  location: string;
}
