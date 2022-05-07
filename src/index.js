import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import { MainContextProvider } from "./context/MainContext";

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH_DOMAIN}
      clientId={process.env.REACT_APP_AUTH_ID}
      redirectUri={window.location.origin}
    >
      <MainContextProvider>
        <App />
      </MainContextProvider>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
