"use client";

import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Chip,
  Stack,
  Divider,
  Button,
} from "@mui/material";
import { useGetProductBySlugQuery } from "@/redux/products/productsApi";
import { useGetCategoryByIdQuery } from "@/redux/categories/categoriesApi";

export const Product = () => {
  const params = useParams();
  const slug = params.slug?.toString();
  const t = useTranslations();

  const {
    data: product,
    isLoading: productLoading,
    error: productError,
  } = useGetProductBySlugQuery(slug || "");
  const { data: category } = useGetCategoryByIdQuery(
    product?.category_id || 0,
    {
      skip: !product?.category_id,
    }
  );

  if (productLoading) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography>Завантаження...</Typography>
      </Box>
    );
  }

  if (productError || !product) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography color="error">Продукт не знайдено</Typography>
      </Box>
    );
  }

  const mainImage =
    product.images.find((img) => img.is_main) || product.images[0];

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={4}>
        {/* Зображення продукту */}
        <Grid item xs={12} md={6}>
          <Card>
            {mainImage && (
              <CardMedia
                component="img"
                height="400"
                image={mainImage.image_url}
                alt={product.name}
                sx={{ objectFit: "cover" }}
              />
            )}
            {product.images.length > 1 && (
              <Box sx={{ p: 2 }}>
                <Grid container spacing={1}>
                  {product.images.slice(1).map((image) => (
                    <Grid item xs={3} key={image.id}>
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
        <Grid item xs={12} md={6}>
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
              >
                {product.stock_quantity > 0
                  ? "Додати до кошика"
                  : "Немає в наявності"}
              </Button>

              <Button variant="outlined" size="large">
                Додати до улюблених
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
