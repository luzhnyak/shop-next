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

  // Отримуємо всі категорії один раз
  const allCategories = await serverApiClient.getAllCategories();

  // Перевіряємо, чи slug належить категорії
  const category = allCategories?.items?.find((cat) => cat.slug === slug);

  if (category) {
    return {
      title: category.name,
      description:
        category.description || `Продукти категорії ${category.name}`,
    };
  }

  // Якщо це не категорія, перевіряємо продукт
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
