import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

interface Product {
  id: number;
  title: string;
  price: number;
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
  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (isLoading) return <div>{t("loading")}</div>;
  if (error) return <div>{t("error", { error: error.message })}</div>;
  if (!data || data.length === 0) return <div>{t("no_products")}</div>;

  return (
    <div>
      <h2>{t("products_page_title")}</h2>
      <p>{t("showing_products", { count: data.length })}</p>
      <ul>
        {data.map((product) => (
          <li key={product.id}>
            <Link to={`/products/${product.id}`}>{product.title}</Link> - ${product.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsList;