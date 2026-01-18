import { useCartSidebar, useCartStore } from '@homework-7/hooks';
import { useTranslation } from 'react-i18next';

export const CartSidebar = () => {
  const { isCartOpen, closeCart } = useCartSidebar();
  const { items, removeFromCart } = useCartStore();
  const { t, i18n } = useTranslation('common');

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const formatPrice = (price: number) => {
    const formatter = new Intl.NumberFormat(i18n.language, {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    });
    return formatter.format(price);
  };

  return (
    <>
      {/* Overlay */}
      {isCartOpen && <div className="overlay" onClick={closeCart}></div>}

      {/* Sidebar */}
      <aside className={`cart-sidebar ${isCartOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>{t('cart_title')}</h2>
          <button onClick={closeCart} className="close-btn" aria-label={t('close_cart')}>
            &times;
          </button>
        </div>
        <div className="sidebar-content">
          {items.length === 0 ? (
            <p>{t('cart_empty')}</p>
          ) : (
            <>
              <ul className="cart-items-list">
                {items.map((item) => (
                  <li key={item.id} className="cart-item">
                    <img src={item.thumbnail} alt={item.title} />
                    <div className="cart-item-details">
                      <span>{item.title}</span>
                      <span>{t('quantity')}: {item.quantity}</span>
                    </div>
                    <span className="cart-item-price">{formatPrice(item.price * item.quantity)}</span>
                    <button onClick={() => removeFromCart(item.id)} className="remove-item-btn" aria-label={t('remove_from_cart', { productTitle: item.title })}>
                      &times;
                    </button>
                  </li>
                ))}
              </ul>
              <div className="cart-total">
                <strong>{t('total')}: {formatPrice(total)}</strong>
              </div>
            </>
          )}
        </div>
      </aside>
    </>
  );
}
