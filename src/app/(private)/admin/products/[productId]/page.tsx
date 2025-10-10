import { ProductDetails } from "@/components/product";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations("company");

  return {
    title: t("titleCompanies"),
  };
};

const ProductPage = () => {
  return <ProductDetails />;
};

export default ProductPage;
