import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import HomePage from "./routes/homePage.tsx";
import RegisterPage from "./routes/registerPage.tsx";
import MapPage from "./routes/mapPage.tsx";
import FlowerRequest from "./routes/flowerRequest.tsx";
import PendingFlowerRequests from "./routes/pendingFlowerRequest.tsx";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      errorElement: <h2>Something went wrong!</h2>,
      element: <Root />,
      children: [
        {
          path: "homepage",
          element: <HomePage />,
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
      ],
    },
  ]);

  return <RouterProvider router={router} />;
  function Root() {
    return (
      <div className="w-full flex flex-col px-20 gap-5">
        <Outlet />
      </div>
    );
  }
}

export default App;
