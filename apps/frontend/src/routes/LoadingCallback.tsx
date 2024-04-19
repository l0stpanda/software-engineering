import React from "react";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import SpinningLoader from "../components/spinningLoader.tsx";
import axios from "axios";
import HeroPage from "./heroPage.tsx";
import MapPage from "./mapPage.tsx";

export default function LoadingPage(props: {
  component: React.ComponentType;
  adminOnly: boolean;
}) {
  const Component = withAuthenticationRequired(props.component, {
    onRedirecting: () => (
      // Loading Screen
      <SpinningLoader />
    ),
  });
  if (props.adminOnly) {
    try {
      axios
        .get("/api/adminAccess", {})
        .then()
        .catch(() => {
          console.log("Unauthorized access");
          return <HeroPage />;
        });
    } catch {
      return <MapPage />;
    }
  } else {
    return <Component />;
  }
}
