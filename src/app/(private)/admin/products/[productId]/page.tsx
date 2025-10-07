import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { CompanyList } from "@/components/product";

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
