"use client";

import {
  Box,
  Drawer,
  Typography,
  Divider,
  Stack,
  IconButton,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useSelector } from "react-redux";
import { useGetCartByUserIdQuery } from "@/redux/carts/cartsApi";
import { selectCurrentUser } from "@/redux/auth/authSelectors";
// import { selectCartItems } from "@/redux/cart/cartSelectors";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export const CartDrawer = ({ open, onClose }: CartDrawerProps) => {
  const t = useTranslations();

  const currentUser = useSelector(selectCurrentUser);
  const { data, error } = useGetCartByUserIdQuery(currentUser?.id || 1);

  const cartItems = data?.items || [];

  console.log(data?.items);
  //   const cartItems = useSelector(selectCartItems);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: { width: { xs: "100%", sm: 400 }, p: 2 },
        },
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h6">{t("navigation.cart")}</Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Stack>

      <Divider sx={{ my: 2 }} />

      {cartItems.length === 0 ? (
        <Typography color="text.secondary">{t("cart.emptyMessage")}</Typography>
      ) : (
        <Stack spacing={2}>
          {cartItems.map((item: any) => (
            <Box
              key={item.id}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Stack direction="row" alignItems="center" spacing={2}>
                {item.image && (
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={50}
                    height={50}
                    style={{ borderRadius: 8 }}
                  />
                )}
                <Box>
                  <Typography fontWeight={500}>{item.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    x{item.quantity} × {item.price.toFixed(2)} ₴
                  </Typography>
                </Box>
              </Stack>
              <Typography fontWeight={500}>
                {(item.price * item.quantity).toFixed(2)} ₴
              </Typography>
            </Box>
          ))}

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6" textAlign="right">
            {t("cart.total")}: {total.toFixed(2)} ₴
          </Typography>

          <Button variant="contained" fullWidth sx={{ mt: 2 }}>
            {t("cart.checkout")}
          </Button>
        </Stack>
      )}
    </Drawer>
  );
};
