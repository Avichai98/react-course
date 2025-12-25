import { createContext } from 'react';

// Define the shape of the context data
export interface CartSidebarContextType {
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}

// Create the context with an undefined initial value
// This object is now exported from its own file.
export const CartSidebarContext = createContext<CartSidebarContextType | undefined>(undefined);