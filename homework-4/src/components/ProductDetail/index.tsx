import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

const fetchProduct = async (id: string): Promise<Product> => {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return res.json();
};

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation("products");
  const { data, isLoading, error } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProduct(id!),
    enabled: !!id,
  });

  if (isLoading) return <div>{t("loading")}</div>;
  if (error) return <div>{t("error", { error: error.message })}</div>;

  return (
    <div>
      <Link to="/products">{t("back_to_products")}</Link>
      <h1>{data?.title}</h1>
      <img src={data?.image} alt={data?.title} width="200" />
      <p>{data?.description}</p>
      <p><strong>Price:</strong> ${data?.price}</p>
    </div>
  );
};

export default ProductDetail;