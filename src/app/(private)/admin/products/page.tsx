import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { ProductList } from "@/components/product";

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations("admin");

  return {
    title: t("titleAdminPanelProducts"),
  };
};

const AdminPanelProductsPage = () => {
  return <ProductList />;
};

export default AdminPanelProductsPage;
