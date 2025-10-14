"use client";

import { Typography, Box, Button } from "@mui/material";
import { Products } from "./Products";
import { Categories } from "./Categories";

export const Catalog = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Каталог
      </Typography>
      <Categories />
      <Products />
    </Box>
  );
};
