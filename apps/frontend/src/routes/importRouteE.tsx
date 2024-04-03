import React from "react";
import SingleFileUploader from "../components/fileUploader.tsx";
import SingleDownloader from "../components/fileDownload.tsx";

export default function ImportRouteE() {
  return (
    <div className="imp">
      <SingleFileUploader></SingleFileUploader>
      <SingleDownloader></SingleDownloader>
    </div>
  );
}
