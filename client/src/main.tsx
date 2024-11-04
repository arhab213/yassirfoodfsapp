import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import ContextProvider from "./Context/context.tsx";
import { StrictMode } from "react";

createRoot(document.getElementById("root")!).render(
  <ContextProvider>
    <BrowserRouter>
      <StrictMode>
        <App />
      </StrictMode>
    </BrowserRouter>
  </ContextProvider>
);
