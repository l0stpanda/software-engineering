import React from "react";
import SingleFileUploader from "../components/fileUploader.tsx";
import SingleDownloader from "../components/fileDownload.tsx"; // Import the downloader component

export default function importRouteE() {
  return (
    <div className="space-y-4">
      {" "}
      {/* Add some spacing between components */}
      <h2 className="text-center text-2xl font-semibold">
        Import and Export Files
      </h2>
      <div>
        <h3 className="text-lg font-semibold">Import</h3>
        <SingleFileUploader />
        <SingleDownloader />
      </div>
      <div>
        <h3 className="text-lg font-semibold">Export</h3>
      </div>
    </div>
  );
}
