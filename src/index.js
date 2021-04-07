import "@styles/common.scss";

import * as React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from '@store';
import { App } from "./App";


const app = () => (
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

ReactDOM.render(app(), document.getElementById("root"));