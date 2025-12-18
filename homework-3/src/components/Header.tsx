import { useCartSidebar } from '../hooks/useCartSidebar';

export default function Header() {
  const { toggleCart } = useCartSidebar();

  return (
    <header className="app-header">
      <h1>My Shop</h1>
      <nav>
        <button onClick={toggleCart} className="cart-button">
          Cart
        </button>
      </nav>
    </header>
  );
}