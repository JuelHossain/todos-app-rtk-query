import axios from "axios";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
axios.defaults.baseURL = "https://redux-fake-server.glitch.me/";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
