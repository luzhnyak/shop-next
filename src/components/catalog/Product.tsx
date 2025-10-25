import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { FavoriteBorder } from "@mui/icons-material";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Stack,
  Divider,
  Button,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { serverApiClient } from "@/lib/server-api";
import { IProduct } from "@/types";

interface ProductProps {
  product: IProduct;
}

export const Product = async ({ product }: ProductProps) => {
  const category = product.category_id
    ? await serverApiClient.getCategoryById(product.category_id)
    : null;

  const mainImage =
    product.images.find((img) => img.is_main)?.image_url ||
    "/images/placeholder.png";

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={4}>
        {/* Зображення продукту */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            {mainImage && (
              <CardMedia
                component="img"
                height="400"
                image={mainImage}
                alt={product.name}
                sx={{ objectFit: "contain" }}
              />
            )}
            {product.images.length > 1 && (
              <Box sx={{ p: 2 }}>
                <Grid container spacing={1}>
                  {product.images.slice(1).map((image) => (
                    <Grid size={{ xs: 3 }} key={image.id}>
                      <CardMedia
                        component="img"
                        height="80"
                        image={image.image_url}
                        alt={product.name}
                        sx={{
                          objectFit: "cover",
                          borderRadius: 1,
                          cursor: "pointer",
                        }}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}
          </Card>
        </Grid>

        {/* Інформація про продукт */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Box>
            <Typography variant="h4" gutterBottom>
              {product.name}
            </Typography>

            {category && (
              <Chip
                label={category.name}
                color="primary"
                variant="outlined"
                sx={{ mb: 2 }}
              />
            )}

            <Typography variant="h5" color="primary" gutterBottom>
              {product.base_price} ₴
            </Typography>

            <Typography variant="body1" sx={{ mb: 3 }}>
              {product.description}
            </Typography>

            <Divider sx={{ my: 2 }} />

            {/* Деталі продукту */}
            <Stack spacing={2}>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  SKU
                </Typography>
                <Typography variant="body1">{product.sku}</Typography>
              </Box>

              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Кількість на складі
                </Typography>
                <Typography variant="body1">
                  {product.stock_quantity} шт.
                </Typography>
              </Box>

              {/* Опції продукту */}
              {product.options && product.options.length > 0 && (
                <Box>
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    gutterBottom
                  >
                    Опції
                  </Typography>
                  <Stack spacing={1}>
                    {product.options.map((option) => (
                      <Box
                        key={option.id}
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography variant="body2">
                          {option.name}: {option.value}
                        </Typography>
                        {option.additional_price > 0 && (
                          <Typography variant="body2" color="primary">
                            +{option.additional_price} ₴
                          </Typography>
                        )}
                      </Box>
                    ))}
                  </Stack>
                </Box>
              )}
            </Stack>

            <Box sx={{ mt: 3 }}>
              <Button
                variant="contained"
                size="large"
                disabled={product.stock_quantity === 0}
                sx={{ mr: 2 }}
                startIcon={<ShoppingCartIcon />}
              >
                {product.stock_quantity > 0
                  ? "Додати до кошика"
                  : "Немає в наявності"}
              </Button>

              <Button
                variant="outlined"
                size="large"
                startIcon={<FavoriteBorder />}
              >
                Додати до улюблених
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
