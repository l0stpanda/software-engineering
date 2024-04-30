import { Dayjs } from "dayjs";

export type langInterpreterType = {
  name: string;
  location: string;
  date: Dayjs | null;
  priority: string;
  language: string;
  modeOfInterp: string;
  specInstruct: string;
  status: string;
};
