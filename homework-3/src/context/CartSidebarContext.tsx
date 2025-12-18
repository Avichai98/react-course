import { useState, useMemo, type ReactNode } from 'react';
import { CartSidebarContext, type CartSidebarContextType } from './cartSidebarTypes'; // Import from the new file

// Create the provider component
export default function CartSidebarProvider({ children }: { children: ReactNode }) {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen(prev => !prev);

  // useMemo ensures the context value object is stable to prevent unnecessary re-renders
  const value = useMemo(
    () => ({ isCartOpen, openCart, closeCart, toggleCart } as CartSidebarContextType), // Assert type for clarity
    [isCartOpen]
  );

  return (
    <CartSidebarContext.Provider value={value}>{children}</CartSidebarContext.Provider>
  );
}