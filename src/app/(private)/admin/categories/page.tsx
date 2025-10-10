import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { CategoryList } from "@/components/category";

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations("category");

  return {
    title: t("titleCategories"),
  };
};

const CategoriesPage = () => {
  return <CategoryList />;
};

export default CategoriesPage;
