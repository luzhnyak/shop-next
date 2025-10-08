"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField, Button, Stack, Typography, Box } from "@mui/material";
import { useTranslations } from "next-intl";

import {
  useCreateProductMutation,
  useUpdateProductMutation,
} from "@/redux/products/productsApi";
import { useProductSchema } from "@/schemas/product";

interface ProductFormData {
  name: string;
  description: string;
  base_price: number;
  sku: string;
  stock_quantity: number;
  category_id: number;
}

interface ProductEditFormProps {
  productId?: number;
  initialData?: {
    name: string;
    description: string;
    base_price: number;
    sku: string;
    stock_quantity: number;
    category_id: number;
  };
  setIsOpenModal: (isOpen: boolean) => void;
}

export const ProductEditForm = ({
  productId,
  initialData,
  setIsOpenModal,
}: ProductEditFormProps) => {
  const isEditing = Boolean(productId);

  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();

  const t = useTranslations();
  const schema = useProductSchema();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: yupResolver(schema),
    defaultValues: initialData || {
      name: "",
      description: "",
      base_price: 0,
      sku: "",
      stock_quantity: 0,
      category_id: 0,
    },
  });

  const onSubmit = async (data: {
    name: string;
    description: string;
    base_price: number;
    sku: string;
    stock_quantity: number;
    category_id: number;
  }) => {
    if (isEditing) {
      updateProduct({ id: productId!, ...data });
    } else {
      createProduct(data);
    }
    setIsOpenModal(false);
  };

  return (
    <Box>
      <Typography variant="h5" align="center" gutterBottom sx={{ px: 5 }}>
        {isEditing
          ? t("product.titleEditProduct")
          : t("product.titleCreateProduct")}
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <TextField
            label={t("product.name")}
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <TextField
            label={t("product.description")}
            {...register("description")}
            error={!!errors.description}
            helperText={errors.description?.message}
          />
          <TextField
            label={t("product.base_price")}
            {...register("base_price")}
            error={!!errors.base_price}
            helperText={errors.base_price?.message}
          />
          <TextField
            label={t("product.sku")}
            {...register("sku")}
            error={!!errors.sku}
            helperText={errors.sku?.message}
          />
          <TextField
            label={t("product.stock_quantity")}
            {...register("stock_quantity")}
            error={!!errors.stock_quantity}
            helperText={errors.stock_quantity?.message}
          />
          <TextField
            label={t("product.category_id")}
            {...register("category_id")}
            error={!!errors.category_id}
            helperText={errors.category_id?.message}
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
