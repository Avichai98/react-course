import { createContext } from 'react';

// Define the shape of the context data
export interface CartSidebarContextType {
  isCartOpen: boolean;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
}

// Create the context with an undefined initial value
export const CartSidebarContext = createContext<CartSidebarContextType | undefined>(undefined);