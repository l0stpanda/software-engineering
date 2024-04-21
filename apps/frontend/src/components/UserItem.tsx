import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import PendingUser from "./PendingUser.tsx";

type users = {
  id: string;
  email: string;
  username: string;
  role: string;
};

export default function PendingUserItem() {
  const { getAccessTokenSilently } = useAuth0();

  // Use state for records being displayed
  const [records, setRecords] = useState<users[]>([]);

  // Get records from database, and update useState
  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const token = await getAccessTokenSilently();
        const response = await axios.get("/api/userAdding", {
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
    <div className="px-8 p5 h-screen bg-background">
      <h1 className="my-2 font-header text-primary font-bold text-3xl text-center">
        Users
      </h1>
      <table className="w-full">
        <thead className="bg-secondary border-b-2 border-b-primary">
          <tr>
            <th>Email</th>
            <th>Username</th>
            <th>Role</th>
            {/* Dynamically generate column headers */}
          </tr>
        </thead>
        <tbody>
          {/* Map through the records and create a row for each record */}
          {records.map((record) => (
            <PendingUser
              key={record.id}
              id={record.id}
              email={record.email}
              username={record.username}
              role={record.role}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
