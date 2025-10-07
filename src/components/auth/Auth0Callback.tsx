"use client";

import { useEffect } from "react";
import { resetAuthData } from "@/redux/auth/authSlice";
import { useDispatch } from "react-redux";
import { Routes } from "@/types";
import { useRouter } from "next/navigation";
import Typography from "@mui/material/Typography";
import { useTranslations } from "next-intl";

import { useAuth0LoginMutation } from "@/redux/auth/authApi";
import { toast } from "react-toastify";

export const Auth0Callback = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [auth0Login, { error }] = useAuth0LoginMutation();
  const t = useTranslations("auth");

  const urlParams = new URLSearchParams(window.location.hash.substring(1));
  const token = urlParams.get("access_token");

  useEffect(() => {
    auth0Login({ token: token! });
  }, [dispatch, token, auth0Login]);

  useEffect(() => {
    if (error) {
      toast.error(t("auth0Error"));
      dispatch(resetAuthData());
      router.replace(Routes.SIGN_IN);
    }
  }, [error, dispatch, router, toast, t]);

  return (
    <Typography variant="body1" sx={{ pt: 2 }}>
      {t("auth0Processing")}
    </Typography>
  );
};
