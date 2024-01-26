import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import GlobalStyle from "./style/globalStyle";
import { UserProvider } from "./context/useLoginContext";
import { SessionStorageProvider } from "./context/useSessionStorage";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <UserProvider>
      <SessionStorageProvider>
        <GlobalStyle />
        <App />
      </SessionStorageProvider>
    </UserProvider>
  </React.StrictMode>
);
