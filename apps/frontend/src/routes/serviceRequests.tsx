import React, { useEffect, useState } from "react";
import BackgroundPattern from "../components/backgroundPattern.tsx";
import {
  MenuItem,
  Select,
  SelectChangeEvent,
  Tab,
  Tabs,
  Tooltip,
} from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import PendingReqItem from "../components/PendingReqItem.tsx";
import * as console from "console";
import UserDropdown from "../components/userDropdown.tsx";
import FlowerReqForm from "../components/flowerReq.tsx";
import LocalFloristIcon from "@mui/icons-material/LocalFlorist";
import WalletIcon from "@mui/icons-material/Wallet";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import SecurityIcon from "@mui/icons-material/Security";
import LostFound from "../components/lostAndFound.tsx";
import RoomSchedulingReq from "../components/roomSchedulingReq.tsx";
import MedicalDeviceReq from "../components/medicalDeviceReq.tsx";
import MedicineDeliveryReq from "../components/MedicineDeliveryReq.tsx";
import SanitationReq from "../components/sanitationReq.tsx";
import SecurityRequestForm from "../components/securityRequest.tsx";
import MaintenanceReq from "../components/maintenanceReq.tsx";
import ToolIcon from "@mui/icons-material/Build";

type GeneralReq = {
  id: number;
  type: string;
  location: string;
  long_name_loc: string;
  status: string;
  emp_name: string;
  priority: string;
};

function ServiceRequests() {
  const { getAccessTokenSilently } = useAuth0();

  const [currentTabIndex, setCurrentTabIndex] = useState<number>(0);

  const handleTabChange = (e: React.SyntheticEvent, tabIndex: number) => {
    //console.log(tabIndex);
    setCurrentTabIndex(tabIndex);
  };

  // Use state for records being displayed
  const [records, setRecords] = useState<GeneralReq[]>([]);
  const [permRecords, setPermRecords] = useState<GeneralReq[]>([]);
  const [reqType, setReqType] = useState<string>("All");
  const [statusType, setStatusType] = useState<string>("All");
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
        setPermRecords(response.data); // Assuming the data is an array of flower request data
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching flower requests", error);
      }
    };

    fetchData().catch((error) => {
      console.error("Error from fetchData promise:", error);
    });
  }, [getAccessTokenSilently]);

  function updateName(e: string) {
    setReqType(e);
    // if(reqType == undefined && statusType == undefined){
    //     setRecords(permRecords);
    // }
  }

  function handleStatusTypeDropdown(e: SelectChangeEvent) {
    setStatusType(e.target.value);
    // if(reqType == undefined && statusType == undefined){
    //     setRecords(permRecords);
    // }
  }

  useEffect(() => {
    let arr: GeneralReq[] = [];
    if (reqType !== "All" && statusType !== "All") {
      for (let i = 0; i < permRecords.length; i++) {
        if (
          permRecords[i].emp_name == reqType &&
          permRecords[i].status == statusType
        ) {
          arr.push(permRecords[i]);
        }
      }
    } else if (reqType !== "All") {
      for (let i = 0; i < permRecords.length; i++) {
        if (permRecords[i].emp_name == reqType) {
          arr.push(permRecords[i]);
        }
      }
    } else if (statusType !== "All") {
      for (let i = 0; i < permRecords.length; i++) {
        if (permRecords[i].status == statusType) {
          arr.push(permRecords[i]);
        }
      }
    } else {
      arr = permRecords;
    }
    setRecords(arr);
  }, [statusType, reqType, permRecords]);
  //We want to filter by service request type

  return (
    <div className="w-screen h-full">
      <BackgroundPattern />
      <div className="flex flex-row w-full h-full px-4 gap-4 py-4">
        {/*Pending Requests*/}
        <div className="h-full w-1/2 bg-background rounded-lg flex flex-col px-4">
          <h1 className="mt-4 mb-4 ml-2.5 font-header text-primary font-extrabold text-4xl text-center">
            Pending Requests
          </h1>
          <div className="pb-2">
            <div className="w-20 flex flex-row gap-2 w-full">
              <UserDropdown
                room={reqType}
                update={updateName}
                label={"Username"}
              />

              <Select
                name="Status Type"
                required={true}
                onChange={handleStatusTypeDropdown}
                value={statusType}
                defaultValue={"No Status"}
                size="small"
                sx={{
                  borderRadius: "10px",
                }}
              >
                <MenuItem value={"All"}>Select Status Type</MenuItem>
                <MenuItem value={"Unassigned"}>Unassigned</MenuItem>
                <MenuItem value={"Assigned"}>Assigned</MenuItem>
                <MenuItem value={"InProgress"}>In Progress</MenuItem>
                <MenuItem value={"Closed"}>Closed</MenuItem>
              </Select>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-primary border-b-2 border-b-[#F6BD38]">
                <tr>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left text-background">
                    Type
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left text-background">
                    Status
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left text-background">
                    Priority
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left text-background">
                    Location
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left text-background">
                    Employee Name
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left text-background">
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
                    long_name_loc={record.long_name_loc}
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
        <div className="h-full w-1/2 flex flex-col gap-4 overflow-hidden">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              overflow: "hidden",
              width: "100%",
            }}
            className="bg-primary rounded-lg"
          >
            {/*<h1 className="my-2 font-header text-primary font-bold text-xl text-center">*/}
            {/*    Choose a new request*/}
            {/*</h1>*/}
            <Tabs
              variant="scrollable"
              scrollButtons="auto"
              value={currentTabIndex}
              onChange={handleTabChange}
              sx={{
                overflow: "hidden", // Hiding overflow here
              }}
            >
              <Tooltip title="Flower Delivery">
                <Tab
                  icon={<LocalFloristIcon />}
                  id="tab-0"
                  sx={{
                    transition: "transform 0.3s ease-in-out",
                    color: "#FFFFFF",
                    "&:hover, &:focus": {
                      transform: "scale(1.4)",
                      position: "relative",
                      zIndex: 1,
                      color: "#F6BD38",
                    },
                  }}
                />
              </Tooltip>
              <Tooltip title="Lost Item Request">
                <Tab
                  icon={<WalletIcon />}
                  id="tab-1"
                  sx={{
                    transition: "transform 0.3s ease-in-out",
                    color: "#FFFFFF",
                    "&:hover, &:focus": {
                      transform: "scale(1.4)",
                      position: "relative",
                      zIndex: 1,
                      color: "#F6BD38",
                    },
                  }}
                />
              </Tooltip>
              <Tooltip title="Room Scheduling">
                <Tab
                  icon={<MeetingRoomIcon />}
                  id="tab-2"
                  sx={{
                    transition: "transform 0.3s ease-in-out",
                    color: "#FFFFFF",
                    "&:hover, &:focus": {
                      transform: "scale(1.3)",
                      position: "relative",
                      zIndex: 1,
                      color: "#F6BD38",
                    },
                  }}
                />
              </Tooltip>
              <Tooltip title="Medical Device Delivery">
                <Tab
                  icon={<MonitorHeartIcon />}
                  id="tab-3"
                  sx={{
                    transition: "transform 0.3s ease-in-out",
                    color: "#FFFFFF",
                    "&:hover, &:focus": {
                      transform: "scale(1.4)",
                      position: "relative",
                      zIndex: 1,
                      color: "#F6BD38",
                    },
                  }}
                />
              </Tooltip>
              <Tooltip title="Medicine Delivery">
                <Tab
                  icon={<LocalPharmacyIcon />}
                  id="tab-4"
                  sx={{
                    transition: "transform 0.3s ease-in-out",
                    color: "#FFFFFF",
                    "&:hover, &:focus": {
                      transform: "scale(1.4)",
                      position: "relative",
                      zIndex: 1,
                      color: "#F6BD38",
                    },
                  }}
                />
              </Tooltip>
              <Tooltip title="Sanitation Request">
                <Tab
                  icon={<CleaningServicesIcon />}
                  id="tab-5"
                  sx={{
                    transition: "transform 0.3s ease-in-out",
                    color: "#FFFFFF",
                    "&:hover, &:focus": {
                      transform: "scale(1.4)",
                      position: "relative",
                      zIndex: 1,
                      color: "#F6BD38",
                    },
                  }}
                />
              </Tooltip>
              <Tooltip title="Security Request">
                <Tab
                  icon={<SecurityIcon />}
                  id="tab-6"
                  sx={{
                    transition: "transform 0.3s ease-in-out",
                    color: "#FFFFFF",
                    "&:hover, &:focus": {
                      transform: "scale(1.4)",
                      position: "relative",
                      zIndex: 1,
                      color: "#F6BD38",
                    },
                  }}
                />
              </Tooltip>
              <Tooltip title="Maintenance Request">
                <Tab
                  icon={<ToolIcon />}
                  id="tab-6"
                  sx={{
                    transition: "transform 0.3s ease-in-out",
                    "&:hover": {
                      transform: "scale(1.4)",
                      position: "relative",
                      zIndex: 1, // Ensure scaling item is above others
                    },
                  }}
                />
              </Tooltip>
            </Tabs>
          </div>

          <div className="bg-background rounded-lg overflow-y-auto h-full">
            {currentTabIndex === 0 && <FlowerReqForm />}
            {currentTabIndex === 1 && <LostFound />}
            {currentTabIndex === 2 && <RoomSchedulingReq />}
            {currentTabIndex === 3 && <MedicalDeviceReq />}
            {currentTabIndex === 4 && <MedicineDeliveryReq />}
            {currentTabIndex === 5 && <SanitationReq />}
            {currentTabIndex === 6 && <SecurityRequestForm />}
            {currentTabIndex === 7 && <MaintenanceReq />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceRequests;
