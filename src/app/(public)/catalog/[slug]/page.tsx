import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Catalog } from "@/components/catalog/Catalog";
import { serverApiClient } from "@/lib/server-api";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> => {
  const t = await getTranslations("catalog");
  const { slug } = await params;

  // Перевіряємо, чи це продукт
  const product = await serverApiClient.getProductBySlug(slug);
  if (product) {
    return {
      title: product.name,
      description: product.description,
      openGraph: {
        title: product.name,
        description: product.description,
        images: product.images.length > 0 ? [product.images[0].image_url] : [],
      },
    };
  }

  // Перевіряємо, чи це категорія
  const category = await serverApiClient.getCategoryBySlug(slug);
  if (category) {
    return {
      title: category.name,
      description:
        category.description || `Продукти категорії ${category.name}`,
    };
  }

  return { title: t("title"), description: t("description") };
};

const CategoryPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  return <Catalog slug={slug} />;
};

export default CategoryPage;
