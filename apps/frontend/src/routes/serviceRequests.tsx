import React, { useEffect, useState } from "react";
import BackgroundPattern from "../components/backgroundPattern.tsx";
import { Tab, Tabs, Tooltip } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import PendingReqItem from "../components/PendingReqItem.tsx";
import FlowerReqForm from "../components/flowerReq.tsx";
import LocalFloristIcon from "@mui/icons-material/LocalFlorist";
import WalletIcon from "@mui/icons-material/Wallet";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy";
import PersonIcon from "@mui/icons-material/Person";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import LostFound from "../components/lostAndFound.tsx";
import RoomSchedulingReq from "../components/roomSchedulingReq.tsx";
import MedicalDeviceReq from "../components/medicalDeviceReq.tsx";
import MedicineDeliveryReq from "../components/MedicineDeliveryReq.tsx";

type GeneralReq = {
  id: number;
  type: string;
  location: string;
  status: string;
  emp_name: string;
  priority: string;
};

function ServiceRequests() {
  const { getAccessTokenSilently } = useAuth0();

  const [currentTabIndex, setCurrentTabIndex] = useState<number>(0);

  const handleTabChange = (e: React.SyntheticEvent, tabIndex: number) => {
    console.log(tabIndex);
    setCurrentTabIndex(tabIndex);
  };

  // Use state for records being displayed
  const [records, setRecords] = useState<GeneralReq[]>([]);

  // Get records from database, and update useState
  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const token = await getAccessTokenSilently();
        const response = await axios.get("/api/fetchAll", {
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
    <div className="w-screen h-full">
      <BackgroundPattern />
      <div className="flex flex-row w-full h-full px-4 gap-4 py-4">
        {/*Pending Requests*/}
        <div className="h-full w-1/2 bg-background rounded-lg flex flex-col px-4">
          <h1 className="my-2 font-header text-primary font-bold text-3xl text-center">
            Pending Requests
          </h1>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-secondary border-b-2 border-b-primary">
                <tr>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">
                    Type
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">
                    Status
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">
                    Priority
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">
                    Location
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">
                    Employee Name
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">
                    Delete
                  </th>
                  {/* Dynamically generate column headers */}
                </tr>
              </thead>
              <tbody className="overflow-y-auto">
                {/* Map through the records and create a row for each record */}
                {records.map((record) => (
                  <PendingReqItem
                    key={record.id}
                    id={record.id}
                    status={record.status}
                    priority={record.priority}
                    location={record.location}
                    type={record.type}
                    emp_name={record.emp_name}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/*Make new requests*/}
        <div className="h-full w-1/2 flex flex-col gap-4">
          <div className="bg-background rounded-lg">
            {/*<h1 className="my-2 font-header text-primary font-bold text-xl text-center">*/}
            {/*    Choose a new request*/}
            {/*</h1>*/}
            <Tabs
              variant="scrollable"
              scrollButtons="auto"
              value={currentTabIndex}
              onChange={handleTabChange}
            >
              <Tooltip title="Flower Delivery">
                <Tab icon={<LocalFloristIcon />} id="tab-0" />
              </Tooltip>
              <Tab icon={<WalletIcon />} id="tab-1" />
              <Tab icon={<MeetingRoomIcon />} id="tab-2" />
              <Tab icon={<MonitorHeartIcon />} id="tab-3" />
              <Tab icon={<LocalPharmacyIcon />} id="tab-4" />
              <Tab icon={<PersonIcon />} id="tab-5" />
              <Tab icon={<CleaningServicesIcon />} id="tab-6" />
            </Tabs>
          </div>

          <div className="bg-background rounded-lg overflow-y-auto h-full">
            {currentTabIndex === 0 && <FlowerReqForm />}
            {currentTabIndex === 1 && <LostFound />}
            {currentTabIndex === 2 && <RoomSchedulingReq />}
            {currentTabIndex === 3 && <MedicalDeviceReq />}
            {currentTabIndex === 4 && <MedicineDeliveryReq />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceRequests;
