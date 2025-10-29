"use client";

import { Switch, FormControlLabel } from "@mui/material";
import { useUpdateProductVisibilityMutation } from "@/redux/products/productsApi";
import { useTranslations } from "next-intl";

interface Props {
  productId: number;
  currentVisibility: boolean;
}

export const ProductVisibilityToggle = ({
  productId,
  currentVisibility,
}: Props) => {
  const [updateVisibility, { isLoading }] =
    useUpdateProductVisibilityMutation();

  const handleToggle = async () => {
    await updateVisibility({ id: productId, visibility: !currentVisibility });
  };

  const t = useTranslations();

  return (
    <FormControlLabel
      control={
        <Switch
          checked={currentVisibility}
          onChange={handleToggle}
          disabled={isLoading}
        />
      }
      label={t("product.visibility")}
    />
  );
};
