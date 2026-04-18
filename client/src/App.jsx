import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrdersPage from './pages/OrdersPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

export default function App() {
  return (
    <>
      <Navbar />
      <main style={{ maxWidth: 1200, margin: '0 auto', padding: '20px 16px' }}>
        <Routes>
          <Route path="/"            element={<HomePage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart"        element={<CartPage />} />
          <Route path="/checkout"    element={<CheckoutPage />} />
          <Route path="/orders"      element={<OrdersPage />} />
          <Route path="/login"       element={<LoginPage />} />
          <Route path="/register"    element={<RegisterPage />} />
        </Routes>
      </main>
      <ToastContainer position="top-right" autoClose={2500} />
    </>
  );
}