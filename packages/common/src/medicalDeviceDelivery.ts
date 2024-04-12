import { Dayjs } from "dayjs";
export type medicalDeviceDelivery = {
  employeeName: string;
  roomName: string;
  medicalDeviceName: string;
  quantity: number | string;
  priority: string;
  status: string;
  deliveryDate: Dayjs | null;
};
