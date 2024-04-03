import React from "react";
import SingleFileUploader from "../components/readAndDisCSV.tsx";

export default function ReadRoute() {
  return (
    <div className="imp">
      <h1>Display file</h1>
      <SingleFileUploader></SingleFileUploader>
    </div>
  );
}
