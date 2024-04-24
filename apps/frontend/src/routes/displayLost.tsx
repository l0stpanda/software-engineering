import React, { useEffect, useState } from "react";
import axios from "axios";
import PendingLostItem from "../components/PendingLostItem.tsx";
import { useAuth0 } from "@auth0/auth0-react";

// Define database json type
type lost_location = {
  id: number;
  date: string;
  description: string;
  type: string;
};
type LostFoundData = {
  id: number;
  status: string;
  priority: string;
  lost_location: lost_location[];
};

export default function PendingLost() {
  const { getAccessTokenSilently } = useAuth0();

  // Use state for records being displayed
  const [records, setRecords] = useState<LostFoundData[]>([]);

  // Get records from database, and update useState
  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const token = await getAccessTokenSilently();
        const response = await axios.get("/api/lostAndFound", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log(response.data);
        setRecords(response.data); // Assuming the data is an array of lost and found request data
      } catch (error) {
        console.error("Error fetching flower requests", error);
      }
    };

    fetchData().catch((error) => {
      console.error("Error from fetchData promise:", error);
    });
  }, [getAccessTokenSilently]);

  //Have to do this because we store the node_id in the table
  // async function idToName(id : string){
  //     const name = await axios.get(`/import/idToName/${id}`);
  //     return name.data;
  // }

  return (
    <div
      className="px-8 p5 h-screen bg-background"
      style={{ borderRadius: "25px" }}
    >
      <h1 className="my-2 font-header text-primary font-bold text-3xl text-center grow-on-hover">
        Lost and Found State
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
              Date
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              Object Desc
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
            <PendingLostItem
              key={record.id}
              id={record.id}
              status={record.status}
              priority={record.priority}
              lost_location={record.lost_location}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
