"use client";

import { Button, Link } from "@mui/material";
import { useTranslations } from "next-intl";

export const Auth0Button = () => {
  const t = useTranslations("auth");

  return (
    <Button
      fullWidth
      variant="contained"
      color="primary"
      component={Link}
      href="/api/auth/login"
    >
      {t("auth0Btn")}
    </Button>
  );
};
