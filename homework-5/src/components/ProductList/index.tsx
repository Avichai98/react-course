import { useQuery, useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { useCartStore } from "../../stores/cart";
import { useNotificationStore } from "../../stores/notifications";
import { addToCartAPI } from "../../api/cart";
import { fetchProductsAPI, type Product } from "../../api/products";

export const ProductList = () => {
  const { t } = useTranslation("products");
  const navigate = useNavigate();
  const addProductToCart = useCartStore((state) => state.addToCart);
  const addNotification = useNotificationStore((state) => state.addNotification);
  
  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProductsAPI,
  });

  const addToCartMutation = useMutation({
    mutationFn: (product: Product) => addToCartAPI(product.id),
    onSuccess: (_data, product) => {
      addNotification({
        type: 'success',
        message: t('cart_add_success', { productTitle: product.title }),
      });
      addProductToCart(product);
    },
    onError: (error) => {
      addNotification({
        type: 'error',
        message: t('cart_add_error', { error: error.message || t('unknown_error') }),
      });
    },
  });

  if (isLoading) return <div>{t("loading")}</div>;
  if (error) return <div>{t("error", { error: error.message })}</div>;
  if (!data || data.length === 0) return <div>{t("no_products")}</div>;

  const imageBodyTemplate = (product: Product) => {
    return <img src={product.thumbnail} alt={product.title} className="product-image" style={{ width: '50px', height: '50px', objectFit: 'cover' }} />;
  };

  const priceBodyTemplate = (product: Product) => {
    const { i18n } = useTranslation();
    const formatter = new Intl.NumberFormat(i18n.language, {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    });
    return formatter.format(product.price);
  };

  const actionBodyTemplate = (product: Product) => {
    return (
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <Button
          icon="pi pi-search"
          label={t("view_details")}
          onClick={() => navigate(`/products/${product.id}`)}
          size="small"
          severity="info"
        />
        <Button
          icon="pi pi-shopping-cart"
          label={t("add_to_cart")}
          onClick={() => addToCartMutation.mutate(product)}
          disabled={addToCartMutation.isPending && addToCartMutation.variables?.id === product.id}
          size="small"
          severity="success"
        />
      </div>
    );
  };

  return (
    <div className="card">
      <h2>{t("products_page_title")}</h2>
      <p>{t("showing_products", { count: data.length })}</p>
      <DataTable 
        value={data} 
        paginator 
        rows={5} 
        sortMode="multiple" 
        removableSort 
        totalRecords={data.length}
        className="p-datatable-sm"
      >
        <Column header={t("image")} body={imageBodyTemplate} />
        <Column field="title" header={t("title")} sortable />
        <Column field="price" header={t("price")} body={priceBodyTemplate} sortable />
        <Column field="category" header={t("category")} sortable />
        <Column header={t("action")} body={actionBodyTemplate} />
      </DataTable>
    </div>
  );
};

export default ProductList;