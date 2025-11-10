"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  TextField,
  Button,
  Stack,
  Typography,
  Box,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
} from "@mui/material";
import { useTranslations } from "next-intl";

import {
  useCreateOrderMutation,
  useUpdateOrderMutation,
} from "@/redux/orders/ordersApi";

import { IOrderCreate, OrderStatusEnum } from "@/types";
import { useOrderSchema } from "@/schemas/order";

interface OrderEditFormProps {
  orderId?: number;
  initialData?: {
    user_id: number;
    address_id: number;
    status: OrderStatusEnum;
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
  const [updateOrder, { isLoading: isUpdating }] = useUpdateOrderMutation();

  const t = useTranslations();
  const schema = useOrderSchema();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IOrderCreate>({
    resolver: yupResolver(schema),
    defaultValues: initialData || {
      user_id: 0,
      address_id: 0,
      status: OrderStatusEnum.pending,
    },
  });

  const onSubmit = async (data: IOrderCreate) => {
    const payload = {
      ...data,
      status: data.status as OrderStatusEnum,
    };

    if (isEditing) {
      updateOrder({ id: orderId!, ...payload });
    } else {
      createOrder(payload);
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

          {/* <TextField
            label={t("order.status")}
            {...register("status")}
            error={!!errors.status}
            helperText={errors.status?.message}
          /> */}
          <FormControl error={!!errors.status}>
            <InputLabel>{t("order.status")}</InputLabel>
            <Select
              label={t("order.status")}
              defaultValue={initialData?.status || OrderStatusEnum.pending}
              {...register("status")}
            >
              {Object.values(OrderStatusEnum).map((status) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </Select>
            {errors.status && (
              <Typography variant="caption" color="error">
                {errors.status.message}
              </Typography>
            )}
          </FormControl>
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
