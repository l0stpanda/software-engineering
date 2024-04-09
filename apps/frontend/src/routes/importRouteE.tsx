import React from "react";
import SingleFileUploader from "../components/fileUploader.tsx";
import SingleDownloader from "../components/fileDownload.tsx";

export default function ImportExportRoute() {
  return (
    <div>
      <h2>Import and Export</h2>
      <div>
        <SingleFileUploader />
      </div>
      <div>
        <SingleDownloader />
      </div>
    </div>
  );
}
