import React from "react";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import SpinningLoader from "../components/spinningLoader.tsx";
// import axios from "axios";
// import HeroPage from "./heroPage.tsx";
// import MapPage from "./mapPage.tsx";

export default function LoadingPage(props: {
  component: React.ComponentType;
  adminOnly: boolean;
}) {
  // async function getAdminPage() {
  //     let comp: JSX.Element = <SpinningLoader/>;
  //     axios
  //         .get("/api/adminAccess", {})
  //         .then((response) => {
  //             console.log(response.status);
  //             comp = <MapPage/>;
  //         })
  //         .catch(() => {
  //             // console.log("Unauthorized access");
  //             comp =  <HeroPage />;
  //         });
  //     return comp;
  // }

  const Component = withAuthenticationRequired(props.component, {
    onRedirecting: () => (
      // Loading Screen
      <SpinningLoader />
    ),
  });
  return <Component />;
}
