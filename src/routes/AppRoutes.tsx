import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Cart from '../pages/Cart';
import ChecoutSuccess from '../pages/CheckoutSuccess';
import { Navigate } from "react-router-dom";

export default function AppRoutes() {
  const parts = window.location.pathname.split("/").filter(Boolean);

  let base = parts.length > 0 ? `/${parts[0]}` : "";
  if (import.meta.env.DEV) base = "";

  return (
    <BrowserRouter basename={base}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout/success" element={<ChecoutSuccess />} />
        {/* Si viene "/index.html", lo mando al home */}
        <Route path="/index.html" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
