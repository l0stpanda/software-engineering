import React from "react";
// import SingleFileUploader from "../components/fileUploader.tsx";
// import SingleDownloader from "../components/fileDownload.tsx"; // Import the downloader component
import DownloadAndUploader from "../components/fileDownloadAndUploader.tsx";

export default function importRouteE() {
  return (
    <div className="space-y-4">
      <DownloadAndUploader />
    </div>
  );
}
