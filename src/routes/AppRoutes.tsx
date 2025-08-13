import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Cart from '../pages/Cart';
import ChecoutSuccess from '../pages/CheckoutSuccess';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout/success" element={<ChecoutSuccess />} />
      </Routes>
    </BrowserRouter>
  );
}
