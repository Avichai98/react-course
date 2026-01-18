import { useMutation } from '@tanstack/react-query';

interface DummyCartProduct {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
  discountPercentage: number;
  discountedPrice: number;
}

export interface AddToCartResponse {
  id: number;
  products: DummyCartProduct[];
  total: number;
  discountedTotal: number;
  userId: number;
  totalProducts: number;
  totalQuantity: number;
}

// API function for adding to cart
const addToCartAPI = async (productId: number): Promise<AddToCartResponse> => {
  const response = await fetch('https://dummyjson.com/carts/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId: 1,
      products: [
        {
          id: productId,
          quantity: 1,
        },
      ],
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to add item to cart via API.');
  }

  return response.json();
};

// Hook for adding to cart mutation
export const useAddToCart = () => {
  return useMutation({
    mutationFn: addToCartAPI,
  });
};