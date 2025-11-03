"use client";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { FavoriteBorder } from "@mui/icons-material";
import { Box, Button } from "@mui/material";

import { useAddToCartMutation } from "@/redux/carts/cartsApi";
import { IProduct } from "@/types";

interface ProductProps {
  product: IProduct;
}

export const ProductActionsButtons = ({ product }: ProductProps) => {
  const [addToCart] = useAddToCartMutation();

  const handleAddToCart = async () => {
    await addToCart({ userId: 1, product_id: product.id, quantity: 1 });
  };

  return (
    <Box sx={{ mt: 3 }}>
      <Button
        variant="contained"
        size="large"
        disabled={product.stock_quantity === 0}
        sx={{ mr: 2 }}
        startIcon={<ShoppingCartIcon />}
        onClick={handleAddToCart}
      >
        {product.stock_quantity > 0 ? "Додати до кошика" : "Немає в наявності"}
      </Button>

      <Button variant="outlined" size="large" startIcon={<FavoriteBorder />}>
        Додати до улюблених
      </Button>
    </Box>
  );
};
