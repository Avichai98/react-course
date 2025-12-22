import { useMemo, type ReactNode, useCallback } from 'react'; // Import useCallback
import { CartSidebarContext, type CartSidebarContextType } from './cartSidebarTypes'; // Import from the new file
import { useLocalStorage } from '../hooks/useLocalStorage';

// Create the provider component
export default function CartSidebarProvider({ children }: { children: ReactNode }) {
  const [isCartOpen, setIsCartOpen] = useLocalStorage<boolean>('cart-sidebar-open', false);

  // Memoize the functions to ensure stable references across renders.
  // setIsCartOpen is a stable function from useLocalStorage, so these callbacks will also be stable.
  const openCart = useCallback(() => setIsCartOpen(true), [setIsCartOpen]);
  const closeCart = useCallback(() => setIsCartOpen(false), [setIsCartOpen]);
  const toggleCart = useCallback(() => setIsCartOpen(prev => !prev), [setIsCartOpen]);

  // useMemo ensures the context value object is stable to prevent unnecessary re-renders
  const value = useMemo(
    () => ({ isCartOpen, openCart, closeCart, toggleCart } as CartSidebarContextType), // Assert type for clarity
    // Include all dependencies: isCartOpen (which changes) and the stable function references
    [isCartOpen, openCart, closeCart, toggleCart]
  );

  return (
    <CartSidebarContext.Provider value={value}>{children}</CartSidebarContext.Provider>
  );
}