import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { CartProvider } from "./context/CartContext";
import { SnackbarProvider } from "./context/SnackbarContext";
import { FlyerProvider } from "./context/FlyerContext"; // <-- importá acá

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SnackbarProvider>
      <FlyerProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </FlyerProvider>
    </SnackbarProvider>
  </React.StrictMode>
);
