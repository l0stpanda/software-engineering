import React from "react";
import LostFound from "../components/lostAndFound.tsx";
import dayjs from "dayjs";

export type LostAndFoundReq = {
  name: string;
  date: dayjs.Dayjs;
  objectDesc: string;
  priority: string;
  status: string;
  type: string;
  location: string;
};

export default function LostItemRequest() {
  return (
    <div>
      <LostFound></LostFound>
    </div>
  );
}
