"use client";

import { useParams } from "next/navigation";
import { Typography, Box } from "@mui/material";
import { Products } from "./Products";
import { Categories } from "./Categories";
import { Product } from "./Product";
import { useGetProductBySlugQuery } from "@/redux/products/productsApi";
import { useGetCategoryBySlugQuery } from "@/redux/categories/categoriesApi";

export const Catalog = () => {
  const params = useParams();
  const slug = params.slug?.toString();

  // Перевіряємо, чи slug відповідає продукту
  const { data: product, isLoading: productLoading } = useGetProductBySlugQuery(
    slug || "",
    {
      skip: !slug,
    }
  );

  // Перевіряємо, чи slug відповідає категорії
  const { data: category, isLoading: categoryLoading } =
    useGetCategoryBySlugQuery(slug || "", {
      skip: !slug,
    });

  // Якщо є slug, але немає продукту та категорії, показуємо помилку
  const isError =
    slug && !productLoading && !categoryLoading && !product && !category;

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Каталог
      </Typography>
      <Categories />

      {isError && (
        <Box sx={{ p: 3, textAlign: "center" }}>
          <Typography color="error">
            Категорія або продукт не знайдено
          </Typography>
        </Box>
      )}

      {product && <Product />}
      {category && !product && <Products />}
      {!slug && <Products />}
    </Box>
  );
};
