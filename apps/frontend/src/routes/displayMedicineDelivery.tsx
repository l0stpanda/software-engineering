import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import PendingMedicineDeliveryItem from "../components/PendingMedicineDelivery.tsx";

// Define database json type
type medicineDeliv = {
  id: number;
  medicine_name: string;
  quantity: number;
  room_name: string;
};

type LostFoundData = {
  id: number;
  status: string;
  priority: string;
  medicineReqID: medicineDeliv[];
};

export default function PendingMedicineDelivery() {
  const { getAccessTokenSilently } = useAuth0();

  // Use state for records being displayed
  const [records, setRecords] = useState<LostFoundData[]>([]);

  // Get records from database, and update useState
  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const token = await getAccessTokenSilently();
        const response = await axios.get("/api/medicineRequest", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log(response.data);
        setRecords(response.data); // Assuming the data is an array of lost and found request data
      } catch (error) {
        console.error(
          "Error fetching Pending Medicine Delivery requests",
          error,
        );
      }
    };

    fetchData().catch((error) => {
      console.error("Error from fetchData promise:", error);
    });
  }, [getAccessTokenSilently]);

  return (
    <div className="px-8 p5 h-screen bg-background">
      <h1 className="my-2 font-header text-primary font-bold text-3xl text-center">
        Pending Medicine Delivery
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
              Medicine Name
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              Quantity
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              Location
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
            <PendingMedicineDeliveryItem
              key={record.id}
              id={record.id}
              status={record.status}
              priority={record.priority}
              medicineReqID={record.medicineReqID}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
