"use client";

import { useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";

import { useTranslations } from "next-intl";
import { Typography, Box, Button, Stack } from "@mui/material";
import Grid from "@mui/material/Grid2";

import { useGetProductsQuery } from "@/redux/products/productsApi";
import ProductCard from "./ProductCard";

export const Products = () => {
  const params = useParams();
  const slug = params.categorySlug?.toString();
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;
  const rowsPerPage = Number(searchParams.get("rowsPerPage")) || 10;

  const { data } = useGetProductsQuery({
    skip: (page - 1) * rowsPerPage,
    limit: rowsPerPage,
    category: slug,
  });

  const t = useTranslations();
  const router = useRouter();

  return (
    <Box>
      <Grid container spacing={3}>
        {data?.items.map((product) => (
          <Grid
            key={product.id}
            size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2.4 }}
          >
            <ProductCard key={product.id} product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
