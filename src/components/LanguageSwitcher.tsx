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
      sx={{ minWidth: 130, border: "none" }}
    >
      {Object.entries(flags).map(([lang, flag]) => (
        <MenuItem key={lang} value={lang}>
          <Box display="flex" alignItems="center">
            <Image
              src={flag}
              alt={lang}
              width={20}
              height={14}
              style={{ marginRight: 8 }}
            />
            <Typography>
              {lang === Locales.EN ? "English" : "Українська"}
            </Typography>
          </Box>
        </MenuItem>
      ))}
    </Select>
  );
};
