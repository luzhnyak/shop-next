"use client";

import { Switch, FormControlLabel } from "@mui/material";
import { useUpdateCompanyVisibilityMutation } from "@/redux/products/productsApi";
import { useTranslations } from "next-intl";

interface Props {
  companyId: number;
  currentVisibility: boolean;
}

export const CompanyVisibilityToggle = ({
  companyId,
  currentVisibility,
}: Props) => {
  const [updateVisibility, { isLoading }] =
    useUpdateCompanyVisibilityMutation();

  const handleToggle = async () => {
    await updateVisibility({ id: companyId, visibility: !currentVisibility });
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
      label={t("company.visibility")}
    />
  );
};
