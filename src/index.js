import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import App from "./components/App/App";
import "./index.css";
import { WoodListProvider } from "./contexts/WoodListContext";
import { WoodProvider } from "./contexts/WoodContext";
import { SubmissionProvider } from "./contexts/SubmissionContext";
import 'bootstrap/dist/css/bootstrap.min.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
// import '../node_modules/react-vis/dist/style.css';
import $ from 'jquery'
import Popper from 'popper.js';

library.add(
  fas
)
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
