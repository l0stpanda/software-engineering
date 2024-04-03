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
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg flex items-center justify-center">
      <table className="w-50% text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Flower Delivery Request
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Date Entered
            </th>
            <th scope="col" className="px-6 py-3">
              Time Entered
            </th>
            <th scope="col" className="px-6 py-3">
              Destination
            </th>
            <th scope="col" className="px-6 py-3">
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
