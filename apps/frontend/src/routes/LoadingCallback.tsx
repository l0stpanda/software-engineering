import React from "react";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import SpinningLoader from "../components/spinningLoader.tsx";

export default function LoadingPage(props: { component: React.ComponentType }) {
  const Component = withAuthenticationRequired(props.component, {
    onRedirecting: () => (
      // Loading Screen
      <SpinningLoader />
    ),
  });

  return <Component />;
}
