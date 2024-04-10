import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  useNavigate,
} from "react-router-dom";
import HeroPage from "./routes/heroPage.tsx";
import MapPage from "./routes/mapPage.tsx";
import FlowerRequest from "./routes/flowerRequest.tsx";
import PendingFlowerRequests from "./routes/displayFlowerRequests.tsx";
//import ImportRouteE from "./routes/importRouteE.tsx";
import CustomNavBar from "./components/navBar.tsx";
import ExportRouteE from "./routes/exportRouteE.tsx";
import ReadRouteE from "./routes/readRouteE.tsx";
import LostItemRequest from "./routes/lostItemRequest.tsx";
import RoomSchedulingRequest from "./routes/roomSchedulingRequest.tsx";
import MedicineDeliveryRequest from "./routes/MedicineDeliveryRequest.tsx";
import MedicalDeviceRequest from "./routes/medicalDeviceRequest.tsx";
import EditMap from "./routes/editMapPage.tsx";
import { Auth0Provider } from "@auth0/auth0-react";
import LoadingPage from "./routes/LoadingCallback.tsx";
import SpinningLoader from "./components/spinningLoader.tsx";

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
          path: "map",
          element: <MapPage />,
        },
        {
          path: "flowerrequest",
          element: <LoadingPage component={FlowerRequest} />,
        },
        {
          path: "viewpending",
          element: <LoadingPage component={PendingFlowerRequests} />,
        },
        // {
        //   path: "imp",
        //   element: <LoadingPage component={ImportRouteE} />,
        // },
        {
          path: "exp",
          element: <LoadingPage component={ExportRouteE} />,
        },
        {
          path: "displayTables",
          element: <LoadingPage component={ReadRouteE} />,
        },
        {
          path: "lostItemRequest",
          element: <LoadingPage component={LostItemRequest} />,
        },
        {
          path: "roomRequest",
          element: <LoadingPage component={RoomSchedulingRequest} />,
        },
        {
          path: "medicineRequest",
          element: <LoadingPage component={MedicineDeliveryRequest} />,
        },
        {
          path: "medicalDeviceRequest",
          element: <LoadingPage component={MedicalDeviceRequest} />,
        },
        {
          path: "callback",
          element: <LoadingPage component={SpinningLoader} />,
        },
        {
          path: "editMap",
          element: <LoadingPage component={EditMap} />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;

  function Root() {
    const navigate = useNavigate();

    return (
      <Auth0Provider
        useRefreshTokens
        cacheLocation="localstorage"
        domain="dev-xiwtn1gzwzvxk2ab.us.auth0.com"
        clientId="hpsZAjzYnHxL5mb7stld400psWkr1WJq"
        onRedirectCallback={(appState) => {
          navigate(appState?.returnTo || window.location.pathname);
        }}
        authorizationParams={{
          redirect_uri: window.location.origin + "/callback",
          audience: "/api",
          scope: "openid profile email offline_access",
        }}
      >
        <div className="w-full flex flex-col">
          <CustomNavBar />
          <Outlet />
        </div>
      </Auth0Provider>
    );
  }
}

export default App;
