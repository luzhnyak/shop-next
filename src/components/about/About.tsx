"use client";

import { Box, Typography, Container } from "@mui/material";
import Grid from "@mui/material/Grid2";

import { Build, Handyman, DesignServices } from "@mui/icons-material";
import { useTranslations } from "next-intl";
import { AboutCard } from "./AboutCard";

const AboutCards = [
  {
    icon: <DesignServices />,
    iconColor: "primary.main",
    title: "card1Title",
    description: "card1Description",
  },
  {
    icon: <Build />,
    iconColor: "secondary.main",
    title: "card2Title",
    description: "card2Description",
  },
  {
    icon: <Handyman />,
    iconColor: "success.main",
    title: "card3Title",
    description: "card3Description",
  },
];

export const About = () => {
  const t = useTranslations("about");

  return (
    <Box sx={{ bgcolor: "background.default", py: { xs: 6, md: 10 } }}>
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          component="h1"
          align="center"
          sx={{
            mb: 4,
            fontWeight: "bold",
          }}
        >
          {t("title")}
        </Typography>

        <Typography
          variant="h6"
          align="center"
          color="text.secondary"
          sx={{ mb: 6, maxWidth: "800px", mx: "auto" }}
        >
          {t("description")}
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {AboutCards.map((card, index) => (
            <AboutCard
              title={card.title}
              description={card.description}
              icon={card.icon}
              iconColor={card.iconColor}
              key={index}
            />
          ))}
        </Grid>
      </Container>
    </Box>
  );
};
