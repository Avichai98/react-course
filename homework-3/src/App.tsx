import CartSidebarProvider from './context/CartSidebarContext';
import Header from './components/Header';
import CartSidebar from './components/Cart';
import ToastHost from './components/ToastHost';
import './App.css';
import { useNotificationStore } from './stores/notifications';

function App() {
  // A more professional way to access store actions is by using a selector.
  const addNotification = useNotificationStore((state) => state.addNotification);

  // Define handler functions to keep JSX clean.
  const handleShowSuccess = () => {
    addNotification({
      type: 'success',
      message: 'Item added to cart successfully!',
    });
  };

  const handleShowError = () => {
    addNotification({
      type: 'error',
      message: 'Failed to load product data.',
    });
  };

  return (
    <CartSidebarProvider>
      <div className="app">
        <Header />
        <main className="app-main">
          <h2>Page Content</h2>
          <div className="temp-controls">
            <button
              className="temp-button success"
              onClick={handleShowSuccess}
            >
              Show Success Toast
            </button>
            <button
              className="temp-button error"
              onClick={handleShowError}
            >
              Show Error Toast
            </button>
          </div>
        </main>
        <CartSidebar />
        <ToastHost />
      </div>
    </CartSidebarProvider>
  );
}

export default App;