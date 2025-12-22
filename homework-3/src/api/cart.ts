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

// This function connects to a real public API from dummyjson.com
export const addToCartAPI = async (productId: number): Promise<AddToCartResponse> => {
  const response = await fetch('https://dummyjson.com/carts/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId: 1, // We'll use a static user ID for this example
      products: [
        {
          id: productId,
          quantity: 1,
        },
      ],
    }),
  });

  if (!response.ok) {
    // If the server responds with an error status (4xx or 5xx),
    // we throw an error to be caught by TanStack Query's `onError`.
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to add item to cart via API.');
  }

  // If the request was successful, we return the JSON response.
  // TanStack Query will see this as a success.
  return response.json();
};