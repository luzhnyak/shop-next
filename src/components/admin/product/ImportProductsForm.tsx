import { useState } from "react";
import { Typography, Box, Button, Stack } from "@mui/material";
import { useTranslations } from "next-intl";

export const ImportProductsForm = ({
  setIsOpenModal,
}: {
  setIsOpenModal: (v: boolean) => void;
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const t = useTranslations();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    if (!selected.name.endsWith(".xlsx")) {
      setError("Підтримується лише формат .xlsx");
      return;
    }

    if (selected.size > 5 * 1024 * 1024) {
      setError("Файл занадто великий (макс. 5 МБ)");
      return;
    }

    setError(null);
    setFile(selected);
  };

  const handleImport = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}products/import`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (res.ok) {
      setIsOpenModal(false);
    } else {
      setError("Помилка імпорту файлу");
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {t("product.importTitle")}
      </Typography>
      <input type="file" accept=".xlsx" onChange={handleFileChange} />
      {error && <Typography color="error">{error}</Typography>}
      <Stack direction="row" spacing={2} justifyContent="end">
        <Button variant="contained" onClick={handleImport} disabled={!file}>
          {t("actions.btnImport")}
        </Button>
        <Button variant="outlined" onClick={() => setIsOpenModal(false)}>
          {t("actions.btnCancel")}
        </Button>
      </Stack>
    </Box>
  );
};
