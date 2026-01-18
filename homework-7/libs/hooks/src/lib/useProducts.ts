import { useQuery } from '@tanstack/react-query';

// Product interface
export interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  description: string;
  category: string;
}

// Raw FakeStore API response interface
interface FakeStoreProduct {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
  description: string;
}

// Fetch products from FakeStore API
const fetchProductsAPI = async (): Promise<Product[]> => {
  const response = await fetch('https://fakestoreapi.com/products');

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const fakeStoreProducts: FakeStoreProduct[] = await response.json();
  
  return fakeStoreProducts.map(product => ({
    id: product.id,
    title: product.title,
    price: product.price,
    thumbnail: product.image,
    description: product.description,
    category: product.category,
  }));
};

// Fetch single product from FakeStore API
const fetchProductAPI = async (id: string): Promise<Product> => {
  const response = await fetch(`https://fakestoreapi.com/products/${id}`);

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const fakeStoreProduct: FakeStoreProduct = await response.json();
  
  return {
    id: fakeStoreProduct.id,
    title: fakeStoreProduct.title,
    price: fakeStoreProduct.price,
    thumbnail: fakeStoreProduct.image,
    description: fakeStoreProduct.description,
    category: fakeStoreProduct.category,
  };
};

// Hook for fetching all products
export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: fetchProductsAPI,
  });
};

// Hook for fetching a single product
export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProductAPI(id),
    enabled: !!id,
  });
};