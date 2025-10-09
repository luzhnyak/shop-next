"use client";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useSelector } from "react-redux";

import { selectIsLoggedIn } from "@/redux/auth/authSelectors";
import { useHealthcheck } from "@/hooks/useHealthcheck";
import { Routes } from "@/types";
import Link from "next/link";

export const Hello = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const healthcheck = useHealthcheck();

  const t = useTranslations("hello");

  return (
    <Box sx={{ pt: 20 }}>
      <Typography variant="h4" gutterBottom>
        {t("title")}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {t("message")}
      </Typography>
      <Stack spacing={2} alignItems={"center"}>
        {!isLoggedIn && (
          <Button
            variant="contained"
            color="primary"
            component={Link}
            href={Routes.SIGN_IN}
          >
            {t("authBtn")}
          </Button>
        )}
        <Button variant="contained" color="primary" onClick={healthcheck}>
          {t("healthcheckBtn")}
        </Button>
      </Stack>
    </Box>
  );
};
