import { Routes, Route, Navigate } from 'react-router-dom';
import CartSidebarProvider from './context/CartSidebarContext';
import { Header, CartSidebar, ToastHost, GlobalLoadingIndicator, ProductList } from './components';
import ProductDetail from './components/ProductDetail';
import './App.css';

function App() {
  return (
    <CartSidebarProvider>
      <div className="app">
        <GlobalLoadingIndicator />
        <Header />
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Navigate to="/products" replace />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/:id" element={<ProductDetail />} />
          </Routes>
        </main>
        <CartSidebar />
        <ToastHost />
      </div>
    </CartSidebarProvider>
  );
}

export default App;