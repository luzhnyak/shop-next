import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { ProductList } from "@/components/product";

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations("company");

  return {
    title: t("titleCompanies"),
  };
};

const ProductsPage = () => {
  return <ProductList />;
};

export default ProductsPage;
