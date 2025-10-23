"use client";

import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import { useGetAllCategoriesQuery } from "@/redux/categories/categoriesApi";

export const Categories = () => {
  const { data } = useGetAllCategoriesQuery({});
  const t = useTranslations();
  const router = useRouter();
  const theme = useTheme();
  const params = useParams();
  const currentSlug = params.slug?.toString();

  return (
    <Box
      sx={{
        width: "100%",
        overflowX: "auto",
        bgcolor: "background.paper",
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Stack
        direction="row"
        spacing={2}
        sx={{
          px: 2,
          py: 1,
          minWidth: "max-content",
          alignItems: "center",
        }}
      >
        {data?.items.map((category) => {
          const isActive = currentSlug === category.slug;
          return (
            <Typography
              key={category.id}
              component={Link}
              href={`/catalog/${category.slug}`}
              variant="body1"
              sx={{
                textDecoration: "none",
                color: isActive ? theme.palette.primary.main : "text.primary",
                fontWeight: isActive ? 600 : 500,
                position: "relative",
                transition: "color 0.2s ease",
                "&:hover": {
                  color: theme.palette.primary.main,
                },
                "&::after": {
                  content: '""',
                  position: "absolute",
                  left: 0,
                  bottom: -4,
                  width: isActive ? "100%" : 0,
                  height: 2,
                  bgcolor: theme.palette.primary.main,
                  transition: "width 0.2s ease",
                },
                "&:hover::after": {
                  width: "100%",
                },
              }}
            >
              {category.name}
            </Typography>
          );
        })}
      </Stack>
    </Box>
  );
};
