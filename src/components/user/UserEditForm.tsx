"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField, Button, Stack, Typography, Box } from "@mui/material";
import { useTranslations } from "next-intl";

import {
  useGetUserByIdQuery,
  useUpdateUserMutation,
} from "../../redux/users/usersApi";
import { useUserUpdateSchema } from "@/schemas/user";
import { useEffect } from "react";
import { toast } from "react-toastify";

interface UserEditFormProps {
  userId: number;
  setIsOpenModal: (isOpen: boolean) => void;
}

export const UserEditForm = ({ userId, setIsOpenModal }: UserEditFormProps) => {
  const { data: user, error } = useGetUserByIdQuery(userId);
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  const t = useTranslations();
  const schema = useUserUpdateSchema();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      first_name: user?.first_name || "",
      last_name: user?.last_name || "",
      password: "",
    },
  });

  const onSubmit = async (data: {
    first_name: string;
    last_name: string;
    email?: string;
    password?: string;
  }) => {
    await updateUser({ id: userId, ...data });
    setIsOpenModal(false);
  };

  useEffect(() => {
    if (error) toast.error(t("user.errorLoadingUser"));
  }, [error, t, toast]);

  return (
    <Box>
      <Typography variant="h5" align="center" gutterBottom sx={{ px: 5 }}>
        {t("user.titleEditUser")}
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <TextField
            label={t("user.firstName")}
            {...register("first_name")}
            error={!!errors.first_name}
            helperText={errors.first_name?.message}
          />
          <TextField
            label={t("user.lastName")}
            {...register("last_name")}
            error={!!errors.last_name}
            helperText={errors.last_name?.message}
          />
          <TextField
            label={t("user.password")}
            type="password"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isUpdating}
          >
            {isUpdating ? t("actions.btnSaving") : t("actions.btnSave")}
          </Button>
        </Stack>
      </form>
    </Box>
  );
};
