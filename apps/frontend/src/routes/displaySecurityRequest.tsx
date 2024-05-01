import React, { useEffect, useState } from "react";
import axios from "axios";
import PendingSecurityRequest from "../components/PendingSecurityRequestItem.tsx";
import { useAuth0 } from "@auth0/auth0-react";

// Define database json type
type securityRequestLocation = {
  id: number;
  date: string;
  description: string;
  type: string;
};
type SecurityRequestData = {
  id: number;
  status: string;
  priority: string;
  securityRequestLocation: securityRequestLocation[];
};

export default function DisplaySecurityRequests() {
  const { getAccessTokenSilently } = useAuth0();

  // Use state for records being displayed
  const [records, setRecords] = useState<SecurityRequestData[]>([]);

  // Get records from database, and update useState
  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const token = await getAccessTokenSilently();
        const response = await axios.get("/api/securityRequest", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log(response.data);
        setRecords(response.data); // Assuming the data is an array of security request data
      } catch (error) {
        console.error("Error fetching security requests", error);
      }
    };

    fetchData().catch((error) => {
      console.error("Error from fetchData promise:", error);
    });
  }, [getAccessTokenSilently]);

  return (
    <div
      className="px-8 p5 h-screen bg-background"
      style={{ borderRadius: "25px" }}
    >
      <h1 className="my-2 font-header text-primary font-bold text-3xl text-center grow-on-hover">
        Security Requests State
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
              Incident Date
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              Incident Description
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              Delete
            </th>
          </tr>
        </thead>
        <tbody>
          {/* Map through the records and create a row for each record */}
          {records.map((record) => (
            <PendingSecurityRequest
              key={record.id}
              id={record.id}
              status={record.status}
              priority={record.priority}
              date={record.securityRequestLocation[0].date}
              description={record.securityRequestLocation[0].description}
              securityRequestLocation={record.securityRequestLocation}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
