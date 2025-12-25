// FakeStore API Product interface
export interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string; // We'll map 'image' from FakeStore to 'thumbnail'
  description: string;
  category: string; // FakeStore includes category
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
export const fetchProductsAPI = async (): Promise<Product[]> => {
  const response = await fetch('https://fakestoreapi.com/products');

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const fakeStoreProducts: FakeStoreProduct[] = await response.json();
  
  // Map FakeStore API response to our Product interface
  return fakeStoreProducts.map(product => ({
    id: product.id,
    title: product.title,
    price: product.price,
    thumbnail: product.image, // Map image to thumbnail
    description: product.description,
    category: product.category,
  }));
};

// Fetch single product from FakeStore API
export const fetchProductAPI = async (id: string): Promise<Product> => {
  const response = await fetch(`https://fakestoreapi.com/products/${id}`);

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const fakeStoreProduct: FakeStoreProduct = await response.json();
  
  // Map FakeStore API response to our Product interface
  return {
    id: fakeStoreProduct.id,
    title: fakeStoreProduct.title,
    price: fakeStoreProduct.price,
    thumbnail: fakeStoreProduct.image, // Map image to thumbnail
    description: fakeStoreProduct.description,
    category: fakeStoreProduct.category,
  };
};
