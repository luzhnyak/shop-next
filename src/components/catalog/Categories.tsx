import Link from "next/link";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import { serverApiClient } from "@/lib/server-api";

interface CategoriesProps {
  currentSlug?: string;
}

export const Categories = async ({ currentSlug }: CategoriesProps) => {
  const categories = await serverApiClient.getAllCategories();

  if (!categories?.items || categories.items.length === 0) {
    return null;
  }

  return (
    <Box
      sx={{
        width: "100%",
        overflowX: "auto",
        bgcolor: "background.paper",
        borderBottom: "1px solid",
        borderColor: "divider",
        paddingBottom: 2,
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
        {categories.items.map((category) => {
          const isActive = currentSlug === category.slug;
          return (
            <Typography
              key={category.id}
              component={Link}
              href={`/catalog/${category.slug}`}
              variant="body1"
              sx={{
                textDecoration: "none",
                color: isActive ? "primary.main" : "text.primary",
                fontWeight: isActive ? 600 : 500,
                position: "relative",
                transition: "color 0.2s ease",
                "&:hover": {
                  color: "primary.main",
                },
                "&::after": {
                  content: '""',
                  position: "absolute",
                  left: 0,
                  bottom: -4,
                  width: isActive ? "100%" : 0,
                  height: 2,
                  bgcolor: "primary.main",
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
