import { Typography, Box } from "@mui/material";
import { Products } from "./Products";
import { Categories } from "./Categories";
import { Product } from "./Product";
import { serverApiClient } from "@/lib/server-api";

interface CatalogProps {
  slug?: string;
}

export const Catalog = async ({ slug }: CatalogProps) => {
  let product = null;
  let category = null;

  // Отримуємо всі категорії один раз
  const allCategories = await serverApiClient.getAllCategories();

  if (slug && allCategories?.items) {
    // Перевіряємо, чи slug належить категорії
    category = allCategories.items.find((cat) => cat.slug === slug);

    // Якщо це не категорія, перевіряємо продукт
    if (!category) {
      product = await serverApiClient.getProductBySlug(slug);
    }
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Каталог
      </Typography>
      <Categories
        currentSlug={slug}
        allCategories={allCategories?.items || []}
      />

      {product && <Product product={product} />}
      {category && !product && <Products categorySlug={slug} />}
      {!slug && <Products />}
    </Box>
  );
};
