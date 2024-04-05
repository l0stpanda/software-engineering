import React from "react";
import SingleFileUploader from "../components/readAndDisCSV.tsx";

export default function ImportRouteE() {
  return (
    <div className="bg-background">
      <h1>Display file</h1>
      <SingleFileUploader></SingleFileUploader>
    </div>
  );
}
