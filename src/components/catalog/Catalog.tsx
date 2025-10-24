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

  if (slug) {
    // Перевіряємо, чи slug відповідає продукту
    product = await serverApiClient.getProductBySlug(slug);

    // Якщо не продукт, перевіряємо категорію
    if (!product) {
      category = await serverApiClient.getCategoryBySlug(slug);
    }
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Каталог
      </Typography>
      <Categories currentSlug={slug} />

      {product && <Product slug={slug!} />}
      {category && !product && <Products categorySlug={slug} />}
      {!slug && <Products />}
    </Box>
  );
};
