import React from "react";
import { ExampleComponent } from "../components/ExampleComponent.tsx";
//import SingleFileUploader from "../components/fileUploader.tsx";
//<SingleFileUploader />
export default function ExampleRoute() {
  return (
    <div className="w-100">
      <h1>This is an example page.</h1>
      <ExampleComponent></ExampleComponent>
    </div>
  );
}
