import React from "react";
import axios from "axios";

export interface edgeType {
  type: string;
  start_node: string;
  end_node: string;
}

export interface nodeType {
  type: string;
  node_id: string;
  node_type: string;
  floor: string;
  x_c: string;
  y_c: string;
  building: string;
  short_name: string;
  long_name: string;
}

const Download = () => {
  const handleDownload = async (apiPath: string, fileName: string) => {
    try {
      const response = await axios.get(apiPath);
      const dataList = response.data;

      // CSV header
      const headers = Object.keys(dataList[0]);
      const csvHeader = headers.join(",") + "\r\n";

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

      const csvContent = csvHeader + csvRows;
      // Create a Blob for the CSV content
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
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
    <>
      <button onClick={() => handleDownload("/api/readN", "Nodes.csv")}>
        Download Node CSV
      </button>
      <button onClick={() => handleDownload("/api/readE", "Edges.csv")}>
        Download Edge CSV
      </button>
    </>
  );
};

export default Download;
