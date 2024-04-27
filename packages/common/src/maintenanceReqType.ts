import {Dayjs} from "dayjs";

export interface maintenanceReqType {
        name: string;
        date: Dayjs | null;
        priority: string;
        status: string;
        type: string;
        location: string;
}
