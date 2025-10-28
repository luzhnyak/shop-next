import { ProductDetails } from "@/components/product";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations("admin");

  return {
    title: t("titleAdminPanelProducts"),
  };
};

const ProductPage = () => {
  return <ProductDetails />;
};

export default ProductPage;
