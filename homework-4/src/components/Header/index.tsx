import { useCartSidebar } from '../../hooks/useCartSidebar';
import ThemeToggleButton from '../../hooks/ThemeToggleButton';

export const Header = () => {
  const { toggleCart } = useCartSidebar();

  return (
    <header className="app-header">
      <h1>My Shop</h1>
      <nav className="header-nav">
        <ThemeToggleButton />
        <button onClick={toggleCart} className="cart-button">
          Cart
        </button>
      </nav>
    </header>
  );
}