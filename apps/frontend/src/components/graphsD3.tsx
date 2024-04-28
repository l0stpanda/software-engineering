// import React, { useEffect, useState } from "react";
// import { useAuth0 } from "@auth0/auth0-react";
// import axios from "axios";
// import React from "react";
// // @ts-ignore
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
// import BackgroundPattern from "../components/backgroundPattern.tsx";
// // import console from "console";
//
// function ServiceRequestsBar() {
//     const { getAccessTokenSilently } = useAuth0();
//     const [records, setRecords] = useState([]);
//
//     //I'm looking at y'all stuff I do not understand this all too well its an attempt to fetch data from the backend
//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const token = await getAccessTokenSilently();
//                 const response = await axios.get("/api/fetchAll", {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 });
//                 setRecords(response.data);
//             } catch (error) {
//                 console.error("Error fetching data", error);
//             }
//         };
//
//         fetchData();
//     }, [getAccessTokenSilently]);
//
//     //process data for the chart to read and display
//     const [chartData, setChartData] = useState([]);
//     useEffect(() => {
//         const aggregateData = records.reduce((acc, record) => {
//             acc[record.type] = acc[record.type] || 0;
//             acc[record.type] += 1;
//             return acc;
//         }, {});
//
//         const chartData = Object.keys(aggregateData).map(key => ({
//             name: key,
//             Requests: aggregateData[key]
//         }));
//
//         setChartData(chartData);
//     }, [records]);
//
//     return (
//         <div className="w-screen h-full">
//             <BackgroundPattern />
//             <div className="flex flex-row w-full h-full px-4 gap-4 py-4">
//                 {/* Requests Bar Chart yippie */}
//                 <div className="h-full w-full bg-background rounded-lg p-4">
//                     <h1 className="font-header text-primary font-extrabold text-2xl mb-4">
//                         Service Request Amounts
//                     </h1>
//                     <BarChart
//                         width={500}
//                         height={300}
//                         data={data}
//                         margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
//                         // width={600}
//                         // height={300}
//                         // data={chartData}
//                         // margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
//                     >
//                         <CartesianGrid strokeDasharray="3 3" />
//                         <XAxis dataKey="name" />
//                         <YAxis />
//                         <Tooltip />
//                         <Legend />
//                         <Bar dataKey="Requests" fill="#8884d8" />
//                     </BarChart>
//                 </div>
//             </div>
//         </div>
//     );
// }
//
// export default ServiceRequestsBar;
