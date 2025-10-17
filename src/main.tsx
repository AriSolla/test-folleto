import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { CartProvider } from "./context/CartContext";
import { SnackbarProvider } from "./context/SnackbarContext";
import { FlyerProvider } from "./context/FlyerContext";

import {
  CssBaseline,
} from "@mui/material";


function Root() {


  return (
    <React.StrictMode>
      <SnackbarProvider>
        <FlyerProvider>
          <CartProvider>
              <CssBaseline />
              <App />
          </CartProvider>
        </FlyerProvider>
      </SnackbarProvider>
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(<Root />);
