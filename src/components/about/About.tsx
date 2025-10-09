import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTranslations } from "next-intl";

export const About = () => {
  const t = useTranslations("about");

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        {t("title")}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {t("description")}
      </Typography>
    </Box>
  );
};
