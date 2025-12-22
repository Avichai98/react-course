export interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  description: string;
}

export const fetchProductsAPI = async (): Promise<Product[]> => {
  const response = await fetch('https://dummyjson.com/products?limit=12');

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const data = await response.json();
  return data.products;
};
