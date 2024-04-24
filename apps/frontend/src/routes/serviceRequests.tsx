import React, { useEffect, useState } from "react";
import BackgroundPattern from "../components/backgroundPattern.tsx";
import { MenuItem, Select, SelectChangeEvent, Tab, Tabs } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import PendingReqItem from "../components/PendingReqItem.tsx";
import * as console from "console";

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

  function handleTypeDropdown(e: SelectChangeEvent) {
    setReqType(e.target.value);
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
          permRecords[i].type == reqType &&
          permRecords[i].status == statusType
        ) {
          arr.push(permRecords[i]);
        }
      }
    } else if (reqType !== "All") {
      for (let i = 0; i < permRecords.length; i++) {
        if (permRecords[i].type == reqType) {
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
          <h1 className="my-2 font-header text-primary font-bold text-3xl text-center">
            Pending Requests
          </h1>

          <div className="flex flex-row gap-2 pb-2">
            <div className="w-20">
              <Select
                name="Request Type"
                required={true}
                onChange={handleTypeDropdown}
                value={reqType}
                defaultValue={"All"}
                size="small"
              >
                <MenuItem value={"All"}>Select Request Type</MenuItem>
                <MenuItem value={"Flower Request"}>Flower Request</MenuItem>
                <MenuItem value={"Lost and Found"}>Lost and Found</MenuItem>
                <MenuItem value={"Medical Device Delivery"}>
                  Medical Device Delivery
                </MenuItem>
                <MenuItem value={"Sanitation Request"}>
                  Sanitation Request
                </MenuItem>
                <MenuItem value={"Room Scheduling"}>Room Scheduling</MenuItem>
                <MenuItem value={"Medicine Request"}>
                  Medicine Delivery
                </MenuItem>
              </Select>

              <Select
                name="Status Type"
                required={true}
                onChange={handleStatusTypeDropdown}
                value={statusType}
                defaultValue={"No Status"}
                size="small"
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
              <tbody>
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
        <div className="h-full w-1/2">
          <div className="bg-background rounded-lg overflow-x-auto">
            <Tabs
            //value={currentTabIndex} onChange={handleTabChange}
            >
              <Tab label="Flower Request" id="tab-0" />
              <Tab label="Lost and Found" id="tab-1" />
              <Tab label="Room Scheduling" id="tab-2" />
              <Tab label="Medical Device Delivery" id="tab-3" />
              <Tab label="Medicine Delivery" id="tab-4" />
              <Tab label="Users" id="tab-5" />
              <Tab label="Sanitation Request" id="tab-6" />
            </Tabs>
          </div>

          <div className="bg-background rounded-lg overflow-y-auto"></div>
        </div>
      </div>
    </div>
  );
}

export default ServiceRequests;
