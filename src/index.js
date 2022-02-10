import React from "react";
import ReactDOM from "react-dom";
import { ApplicationViews } from "./ApplicationViews";
import "./index.css";
import { LogIn } from "./LogIn/LogIn";
import { Register } from "./LogIn/Register";
import { BrowserRouter } from "react-router-dom";

import reportWebVitals from "./reportWebVitals";
import { BarList } from "./barList/BarList";
//mvp
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ApplicationViews />
      
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);


reportWebVitals();
