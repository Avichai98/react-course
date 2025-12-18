import { useCartSidebar } from '../hooks/useCartSidebar';

export default function CartSidebar() {
  const { isCartOpen, closeCart } = useCartSidebar();

  return (
    <>
      {/* Overlay */}
      {isCartOpen && <div className="overlay" onClick={closeCart}></div>}

      {/* Sidebar */}
      <aside className={`cart-sidebar ${isCartOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>Your Cart</h2>
          <button onClick={closeCart} className="close-btn" aria-label="Close cart">
            &times;
          </button>
        </div>
        <div className="sidebar-content">
          <p>Your cart is empty.</p>
          {/* Cart items will go here */}
        </div>
      </aside>
    </>
  );
}