import React from "react";
import SingleFileUploader from "../components/readAndDisCSV.tsx";

//Used to import edges/nodes from a local device
export default function ImportRouteE() {
  return (
    <div className="imp bg-background">
      <SingleFileUploader></SingleFileUploader>
    </div>
  );
}
