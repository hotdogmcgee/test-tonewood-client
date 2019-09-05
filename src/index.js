import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import App from "./components/App/App";
import "./index.css";
import { WoodListProvider } from "./contexts/WoodListContext";
import { WoodProvider } from "./contexts/WoodContext";
import { SubmissionProvider } from "./contexts/SubmissionContext";

ReactDOM.render(
  <BrowserRouter>
    <WoodListProvider>
      <WoodProvider>
        <SubmissionProvider>
          <App />
        </SubmissionProvider>
      </WoodProvider>
    </WoodListProvider>
  </BrowserRouter>,
  document.getElementById("root")
);

serviceWorker.unregister();
