"use client";

import { setUserLocale } from "@/services/locale";
import { useLocale } from "next-intl";
import { Locale } from "@/i18n/config";
import {
  MenuItem,
  Select,
  SelectChangeEvent,
  Box,
  Typography,
  Stack,
} from "@mui/material";
import Image from "next/image";
import { Locales } from "@/types";

const flags: Record<Locale, string> = {
  en: "/images/flags/gb.png",
  uk: "/images/flags/ua.png",
};

export const LanguageSwitcher = () => {
  const locale = useLocale();

  const changeLanguage = (event: SelectChangeEvent) => {
    setUserLocale(event.target.value as Locale);
  };

  return (
    <Select
      value={locale}
      onChange={changeLanguage}
      variant="standard"
      disableUnderline
      displayEmpty
      sx={{ border: "none" }}
    >
      {Object.entries(flags).map(([lang, flag]) => (
        <MenuItem key={lang} value={lang}>
          <Stack
            direction={"row"}
            spacing={1}
            alignItems={"center"}
            sx={{ height: 30 }}
          >
            <Image src={flag} alt={lang} width={20} height={14} />
            <Typography
              sx={{
                display: { xs: "none", sm: "flex" },
              }}
            >
              {lang === Locales.EN ? "English" : "Українська"}
            </Typography>
          </Stack>
        </MenuItem>
      ))}
    </Select>
  );
};
