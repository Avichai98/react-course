import { useCartSidebar } from '../../hooks/useCartSidebar';
import { useCartStore } from '../../stores/cart';

export const CartSidebar = () => {
  const { isCartOpen, closeCart } = useCartSidebar();
  const { items, removeFromCart } = useCartStore();

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

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
          {items.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <>
              <ul className="cart-items-list">
                {items.map((item) => (
                  <li key={item.id} className="cart-item">
                    <img src={item.thumbnail} alt={item.title} />
                    <div className="cart-item-details">
                      <span>{item.title}</span>
                      <span>Qty: {item.quantity}</span>
                    </div>
                    <span className="cart-item-price">${(item.price * item.quantity).toFixed(2)}</span>
                    <button onClick={() => removeFromCart(item.id)} className="remove-item-btn" aria-label={`Remove ${item.title} from cart`}>
                      &times;
                    </button>
                  </li>
                ))}
              </ul>
              <div className="cart-total">
                <strong>Total: ${total.toFixed(2)}</strong>
              </div>
            </>
          )}
        </div>
      </aside>
    </>
  );
}
