import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
// import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import store from "./redux/sotre";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
