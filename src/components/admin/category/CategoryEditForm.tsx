"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField, Button, Stack, Typography, Box } from "@mui/material";
import { useTranslations } from "next-intl";

import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
} from "@/redux/categories/categoriesApi";
import { useCategorySchema } from "@/schemas/category";

interface CategoryEditFormProps {
  categoryId?: number;
  initialData?: {
    name: string;
    description: string;
  };
  setIsOpenModal: (isOpen: boolean) => void;
}

export const CategoryEditForm = ({
  categoryId,
  initialData,
  setIsOpenModal,
}: CategoryEditFormProps) => {
  const isEditing = Boolean(categoryId);

  const [createCategory, { isLoading: isCreating }] =
    useCreateCategoryMutation();
  const [updateCategory, { isLoading: isUpdating }] =
    useUpdateCategoryMutation();

  const t = useTranslations();
  const schema = useCategorySchema();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialData || {
      name: "",
      description: "",
    },
  });

  const onSubmit = async (data: { name: string; description: string }) => {
    if (isEditing) {
      updateCategory({ id: categoryId!, ...data });
    } else {
      createCategory(data);
    }
    setIsOpenModal(false);
  };

  return (
    <Box>
      <Typography variant="h5" align="center" gutterBottom sx={{ px: 5 }}>
        {isEditing
          ? t("category.titleEditCategory")
          : t("category.titleCreateCategory")}
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <TextField
            label={t("category.name")}
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <TextField
            label={t("category.description")}
            {...register("description")}
            error={!!errors.description}
            helperText={errors.description?.message}
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
