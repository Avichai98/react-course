import CartSidebarProvider from './context/CartSidebarContext';
import Header from './components/Header';
import CartSidebar from './components/CartSidebar';
import './App.css';

function App() {
  return (
    <CartSidebarProvider>
      <div className="app">
        <Header />
        <main className="app-main">
          <h2>Page Content</h2>
          <p>This is the main content area of your application.</p>
        </main>
        <CartSidebar />
      </div>
    </CartSidebarProvider>
  );
}

export default App;