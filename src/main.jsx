import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.scss";

import { store } from "./store/store";
import { Provider } from "react-redux";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.createRoot(document.getElementById("root")).render(
/* <Provider store={store}>
        <App />
</Provider> */

<Auth0Provider
    domain="dev-im7anhj3xlpi4ddp.us.auth0.com"
    clientId="KmtxRq48U8jbX3n0iyy3TENOcNQ9IW3B"
    redirectUri={window.location.origin}
  >
    <Provider store={store}>
    <App />
    </Provider>
    </Auth0Provider>
);
