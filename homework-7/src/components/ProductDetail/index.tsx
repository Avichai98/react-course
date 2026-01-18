import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import { useProduct } from "@homework-7/hooks";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { t, i18n } = useTranslation("products");
  const { data, isLoading, error } = useProduct(id!);

  if (isLoading) return <div>{t("loading")}</div>;
  if (error) return <div>{t("error", { error: error.message })}</div>;

  const formatPrice = (price: number) => {
    const formatter = new Intl.NumberFormat(i18n.language, {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    });
    return formatter.format(price);
  };

  return (
    <div>
      <Link to="/products">{t("back_to_products")}</Link>
      <h1>{data?.title}</h1>
      <img src={data?.thumbnail} alt={data?.title} width="200" />
      <p>{data?.description}</p>
      <p><strong>{t("price")}:</strong> {data?.price ? formatPrice(data.price) : ''}</p>
      <p><strong>{t("category")}:</strong> {data?.category}</p>
    </div>
  );
};

export default ProductDetail;