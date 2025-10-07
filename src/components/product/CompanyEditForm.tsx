"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField, Button, Stack, Typography, Box } from "@mui/material";
import { useTranslations } from "next-intl";

import {
  useCreateCompanyMutation,
  useUpdateCompanyMutation,
} from "@/redux/products/productsApi";
import { useCompanySchema } from "@/schemas/company";

interface CompanyEditFormProps {
  companyId?: number;
  initialData?: {
    name: string;
    description: string;
  };
  setIsOpenModal: (isOpen: boolean) => void;
}

export const CompanyEditForm = ({
  companyId,
  initialData,
  setIsOpenModal,
}: CompanyEditFormProps) => {
  const isEditing = Boolean(companyId);

  const [createCompany, { isLoading: isCreating }] = useCreateCompanyMutation();
  const [updateCompany, { isLoading: isUpdating }] = useUpdateCompanyMutation();

  const t = useTranslations();
  const schema = useCompanySchema();

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
      updateCompany({ id: companyId!, ...data });
    } else {
      createCompany(data);
    }
    setIsOpenModal(false);
  };

  return (
    <Box>
      <Typography variant="h5" align="center" gutterBottom sx={{ px: 5 }}>
        {isEditing
          ? t("company.titleEditCompany")
          : t("company.titleCreateCompany")}
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <TextField
            label={t("company.name")}
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <TextField
            label={t("company.description")}
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
