import { useContext } from 'react';

// For cart sidebar specifically, we'll use a more specific interface
export interface CartSidebarContextType {
  isCartOpen: boolean;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
}

// Store the context reference
let CartSidebarContext: React.Context<CartSidebarContextType | undefined> | null = null;

export function createCartSidebarHook(context: React.Context<CartSidebarContextType | undefined>) {
  CartSidebarContext = context;
}

export function useCartSidebar(): CartSidebarContextType {
  if (!CartSidebarContext) {
    throw new Error('Cart sidebar hook not initialized. Call createCartSidebarHook first.');
  }
  
  const contextValue = useContext(CartSidebarContext);
  if (contextValue === undefined) {
    throw new Error('useCartSidebar must be used within a CartSidebarProvider');
  }
  return contextValue;
}