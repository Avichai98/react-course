import {
  useMutation,
  useQuery,
} from '@tanstack/react-query';
import CartSidebarProvider from './context/CartSidebarContext';
import { Header, CartSidebar, ToastHost, GlobalLoadingIndicator } from './components';
import './App.css';
import { useNotificationStore } from './stores/notifications';
import { addToCartAPI } from './api/cart';
import { fetchProductsAPI, type Product } from './api/products';
import { useCartStore } from './stores/cart';
import { useThemeEffect } from './hooks/useThemeEffect';

function App() {
  useThemeEffect(); // Apply theme class to the root element
  const addNotification = useNotificationStore((state) => state.addNotification);
  const addProductToCart = useCartStore((state) => state.addToCart);

  const { data: products, isLoading, isError: isProductsError } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProductsAPI,
  });

  const addToCartMutation = useMutation({
    mutationFn: (product: Product) => addToCartAPI(product.id),
    onSuccess: (_data, product) => {
      addNotification({
        type: 'success',
        message: `${product.title} was added to your cart!`,
      });
      addProductToCart(product);
    },
    onError: (error) => {
      addNotification({
        type: 'error',
        message: error.message || 'An unknown error occurred.',
      });
    },
  });

  const renderProducts = () => {
    if (isLoading) return <div>Loading products...</div>;
    if (isProductsError) return <div>Error loading products. Please try again later.</div>;

    return (
      <div className="product-grid">
        {products?.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.thumbnail} alt={product.title} />
            <h3>{product.title}</h3>
            <p>${product.price}</p>
            <button
              onClick={() => addToCartMutation.mutate(product)}
              disabled={addToCartMutation.isPending && addToCartMutation.variables?.id === product.id}
            >
              {addToCartMutation.isPending && addToCartMutation.variables?.id === product.id
                ? 'Adding...'
                : 'Add to Cart'}
            </button>
          </div>
        ))}
      </div>
    );
  };

  return (
    <CartSidebarProvider>
      <div className="app">
        <GlobalLoadingIndicator />
        <Header />
        <main className="app-main">
          <h2>Products</h2>
          {renderProducts()}
        </main>
        <CartSidebar />
        <ToastHost />
      </div>
    </CartSidebarProvider>
  );
}

export default App;