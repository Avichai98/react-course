import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product } from '../api/products';

export interface CartItem extends Product {
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      addToCart: (product) =>
        set((state) => {
          const existingItem = state.items.find((item) => item.id === product.id);
          if (existingItem) {
            // If item already exists, just increase its quantity
            const updatedItems = state.items.map((item) =>
              item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            );
            return { items: updatedItems };
          } else {
            // Otherwise, add the new product to the cart with quantity 1
            return { items: [...state.items, { ...product, quantity: 1 }] };
          }
        }),
      removeFromCart: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
        })),
    }),
    { name: 'cart-storage' } // Unique name for the localStorage item
  )
);