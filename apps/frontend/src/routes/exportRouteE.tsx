import React from "react";
import SingleDownloader from "../components/fileDownload.tsx";
import SingleFileUploader from "../components/fileUploader.tsx";
import BackgroundPattern from "../components/backgroundPattern.tsx";

export default function ExportRouteE() {
  return (
    <div className="flex flex-grow">
      <BackgroundPattern />
      <div className="flex flex-col gap-6 mx-auto self-center">
        <SingleDownloader></SingleDownloader>
        <SingleFileUploader></SingleFileUploader>
      </div>
    </div>
  );
}
