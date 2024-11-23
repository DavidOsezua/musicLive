import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import {LocationPopUpContextProvider} from "@/contexts/locationPopContext.jsx"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LocationPopUpContextProvider>
        <App />
    </LocationPopUpContextProvider>
  </React.StrictMode>
);
