import "@styles/common.scss";

import * as React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";


const app = () => (
  <React.StrictMode>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </React.StrictMode>
);

ReactDOM.render(app(), document.getElementById("root"));