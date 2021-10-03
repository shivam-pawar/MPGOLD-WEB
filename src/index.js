import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Login from "./components/Login";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

ReactDOM.render(<Login />, document.getElementById("root"));
serviceWorkerRegistration.register();
