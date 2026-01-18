import { useMemo, type ReactNode, useCallback } from 'react';
import { CartSidebarContext, type CartSidebarContextType } from './cartSidebarTypes';
import { useLocalStorage } from '../hooks/useLocalStorage';

// Create the provider component
export default function CartSidebarProvider({ children }: { children: ReactNode }) {
  const [isCartOpen, setIsCartOpen] = useLocalStorage<boolean>('cart-sidebar-open', false);

  // Keep closeCart for explicit closing (overlay, X button)
  const closeCart = useCallback(() => setIsCartOpen(false), [setIsCartOpen]);
  // Use toggleCart for the cart button
  const toggleCart = useCallback(() => setIsCartOpen(prev => !prev), [setIsCartOpen]);

  // useMemo ensures the context value object is stable to prevent unnecessary re-renders
  const value = useMemo(
    () => ({ isCartOpen, toggleCart, closeCart } as CartSidebarContextType),
    [isCartOpen, toggleCart, closeCart]
  );

  return (
    <CartSidebarContext.Provider value={value}>{children}</CartSidebarContext.Provider>
  );
}