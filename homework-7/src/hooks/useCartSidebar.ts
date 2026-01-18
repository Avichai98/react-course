import { useContext } from 'react';
import { CartSidebarContext } from '../context/cartSidebarTypes';

// Create a custom hook for easy consumption of the context
export function useCartSidebar() {
  const context = useContext(CartSidebarContext);
  if (context === undefined) {
    throw new Error('useCartSidebar must be used within a CartSidebarProvider');
  }
  return context;
}