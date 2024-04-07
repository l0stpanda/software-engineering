import { Dayjs } from "dayjs";

export type medicalDeviceDelivery = {
  employeeName: string;
  roomName: string;
  medicalDeviceName: string;
  quantity: string;
  priority: string;
  status: string;
  deliveryDate: Dayjs | null;
};
