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
import LangInterpreterReq from "./routes/langInterpreterRequest.tsx";
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
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import TodoList from "./routes/todoList.tsx";
import SanitationRequest from "./routes/sanitationRequest.tsx";
import DisplayInventory from "./routes/disInventoryList.tsx";
import PendingSanitationRequest from "./routes/displaySanitationReqs.tsx";
import AboutPage from "./routes/aboutPage.tsx";
import ServiceRequests from "./routes/serviceRequests.tsx";
import CreditPage from "./routes/creditPage.tsx";
import BarChartReqs from "./components/graphsRecharts.tsx";
import BarChartPieChart from "./components/graphsRecharts.tsx";

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
          element: <LoadingPage component={FlowerRequest} adminOnly={false} />,
        },
        {
          path: "viewpending",
          element: (
            <LoadingPage component={PendingFlowerRequests} adminOnly={false} />
          ),
        },
        // {
        //   path: "imp",
        //   element: <LoadingPage component={ImportRouteE} />,
        // },
        {
          path: "exp",
          element: <LoadingPage component={ExportRouteE} adminOnly={true} />,
        },
        {
          path: "displayTables",
          element: <LoadingPage component={ReadRouteE} adminOnly={false} />,
        },
        {
          path: "lostItemRequest",
          element: (
            <LoadingPage component={LostItemRequest} adminOnly={false} />
          ),
        },
        {
          path: "roomRequest",
          element: (
            <LoadingPage component={RoomSchedulingRequest} adminOnly={false} />
          ),
        },
        {
          path: "medicineRequest",
          element: (
            <LoadingPage
              component={MedicineDeliveryRequest}
              adminOnly={false}
            />
          ),
        },
        {
          path: "medicalDeviceRequest",
          element: (
            <LoadingPage component={MedicalDeviceRequest} adminOnly={false} />
          ),
        },
        {
          path: "callback",
          element: <SpinningLoader />,
        },
        {
          path: "editMap",
          element: <LoadingPage component={EditMap} adminOnly={true} />,
        },
        {
          path: "todo",
          element: <LoadingPage component={TodoList} adminOnly={false} />,
        },
        {
          path: "sanitationRequest",
          element: (
            <LoadingPage component={SanitationRequest} adminOnly={false} />
          ),
        },
        {
          path: "PendingSanitationRequest",
          element: (
            <LoadingPage
              component={PendingSanitationRequest}
              adminOnly={false}
            />
          ),
        },
        {
          path: "inventory",
          element: (
            <LoadingPage component={DisplayInventory} adminOnly={false} />
          ),
        },
        {
          path: "aboutPage",
          element: <LoadingPage component={AboutPage} adminOnly={false} />,
        },
        {
          path: "requests",
          element: (
            <LoadingPage component={ServiceRequests} adminOnly={false} />
          ),
        },
          {
              path: "graphs",
              element: <LoadingPage component={BarChartReqs} adminOnly={false} />,
          },
        {
          path: "credit",
          element: <LoadingPage component={CreditPage} adminOnly={false} />,
        },
        {
          path: "lang",
          element: (
            <LoadingPage component={LangInterpreterReq} adminOnly={false} />
          ),
        },
          {
              path: "graphs",
                element: (
                    <LoadingPage component={BarChartPieChart} adminOnly={true} />
                ),
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
        <DndProvider backend={HTML5Backend}>
          <div className="w-full flex flex-col">
            <CustomNavBar />
            <Outlet />
          </div>
        </DndProvider>
      </Auth0Provider>
    );
  }
}

export default App;
