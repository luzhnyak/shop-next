"use client";

import {
  Box,
  Drawer,
  Typography,
  Divider,
  Stack,
  IconButton,
  Button,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useSelector } from "react-redux";
import {
  useGetMyCartQuery,
  useUpdateCartItemMutation,
  useDeleteCartItemMutation,
  useClearCartMutation,
} from "@/redux/carts/cartsApi";
import { selectCurrentUser } from "@/redux/auth/authSelectors";
import { useState } from "react";
import { Check, CleaningServices } from "@mui/icons-material";
import { Popconfirm } from "../ui/Popconfirm";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export const CartDrawer = ({ open, onClose }: CartDrawerProps) => {
  const t = useTranslations();
  const currentUser = useSelector(selectCurrentUser);

  // RTK Query hooks
  const { data, refetch } = useGetMyCartQuery();
  const [updateCartItem] = useUpdateCartItemMutation();
  const [deleteCartItem] = useDeleteCartItemMutation();
  const [clearCart] = useClearCartMutation();

  // зберігаємо локально введені кількості, щоб не оновлювати сервер при кожному вводі
  const [quantities, setQuantities] = useState<Record<number, number>>({});

  const cartItems = data?.items || [];

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // 🔹 Оновити кількість
  const handleChangeQuantity = async (itemId: number, quantity: number) => {
    if (quantity < 1) return;
    await updateCartItem({ id: itemId, quantity });
    refetch();
  };

  // 🔹 Видалити продукт
  const handleRemoveItem = async (itemId: number) => {
    await deleteCartItem(itemId);
    refetch();
  };

  // 🔹 Очистити всю корзину
  const handleClearCart = async () => {
    await clearCart();
    refetch();
  };

  // 🔹 При зміні інпуту
  const handleInputChange = (itemId: number, value: string) => {
    const num = Number(value);
    if (!isNaN(num)) {
      setQuantities((prev) => ({ ...prev, [itemId]: num }));
    }
  };

  // 🔹 При натисканні Enter
  const handleKeyPress = async (e: React.KeyboardEvent, itemId: number) => {
    if (e.key === "Enter") {
      const newQuantity = quantities[itemId];
      if (newQuantity && newQuantity > 0) {
        await handleChangeQuantity(itemId, newQuantity);
      }
    }
  };

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
          {cartItems.map((item: any) => {
            const currentQuantity =
              quantities[item.id] !== undefined
                ? quantities[item.id]
                : item.quantity;

            return (
              <Box
                key={item.id}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Stack direction="row" alignItems="center" spacing={2} flex={1}>
                  {item.image && (
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={50}
                      height={50}
                      style={{ borderRadius: 8 }}
                    />
                  )}

                  <Box sx={{ flex: 1 }}>
                    <Typography fontWeight={500}>{item.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.price.toFixed(2)} ₴
                    </Typography>

                    {/* 🔹 Поле для кількості з кнопками */}
                    <Stack
                      direction="row"
                      alignItems="center"
                      spacing={1}
                      mt={0.5}
                    >
                      <IconButton
                        size="small"
                        onClick={() =>
                          handleChangeQuantity(item.id, item.quantity - 1)
                        }
                      >
                        <RemoveIcon fontSize="small" />
                      </IconButton>

                      <TextField
                        variant="outlined"
                        size="small"
                        value={currentQuantity}
                        onChange={(e) =>
                          handleInputChange(item.id, e.target.value)
                        }
                        onKeyDown={(e) => handleKeyPress(e, item.id)}
                        sx={{ width: 60 }}
                        inputProps={{
                          style: { textAlign: "center" },
                        }}
                      />

                      <IconButton
                        size="small"
                        onClick={() =>
                          handleChangeQuantity(item.id, item.quantity + 1)
                        }
                      >
                        <AddIcon fontSize="small" />
                      </IconButton>
                    </Stack>
                  </Box>
                </Stack>

                {/* 🔹 Ціна та видалення */}
                <Stack alignItems="flex-end" spacing={0.5}>
                  <Typography fontWeight={500}>
                    {(item.price * item.quantity).toFixed(2)} ₴
                  </Typography>
                  <Popconfirm
                    title={t("cart.removeItem")}
                    description={t("cart.removeItemConfirm")}
                    onConfirm={() => handleRemoveItem(item.id)}
                  >
                    <IconButton
                      color="error"
                      size="small"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Popconfirm>
                </Stack>
              </Box>
            );
          })}

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6" textAlign="right">
            {t("cart.total")}: {total.toFixed(2)} ₴
          </Typography>

          <Stack direction="row" spacing={1} mt={2}>
            <Popconfirm
              title={t("cart.clearCart")}
              description={t("cart.clearConfirm")}
              onConfirm={handleClearCart}
            >
              <Button
                variant="outlined"
                color="error"
                startIcon={<CleaningServices />}
                fullWidth
              >
                {t("cart.clearCart")}
              </Button>
            </Popconfirm>
            <Button variant="contained" startIcon={<Check />} fullWidth>
              {t("cart.checkout")}
            </Button>
          </Stack>
        </Stack>
      )}
    </Drawer>
  );
};
