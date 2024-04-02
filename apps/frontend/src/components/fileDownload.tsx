import React from "react";
import axios from "axios";

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
    <>
      <button
        style={{
          backgroundColor: "gray",
          borderStyle: "solid",
          borderWidth: "4px",
        }}
        onClick={() => handleDownload("/api/readN", "Nodes.csv")}
      >
        Download Node CSV
      </button>
      <br />
      <button
        style={{
          backgroundColor: "white",
          borderStyle: "solid",
          borderWidth: "4px",
          marginTop: "3%",
        }}
        onClick={() => handleDownload("/api/readE", "Edges.csv")}
      >
        Download Edge CSV
      </button>
    </>
  );
};

export default Download;
