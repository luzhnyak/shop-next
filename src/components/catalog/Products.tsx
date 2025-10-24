import { Typography, Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { serverApiClient } from "@/lib/server-api";
import ProductCard from "./ProductCard";

interface ProductsProps {
  categorySlug?: string;
  page?: number;
  limit?: number;
}

export const Products = async ({
  categorySlug,
  page = 1,
  limit = 10,
}: ProductsProps) => {
  const products = await serverApiClient.getProducts({
    skip: (page - 1) * limit,
    limit,
    category: categorySlug,
  });

  if (!products?.items || products.items.length === 0) {
    return (
      <Box sx={{ py: 3, textAlign: "center" }}>
        <Typography variant="h6" color="text.secondary">
          Продукти не знайдено
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ py: 3 }}>
      <Grid container spacing={3}>
        {products.items.map((product) => (
          <Grid
            key={product.id}
            size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2.4 }}
          >
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
