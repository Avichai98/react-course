import { Routes, Route, Navigate } from 'react-router-dom';
import CartSidebarProvider from './context/CartSidebarContext';
import { Header, CartSidebar, ProductList } from './components';
import { ToastHost, GlobalLoadingIndicator } from '@homework-7/ui';
import { useNotificationStore } from '@homework-7/hooks';
import ProductDetail from './components/ProductDetail';
import './App.css';

function App() {
  const { notifications, removeNotification } = useNotificationStore();
  
  // Convert notifications to the format expected by ToastHost
  const toasts = notifications.map(notification => ({
    id: notification.id.toString(),
    message: notification.message,
    type: notification.type,
  }));

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
        <ToastHost toasts={toasts} onRemoveToast={(id) => removeNotification(parseInt(id))} />
      </div>
    </CartSidebarProvider>
  );
}

export default App;