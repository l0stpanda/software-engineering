import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import PendingSanitationRequestComponent from "../components/PendingSanitationReq.tsx";

// Define database json type
type SanitationReq = {
  employeeName: string;
  roomName: string;
  severity: string;
  hazardous: string;
  priority: string;
  status: string;
};
type LostFoundData = {
  id: number;
  status: string;
  priority: string;
  sanitationRequest: SanitationReq[];
};

export default function PendingSanitationRequest() {
  const { getAccessTokenSilently } = useAuth0();

  // Use state for records being displayed
  const [records, setRecords] = useState<LostFoundData[]>([]);

  // Get records from database, and update useState
  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const token = await getAccessTokenSilently();
        const response = await axios.get("/api/medicalDevice", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log(response.data);
        setRecords(response.data); // Assuming the data is an array of lost and found request data
      } catch (error) {
        console.error("Error fetching sanitation requests", error);
      }
    };

    fetchData().catch((error) => {
      console.error("Error from fetchData promise:", error);
    });
  }, [getAccessTokenSilently]);

  return (
    <div className="px-8 p5 h-screen bg-background">
      <h1 className="my-2 font-header text-primary font-bold text-3xl text-center">
        Pending Sanitation Request
      </h1>
      <table className="w-full">
        <thead className="bg-secondary border-b-2 border-b-primary">
          <tr>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              ID
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              Status
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              Priority
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              Severity
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              Location
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              Hazardous
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
            <PendingSanitationRequestComponent
              key={record.id}
              id={record.id}
              status={record.status}
              priority={record.priority}
              sanitationRequest={record.sanitationRequest}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
