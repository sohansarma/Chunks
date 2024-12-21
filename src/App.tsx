import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import AppRoutes from "./routes";
import { TooltipProvider } from "./ui/tooltip";
import { Toaster } from "./ui/sonner";

const AUTH0_DOMAIN = import.meta.env.VITE_AUTH0_DOMAIN;
const AUTH0_CLIENT_ID = import.meta.env.VITE_AUTH0_CLIENT_ID;
const AUTH0_AUDIENCE = import.meta.env.VITE_AUTH0_AUDIENCE;

const onRedirectCallback = (appState?: any) => {
  window.history.replaceState(
    {},
    document.title,
    appState?.returnTo || window.location.pathname
  );
};

console.log(`${window.location.origin}/callback`);

const App = () => (
  <Auth0Provider
    domain={AUTH0_DOMAIN}
    clientId={AUTH0_CLIENT_ID}
    authorizationParams={{
      audience: AUTH0_AUDIENCE,
      redirect_uri: `${window.location.origin}/callback`,
    }}
    onRedirectCallback={onRedirectCallback}
  >
    <AppRoutes />
  </Auth0Provider>
);

export default App;
