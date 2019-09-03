import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import * as serviceWorker from './serviceWorker'
import App from "./components/App/App";
import "./index.css";
import { WoodListProvider } from "./contexts/WoodListContext";

ReactDOM.render(
  <BrowserRouter>
    <WoodListProvider>
      <App />
    </WoodListProvider>
    
  </BrowserRouter>,
  document.getElementById("root")
);

serviceWorker.unregister()