import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { Catalog } from "@/components/catalog/Catalog";

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations("catalog");

  return {
    title: t("title"),
    description: t("description"),
  };
};

const CatalogPage = () => {
  return <Catalog />;
};

export default CatalogPage;
