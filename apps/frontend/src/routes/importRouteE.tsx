import React from "react";
import SingleFileUploader from "../components/fileUploader.tsx";

export default function ImportRouteE() {
  return (
    <div className="imp">
      <h1>Enter your file</h1>
      <SingleFileUploader></SingleFileUploader>
    </div>
  );
}
