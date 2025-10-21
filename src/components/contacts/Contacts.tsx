import { Box, Typography, Stack, Paper, Divider } from "@mui/material";
import { Email, Phone, LocationOn, AccessTime } from "@mui/icons-material";

import { useTranslations } from "next-intl";
import { ContactItem } from "./ContactItem";
import { FeedbackForm } from "./FeedbackForm";

const ContactsItems = [
  {
    icon: <LocationOn />,
    title: "locationTitle",
    link: "",
    text: "locationText",
  },
  {
    icon: <Phone />,
    title: "phoneTitle",
    link: "+380971234567",
    text: "phoneText",
  },
  {
    icon: <Email />,
    title: "emailTitle",
    link: "info@mebel-shop.ua",
    text: "emailText",
  },
  {
    icon: <AccessTime />,
    title: "scheduleTitle",
    link: "",
    text: "scheduleText",
  },
];

export const Contacts = () => {
  const t = useTranslations("contacts");

  return (
    <Box
      sx={{
        py: 6,
        px: { xs: 2, md: 6 },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        bgcolor: "background.default",
      }}
    >
      <Typography variant="h4" fontWeight={600} gutterBottom>
        {t("title")}
      </Typography>

      <Typography
        variant="subtitle1"
        color="text.secondary"
        textAlign="center"
        mb={4}
      >
        {t("subtitle")}
      </Typography>

      <Paper
        elevation={2}
        sx={{
          width: "100%",
          maxWidth: 800,
          p: { xs: 3, md: 4 },
          borderRadius: 3,
          mb: 4,
        }}
      >
        <Stack
          spacing={3}
          divider={<Divider flexItem />}
          sx={{
            "& svg": {
              color: "primary.main",
              mr: 1.5,
              flexShrink: 0,
            },
          }}
        >
          {ContactsItems.map(({ icon, title, link, text }) => (
            <ContactItem
              key={title}
              icon={icon}
              title={t(title)}
              link={link}
              text={t(text)}
            />
          ))}
        </Stack>
      </Paper>
      <Box
        sx={{
          width: "100%",
          maxWidth: 800,
          borderRadius: 3,
          overflow: "hidden",
          mb: 5,
        }}
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2539.911751209642!2d30.5234!3d50.4501!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4ce5654a9e8a9%3A0x9dbd02e1b0d0b6f0!2z0JrQuNGX0LIsINCa0LjRl9CyLCDQutC-0YDQvNC-0L3RgdGM0LrQsCDQvtCx0LvQsNGB0YLRjCwgMDAxMDA!5e0!3m2!1suk!2sua!4v1695928992041!5m2!1suk!2sua"
          width="100%"
          height="300"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </Box>

      {/* 📬 Форма зворотного зв’язку */}
      <FeedbackForm />
    </Box>
  );
};
