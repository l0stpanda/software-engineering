import React, { useState } from "react";
import axios from "axios";
import { edgeType } from "common/src/edgesType.ts";
const SingleFileUploader = () => {
  const [file, setFile] = useState<File | null>(null);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (file) {
      console.log("Uploading file...");

      const formData = new FormData();
      formData.append("file", file);

      if (file.name.toString().toLowerCase().includes("edge")) {
        console.log("EDGES UPLOADING");
        try {
          const edges: string = await file.text();
          const edges_array: string[][] = edges
            .split("\n")
            .map((row: string): string[] => {
              return row.split(",");
            });
          await axios.delete("/api/import", {
            headers: { "Content-Type": "application/json" },
          });
          for (let i = 1; i < edges_array.length - 1; i++) {
            const curr_data: edgeType = {
              type: "Edges",
              start_node: edges_array[i][0].toString(),
              end_node: edges_array[i][1].toString().replace("/r", ""),
            };

            const res = await axios.post("/api/import", curr_data, {
              headers: { "Content-Type": "application/json" },
            });
            if (res.status == 200) {
              console.log(curr_data.start_node);
              console.log("success");
            } else {
              console.log(res.statusText);
            }
          }
        } catch (error) {
          console.error(error);
        }
      }
    }
  };

  return (
    <>
      <input id="type" type="text" />
      <input id="file" type="file" accept=".csv" onChange={handleFileChange} />
      {file && <button onClick={handleUpload}>Upload a file</button>}
    </>
  );
};

export default SingleFileUploader;
