import { ReactNode } from "react";
import { Typography, Card, CardContent, Avatar } from "@mui/material";
import Grid from "@mui/material/Grid2";

import { useTranslations } from "next-intl";

type Props = {
  icon: ReactNode;
  iconColor: string;
  title: string;
  description: string;
};

export const AboutCard = ({ icon, iconColor, title, description }: Props) => {
  const t = useTranslations("about");

  return (
    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
      <Card
        sx={{
          textAlign: "center",
          p: 2,
          height: "100%",
          borderRadius: 4,
          boxShadow: 3,
          transition: "transform 0.3s ease",
          "&:hover": { transform: "translateY(-6px)" },
        }}
      >
        <CardContent>
          <Avatar
            sx={{
              bgcolor: iconColor,
              width: 64,
              height: 64,
              mx: "auto",
              mb: 2,
            }}
          >
            {icon}
          </Avatar>
          <Typography variant="h6" gutterBottom>
            {t(title)}
          </Typography>
          <Typography color="text.secondary">{t(description)}</Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};
