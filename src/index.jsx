import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { formData } from "./data/formData";
import "./assets/css/index.css";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App formData={formData} />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
