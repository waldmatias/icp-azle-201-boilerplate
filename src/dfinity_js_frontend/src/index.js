import React from "react";
//import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { initializeContract } from "./utils/icp";

import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";

window.renderICPromise = initializeContract()
  .then(() => {
    const container = document.getElementById('root');
    const root = createRoot(container);

    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  }).catch(console.error);

reportWebVitals();
