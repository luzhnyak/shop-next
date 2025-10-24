"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  Chip,
  Stack,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { IProduct } from "@/types";

interface ProductCardProps {
  product: IProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  const mainImage =
    product.images.find((img) => img.is_main)?.image_url ||
    "/images/placeholder.png"; // заглушка
  const colorOption = product.options.find((opt) => opt.name === "color");

  const handleViewProduct = () => {
    router.push(`/catalog/${product.slug}`);
  };

  return (
    <Card
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        borderRadius: 3,
        boxShadow: 3,
        transition: "transform 0.2s ease",
        flexGrow: 1,
        "&:hover": {
          transform: "scale(1.03)",
          boxShadow: 6,
        },
      }}
    >
      <Box sx={{ position: "relative", width: "100%", height: 200 }}>
        <Image
          src={mainImage}
          alt={product.name}
          fill
          sizes="300px"
          style={{
            objectFit: "contain",
            borderTopLeftRadius: "12px",
            borderTopRightRadius: "12px",
          }}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "/images/placeholder.png"; // fallback при помилці завантаження
          }}
        />
      </Box>

      <CardContent>
        <Typography variant="h6" fontWeight={600} noWrap>
          {product.name}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          SKU: <strong>{product.sku}</strong>
        </Typography>

        {colorOption && (
          <Typography variant="body2" color="text.secondary">
            Колір: <strong>{colorOption.value}</strong>
          </Typography>
        )}

        <Stack direction="row" justifyContent="space-between" mt={1}>
          <Typography variant="h6" color="primary">
            {product.base_price.toFixed(2)} ₴
          </Typography>

          <Chip
            label={
              product.stock_quantity > 0
                ? `В наявності: ${product.stock_quantity}`
                : "Немає в наявності"
            }
            color={product.stock_quantity > 0 ? "success" : "default"}
            size="small"
          />
        </Stack>
      </CardContent>

      <CardActions>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          startIcon={<VisibilityIcon />}
          onClick={handleViewProduct}
        >
          Переглянути
        </Button>
      </CardActions>
    </Card>
  );
}
