"use client";

import { Typography, Box, Button } from "@mui/material";
import { Products } from "./Products";

export const Catalog = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Каталог
      </Typography>
      <Products />
    </Box>
  );
};
