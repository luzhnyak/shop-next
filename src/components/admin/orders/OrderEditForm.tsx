"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField, Button, Stack, Typography, Box } from "@mui/material";
import { useTranslations } from "next-intl";

import {
  useCreateOrderMutation,
  useUpdateStatusOrderMutation,
} from "@/redux/orders/ordersApi";

import { IOrderCreate } from "@/types";
import { useOrderSchema } from "@/schemas/order";

interface OrderEditFormProps {
  orderId?: number;
  initialData?: {
    user_id: number;
    address_id: number;
    status: string;
  };
  setIsOpenModal: (isOpen: boolean) => void;
}

export const OrderEditForm = ({
  orderId,
  initialData,
  setIsOpenModal,
}: OrderEditFormProps) => {
  const isEditing = Boolean(orderId);

  const [createOrder, { isLoading: isCreating }] = useCreateOrderMutation();
  const [updateStatusOrder, { isLoading: isUpdating }] =
    useUpdateStatusOrderMutation();

  const t = useTranslations();
  const schema = useOrderSchema();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialData || {
      user_id: 0,
      address_id: 0,
      status: "",
    },
  });

  const onSubmit = async (data: IOrderCreate) => {
    if (isEditing) {
      updateStatusOrder({ id: orderId!, ...data });
    } else {
      createOrder(data);
    }
    setIsOpenModal(false);
  };

  return (
    <Box>
      <Typography variant="h5" align="center" gutterBottom sx={{ px: 5 }}>
        {isEditing ? t("order.titleEditOrder") : t("order.titleCreateOrder")}
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <TextField
            label={t("order.userId")}
            {...register("user_id")}
            error={!!errors.user_id}
            helperText={errors.user_id?.message}
          />
          <TextField
            label={t("order.addressId")}
            {...register("address_id")}
            error={!!errors.address_id}
            helperText={errors.address_id?.message}
          />
          <TextField
            label={t("order.status")}
            {...register("status")}
            error={!!errors.status}
            helperText={errors.status?.message}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isCreating || isUpdating}
          >
            {isCreating || isUpdating
              ? t("actions.btnSaving")
              : t("actions.btnSave")}
          </Button>
        </Stack>
      </form>
    </Box>
  );
};
