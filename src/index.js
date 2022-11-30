import React from "react";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Auth0Provider } from "@auth0/auth0-react";
import { createRoot } from "react-dom/client";

const container = document.getElementById("root");
const root = createRoot(container); // createRoot(container!) if you use TypeScript

root.render(
  <Auth0Provider
    domain="testingallelica.us.auth0.com"
    clientId="rnwBOVGRwl6GssBIBR8FAyGWZrIa0ad5"
    redirectUri={window.location.origin}
    audience="https://api.test.allelica.com"
    scope="read:test1 read:current_user"
  >
    <App />
  </Auth0Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
