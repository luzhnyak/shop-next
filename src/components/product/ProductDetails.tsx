"use client";

import { notFound, useParams, usePathname } from "next/navigation";

import { selectCurrentUser } from "@/redux/auth/authSelectors";
import { useSelector } from "react-redux";
import { useTranslations } from "next-intl";
import { ReactNode, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { Card, CardContent, Typography, Box } from "@mui/material";

import { useGetProductByIdQuery } from "@/redux/products/productsApi";
import { ProductEditBtn } from "@/components/product";

export const ProductDetails = () => {
  const params = useParams();
  const productId = Number(params.productId);

  const pathname = usePathname();

  if (isNaN(productId)) {
    notFound();
  }

  const { data: product, error } = useGetProductByIdQuery(productId);

  const t = useTranslations();

  useEffect(() => {
    if (error) toast.error(t("product.errorLoadingProduct"));
  }, [error, t, toast]);

  if (!product)
    return (
      <Typography align="center">{t("product.productNotFound")}</Typography>
    );

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        {t("product.titleProduct")}
      </Typography>
      <Card sx={{ maxWidth: 400, mx: "auto", p: 2, textAlign: "center" }}>
        <CardContent>
          <Typography variant="h5">{product.name}</Typography>
          <Typography variant="body1" color="text.secondary">
            {product.description}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("product.sku")}: {product.sku}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("product.base_price")}: {product.base_price}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("product.stock_quantity")}: {product.stock_quantity}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("product.category_id")}: {product.category_id}
          </Typography>
          <ProductEditBtn product={product} />
        </CardContent>
      </Card>
    </Box>
  );
};
