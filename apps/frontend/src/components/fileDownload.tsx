import React from "react";
import axios from "axios";
import BackgroundPattern from "./backgroundPattern.tsx";
import { Button } from "@mui/material";

const Download = () => {
  const handleDownload = async (apiPath: string, fileName: string) => {
    try {
      const response = await axios.get(apiPath);
      const dataList = response.data;

      // CSV header
      const headers = Object.keys(dataList[0]);
      //const csvHeader = headers.join(",") + "\r\n";

      // CSV rows
      const csvRows = dataList
        .map((row: { [x: string]: string }) => {
          return headers
            .map((fieldName) => {
              let field = row[fieldName] ?? ""; // Use an empty string if the field is undefined
              // Remove carriage return characters and escape double quotes
              field = field.toString().replace(/\r/gm, "").replace(/"/g, '""');
              // If the field contains a comma, wrap it in double quotes
              return field.includes(",") ? `"${field}"` : field;
            })
            .join(",");
        })
        .join("\r\n");

      // Create a Blob for the CSV content
      const blob = new Blob([csvRows], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);

      // Create a temporary link to trigger the download
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url); // Clean up the URL object
    } catch (error) {
      console.error("Couldn't download the file!", error);
    }
  };

  return (
    <div className="justify-center grid h-screen place-items-center">
      <BackgroundPattern />
      {/*Box*/}
      <div className="m-auto flex flex-col bg-background rounded-xl px-6 h-fit w-[700px] justify-center py-5 gap-4">
        <h1 className="font-header text-primary font-bold text-3xl text-center">
          Download Files
        </h1>
        <h1 className=" font-body text-primary text-2xl text-center pb-4">
          Download node or edge file
        </h1>
        {/*Download Node CSV button*/}
        <Button
          variant="contained"
          color="primary"
          component="span"
          sx={{ borderRadius: "30px" }}
          className="w-32 self-center text-center"
          onClick={() => handleDownload("/api/read/nodes", "Nodes.csv")}
        >
          Download Node CSV
        </Button>
        {/*Download Edge CSV button*/}
        <Button
          variant="contained"
          color="primary"
          component="span"
          sx={{ borderRadius: "30px" }}
          className="w-32 self-center text-center"
          onClick={() => handleDownload("/api/read/edges", "Edges.csv")}
        >
          Download Edge CSV
        </Button>
        {/*View Table button*/}
        <Button
          type="button"
          className="w-32 self-center"
          sx={{ borderRadius: "30px" }}
          variant="contained"
          component="a"
          href="displayTables"
        >
          View Tables
        </Button>
      </div>
    </div>
  );
};

export default Download;
