import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { Catalog } from "@/components/catalog/Catalog";

export const generateMetadata = async ({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> => {
  const t = await getTranslations("catalog");

  // const { slug } = params;
  // const { data: category } = getCategoryBySlug(slug);
  // if (category)
  //   return { title: category.name, description: category.description };

  // const { data: product } = getProductBySlug(slug);
  // if (product) return { title: product.name, description: product.description };

  return { title: t("title"), description: t("description") };
};

const CategoryPage = () => {
  return <Catalog />;
};

export default CategoryPage;
