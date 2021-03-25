import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import * as serviceWorker from "./serviceWorkerRegistration";

ReactDOM.render(<App />, document.getElementById("root"));

serviceWorker.register({
  onUpdate: (registration) => {
    registration?.postMessage({ type: "SKIP_WAITING" });
    window.location.reload();
  },
});
