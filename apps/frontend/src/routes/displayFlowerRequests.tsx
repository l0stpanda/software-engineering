import React, { useEffect, useState } from "react";
import axios from "axios";
import PendingRequestItem from "../components/PendingRequestItem.tsx";

// Define database json type
type FlowerReqData = {
  id: number;
  room: string;
  sent_by: string;
  sent_to: string;
  requestDate: string;
  note: string;
  status: string;
};
//Pending flower request function
export default function PendingFlowerRequest() {
  const [records, setRecords] = useState<FlowerReqData[]>([]);

  // Get records from database, and update useState
  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/flowerRequest");
        setRecords(response.data); // Assuming the data is an array of flower request data
      } catch (error) {
        console.error("Error fetching flower requests", error);
      }
    };

    fetchData().catch((error) => {
      console.error("Error from fetchData promise:", error);
    });
  }, []);

  return (
    <div className="px-8 p5 h-screen bg-background">
      <h1 className="my-2 font-header text-primary font-bold text-3xl text-center">
        Pending Flower Deliveries
      </h1>
      <table className="w-full">
        <thead className="bg-secondary border-b-2 border-b-primary">
          <tr>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              Flower Delivery Request
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              Status
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              Date Entered
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              Time Entered
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              Destination
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              Delete
            </th>
            {/* Dynamically generate column headers */}
          </tr>
        </thead>
        <tbody>
          {/* Map through the records and create a row for each record */}
          {records.map((record) => (
            <PendingRequestItem
              id={record.id}
              status={record.status}
              requestDate={record.requestDate}
              room={record.room}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
