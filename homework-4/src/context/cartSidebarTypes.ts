import { createContext } from 'react';

// Define the shape of the context data
export interface CartSidebarContextType {
  isCartOpen: boolean;
  toggleCart: () => void;
  closeCart: () => void; // Keep closeCart for explicit closing (overlay, X button)
}

// Create the context with an undefined initial value
export const CartSidebarContext = createContext<CartSidebarContextType | undefined>(undefined);