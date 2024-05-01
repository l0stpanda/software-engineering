import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  YAxis,
  Cell,
  PieChart,
  Pie,
  XAxis,
  Label,
} from "recharts";
import console from "console";
import { useAuth0 } from "@auth0/auth0-react";
import Background from "../assets/allyBackground.png";
import { CustomTooltipBar, CustomTooltipPie } from "./customToolTipCharts.tsx";

type totals = {
  total_count: number;
  flower_count: number;
  lost_count: number;
  maint_count: number;
  medDev_count: number;
  med_count: number;
  sanit_count: number;
  room_sched: number;
  secur_count: number;
  unassigned_count: number;
  assigned_count: number;
  inProg_count: number;
  closed_count: number;
};

const BarChartPieChart = () => {
  const { getAccessTokenSilently } = useAuth0();

  const [totalStuff, setTotalStuff] = useState<totals>({
    total_count: 0,
    flower_count: 0,
    lost_count: 0,
    maint_count: 0,
    medDev_count: 0,
    med_count: 0,
    sanit_count: 0,
    room_sched: 0,
    secur_count: 0,
    unassigned_count: 0,
    assigned_count: 0,
    inProg_count: 0,
    closed_count: 0,
  });

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const token = await getAccessTokenSilently();
        const response = await axios.get("/api/fetchAll/data", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTotalStuff(response.data);
        // setRecords(response.data); // Assuming the data is an array of request data
        // setPermRecords(response.data); // Assuming the data is an array of request data
        //console.log(response.data);
      } catch (error) {
        console.error("Error fetching requests", error);
      }
    };
    fetchData();
  }, [getAccessTokenSilently]);

  const barData = [
    // { name: 'Total', count: totalStuff.total_count },
    {
      name: "Flowers",
      count: totalStuff.flower_count,
      fill: "#f7bba6",
    },
    {
      name: "Lost Items",
      count: totalStuff.lost_count,
      fill: "#ed8495",
    },
    {
      name: "Maintenance",
      count: totalStuff.maint_count,
      fill: "#e05286",
    },
    {
      name: "Medical Devices",
      count: totalStuff.medDev_count,
      fill: "#a73b8f",
    },
    {
      name: "Medicine",
      count: totalStuff.med_count,
      fill: "#6f2597",
    },
    {
      name: "Sanitation",
      count: totalStuff.sanit_count,
      fill: "#511b75",
    },
    {
      name: "Room Scheduling",
      count: totalStuff.room_sched,
      fill: "#37114e",
    },
    {
      name: "Security",
      count: totalStuff.secur_count,
      fill: "#33104A",
    },
  ];

  const pieData = [
    {
      name: "Unassigned",
      value: totalStuff.unassigned_count,
      fill: "#9ed5cd",
    },
    {
      name: "Assigned",
      value: totalStuff.assigned_count,
      fill: "#44a7cb",
    },
    {
      name: "In Progress",
      value: totalStuff.inProg_count,
      fill: "#2e62a1",
    },
    {
      name: "Closed",
      value: totalStuff.closed_count,
      fill: "#192574",
    },
  ];
  const allTasks =
    totalStuff.unassigned_count +
    totalStuff.assigned_count +
    totalStuff.inProg_count +
    totalStuff.closed_count;
  const completedTasksPercent = (
    (totalStuff.closed_count / allTasks) *
    100
  ).toFixed(0);

  return (
    <div
      className="h-full
                 w-screen
                 bg-cover
                 fixed"
      style={{
        backgroundImage: `url(${Background})`,
        backgroundRepeat: "repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="mt-[10rem] flex flex-row">
        <div className="rounded-xl bg-background bg-opacity-65 flex-row max-w-3xl p-0.5 m-8 pt-2">
          <h2 className="font-header text-lr mb-1.5 text-primary font-bold ml-1.5">
            Requests by Category
          </h2>
          <ResponsiveContainer width={700} height={400}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="4 4" />
              <XAxis dataKey="name" className="font-header text-[15px]" />
              <YAxis
                tickCount={8}
                domain={[0, "dataMax + 11"]}
                tickFormatter={(value) => `${value}`}
                className="font-header text-sm text-primary"
              />
              <Tooltip
                cursor={{ fill: "transparent" }}
                content={
                  <CustomTooltipBar active={false} payload={[]} label={""} />
                }
              />
              <Bar dataKey="count" radius={[10, 10, 0, 0]} barSize={35}>
                {barData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.fill}
                    style={{ cursor: "default" }}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="rounded-xl bg-background bg-opacity-65 flex-row max-w-2xl p-4 mt-8 mb-8">
          <h2 className="font-header text-lr mb-1.5 text-primary font-bold ml-1.5">
            Statuses
          </h2>
          <ResponsiveContainer width={650} height={400}>
            <PieChart>
              <Tooltip
                content={
                  <CustomTooltipPie active={false} payload={[]} label={""} />
                }
              />
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={90}
                outerRadius={120}
                paddingAngle={5}
                dataKey="value"
                cornerRadius={15}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
                <Label
                  className="label-top font-header font-bold"
                  style={{ fontSize: "42px", fill: "#002866" }}
                  value={`${completedTasksPercent}%`}
                  position="center"
                ></Label>
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default BarChartPieChart;
