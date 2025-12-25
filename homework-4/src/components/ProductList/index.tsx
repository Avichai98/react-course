import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
}

const fetchProducts = async (): Promise<Product[]> => {
  const res = await fetch("https://fakestoreapi.com/products");
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return res.json();
};

const ProductsList = () => {
  const { t } = useTranslation("products");
  const navigate = useNavigate();
  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (isLoading) return <div>{t("loading")}</div>;
  if (error) return <div>{t("error", { error: error.message })}</div>;
  if (!data || data.length === 0) return <div>{t("no_products")}</div>;

  const imageBodyTemplate = (product: Product) => {
    return <img src={product.image} alt={product.title} className="product-image" />;
  };

  const priceBodyTemplate = (product: Product) => {
    return `$${product.price.toFixed(2)}`;
  };

  const actionBodyTemplate = (product: Product) => {
    return (
      <Button
        icon="pi pi-search"
        label={t("view_details")}
        onClick={() => navigate(`/products/${product.id}`)}
      />
    );
  };

  return (
    <div className="card">
      <h2>{t("products_page_title")}</h2>
      <DataTable value={data} paginator rows={5} sortMode="multiple" removableSort totalRecords={data.length}>
        <Column header="Image" body={imageBodyTemplate} />
        <Column field="title" header="Title" sortable />
        <Column field="price" header="Price" body={priceBodyTemplate} sortable />
        <Column field="category" header="Category" sortable />
        <Column header="Action" body={actionBodyTemplate} />
      </DataTable>
    </div>
  );
};

export default ProductsList;