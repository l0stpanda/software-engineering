import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import HeroPage from "./routes/heroPage.tsx";
import RegisterPage from "./routes/registerPage.tsx";
import MapPage from "./routes/mapPage.tsx";
import FlowerRequest from "./routes/flowerRequest.tsx";
import PendingFlowerRequests from "./routes/displayFlowerRequests.tsx";

//import ExampleRoute from "./routes/ExampleRoute.tsx";
// import ImportRouteE from "./routes/importRouteE.tsx";
//import ReadRoute from "./routes/readRoute.tsx";
//import Download from "./routes/DownloadCSV.tsx";
import ImportRouteE from "./routes/importRouteE.tsx";
import CustomNavBar from "./components/navBar.tsx";
import ExportRouteE from "./routes/exportRouteE.tsx";
import ReadRouteE from "./routes/readRouteE.tsx";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      errorElement: <h2>Something went wrong!</h2>,
      element: <Root />,
      children: [
        {
          path: "",
          element: <HeroPage />,
        },
        {
          path: "register",
          element: <RegisterPage />,
        },
        {
          path: "map",
          element: <MapPage />,
        },
        {
          path: "flowerrequest",
          element: <FlowerRequest />,
        },
        {
          path: "viewpending",
          element: <PendingFlowerRequests />,
        },
        {
          path: "imp",
          element: <ImportRouteE />,
        },
        {
          path: "exp",
          element: <ExportRouteE />,
        },
        {
          path: "displayTables",
          element: <ReadRouteE />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;

  function Root() {
    return (
      <div className="w-full flex flex-col">
        <CustomNavBar />
        <Outlet />
      </div>
    );
  }
}

export default App;
