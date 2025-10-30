import { useState } from "react";
import { Typography, Box, Button, Stack } from "@mui/material";
import { useTranslations } from "next-intl";

export const ExportProductsForm = ({
  setIsOpenModal,
}: {
  setIsOpenModal: (v: boolean) => void;
}) => {
  const t = useTranslations();

  const handleExport = () => {
    window.open(`${process.env.NEXT_PUBLIC_API_URL}products/export`, "_blank");
    setIsOpenModal(false);
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {t("product.exportTitle")}
      </Typography>
      <Typography variant="body2" sx={{ mb: 2 }}>
        Завантажити всі продукти у форматі Excel.
      </Typography>
      <Stack direction="row" spacing={2} justifyContent="end">
        <Button variant="contained" color="success" onClick={handleExport}>
          {t("actions.btnDownload")}
        </Button>
        <Button variant="outlined" onClick={() => setIsOpenModal(false)}>
          {t("actions.btnCancel")}
        </Button>
      </Stack>
    </Box>
  );
};
