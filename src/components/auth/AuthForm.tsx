"use client";

import { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  Stack,
} from "@mui/material";
import { useLoginMutation, useRegisterMutation } from "@/redux/auth/authApi";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Auth0Button } from "./Auth0Button";
import { AuthFormData, IUserSignUp } from "@/types";
import { useLoginSchema, useRegisterSchema } from "@/schemas/auth";
import { toast } from "react-toastify";

export const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [login, { error: loginError }] = useLoginMutation();
  const [registerUser, { error: registerError }] = useRegisterMutation();

  const t = useTranslations("auth");
  const loginSchema = useLoginSchema();
  const registerSchema = useRegisterSchema();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AuthFormData>({
    resolver: yupResolver(isLogin ? loginSchema : registerSchema),
  });

  useEffect(() => {
    reset();
  }, [isLogin, reset]);

  const onSubmit = async (data: AuthFormData) => {
    if (isLogin) {
      login({ email: data.email, password: data.password });
    } else {
      registerUser(data as IUserSignUp);
    }
  };

  useEffect(() => {
    if (loginError) {
      toast.error(t("loginError"));
    }
    if (registerError) {
      toast.error(t("registerError"));
    }
  }, [loginError, registerError, toast, t]);

  return (
    <Container maxWidth="xs" sx={{ pt: 8 }}>
      <Box sx={{ p: 3, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h5" align="center" gutterBottom>
          {isLogin ? t("signInTitle") : t("signUpTitle")}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            {!isLogin && (
              <>
                <TextField
                  fullWidth
                  label={t("firstName")}
                  {...register("first_name")}
                  error={!!errors.first_name}
                  helperText={errors.first_name?.message}
                />
                <TextField
                  fullWidth
                  label={t("lastName")}
                  {...register("last_name")}
                  error={!!errors.last_name}
                  helperText={errors.last_name?.message}
                />
              </>
            )}
            <TextField
              fullWidth
              label={t("email")}
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              fullWidth
              label={t("password")}
              type="password"
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
            <Button fullWidth variant="contained" color="primary" type="submit">
              {isLogin ? t("signInBtn") : t("signUpBtn")}
            </Button>
          </Stack>
        </form>
        <Stack spacing={2} sx={{ pt: 2 }}>
          <Typography
            align="center"
            sx={{ cursor: "pointer" }}
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? t("signInQuestion") : t("signUpQuestion")}
          </Typography>
          <Auth0Button />
        </Stack>
      </Box>
    </Container>
  );
};
