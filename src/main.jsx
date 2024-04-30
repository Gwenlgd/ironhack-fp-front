import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import AuthContextWrapper from "./context/AuthContextWrapper.jsx";
import { LoadingProvider } from "./context/LoadingContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextWrapper>
        <LoadingProvider>
          <App />
        </LoadingProvider>
      </AuthContextWrapper>
    </BrowserRouter>
  </React.StrictMode>
);
