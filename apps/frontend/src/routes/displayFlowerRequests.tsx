import React, { useEffect, useState } from "react";
import axios from "axios";
import PendingRequestItem from "../components/PendingRequestItem.tsx";
import { useAuth0 } from "@auth0/auth0-react";
import PendingLost from "./displayLost.tsx";
import PendingRoomSched from "./displayRoomSched.tsx";
import PendingMedicalDevice from "./displayMedicalDevice.tsx";
import PendingMedicineDelivery from "./displayMedicineDelivery.tsx";
import { Tab, Tabs } from "@mui/material";

// Define database json type
type FlowerArray = {
  sent_by: string;
  sent_to: string;
  requestDate: string;
  note: string;
  room_name: string;
};

type FlowerReqData = {
  id: number;
  status: string;
  priority: string;
  location: string;
  flowerID: FlowerArray[];
};

export default function PendingFlowerRequest() {
  const { getAccessTokenSilently } = useAuth0();
  const [currentTabIndex, setCurrentTabIndex] = useState<number>(0);

  const handleTabChange = (e: React.SyntheticEvent, tabIndex: number) => {
    console.log(tabIndex);
    setCurrentTabIndex(tabIndex);
  };

  // Use state for records being displayed
  const [records, setRecords] = useState<FlowerReqData[]>([]);

  // Get records from database, and update useState
  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const token = await getAccessTokenSilently();
        const response = await axios.get("/api/flowerRequest", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRecords(response.data); // Assuming the data is an array of flower request data
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching flower requests", error);
      }
    };

    fetchData().catch((error) => {
      console.error("Error from fetchData promise:", error);
    });
  }, [getAccessTokenSilently]);

  return (
    <div>
      <React.Fragment>
        <Tabs value={currentTabIndex} onChange={handleTabChange}>
          <Tab label="Flower Request" id="tab-0" />
          <Tab label="Lost and Found" id="tab-1" />
          <Tab label="Room Scheduling" id="tab-2" />
          <Tab label="Medical Device Delivery" id="tab-3" />
          <Tab label="Medicine Delivery" id="tab-4" />
        </Tabs>
      </React.Fragment>

      <div id="tab-0" className="px-8 p5 bg-background">
        {currentTabIndex === 0 && (
          <div>
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
                    key={record.id}
                    id={record.id}
                    status={record.status}
                    priority={record.priority}
                    location={record.location}
                    flowerID={record.flowerID}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <div id="tab-1">
        {currentTabIndex === 1 && <PendingLost></PendingLost>}{" "}
      </div>
      <div id="tab-2">
        {currentTabIndex === 2 && <PendingRoomSched></PendingRoomSched>}{" "}
      </div>
      <div id="tab-3">
        {currentTabIndex === 3 && <PendingMedicalDevice></PendingMedicalDevice>}{" "}
      </div>
      <div id="tab-4">
        {currentTabIndex === 4 && (
          <PendingMedicineDelivery></PendingMedicineDelivery>
        )}{" "}
      </div>
    </div>
  );
}
