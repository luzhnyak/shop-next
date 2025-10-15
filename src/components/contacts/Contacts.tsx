"use client";

import {
  Box,
  Typography,
  Stack,
  Link,
  Paper,
  Divider,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import {
  Email,
  Phone,
  LocationOn,
  AccessTime,
  Send,
} from "@mui/icons-material";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { useTranslations } from "next-intl";

interface ContactFormInputs {
  name: string;
  email: string;
  message: string;
}

export const Contacts = () => {
  const t = useTranslations("contacts");
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormInputs>();

  const onSubmit: SubmitHandler<ContactFormInputs> = async (data) => {
    try {
      // 🔹 Імітація запиту до API (можна замінити на справжній ендпоінт)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("📨 Відправлено повідомлення:", data);
      setSubmitted(true);
      reset();
    } catch (error) {
      console.error(error);
    }
  };

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
        Ми завжди раді вашим запитанням! Зв’яжіться з нами будь-яким зручним
        способом.
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
          <Stack direction="row" alignItems="center">
            <LocationOn />
            <Box>
              <Typography variant="h6">Наш офіс</Typography>
              <Typography variant="body2" color="text.secondary">
                м. Київ, вул. Прикладна, 10
              </Typography>
            </Box>
          </Stack>

          <Stack direction="row" alignItems="center">
            <Phone />
            <Box>
              <Typography variant="h6">Телефон</Typography>
              <Link
                href="tel:+380501234567"
                underline="none"
                color="text.secondary"
                sx={{ "&:hover": { color: "primary.main" } }}
              >
                +38 (050) 123 45 67
              </Link>
            </Box>
          </Stack>

          <Stack direction="row" alignItems="center">
            <Email />
            <Box>
              <Typography variant="h6">Email</Typography>
              <Link
                href="mailto:info@mebel-shop.ua"
                underline="none"
                color="text.secondary"
                sx={{ "&:hover": { color: "primary.main" } }}
              >
                info@mebel-shop.ua
              </Link>
            </Box>
          </Stack>

          <Stack direction="row" alignItems="center">
            <AccessTime />
            <Box>
              <Typography variant="h6">Графік роботи</Typography>
              <Typography variant="body2" color="text.secondary">
                Пн–Пт: 09:00–18:00
                <br />
                Сб–Нд: вихідні
              </Typography>
            </Box>
          </Stack>
        </Stack>
      </Paper>

      {/* 🌐 Google Карта */}
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
      <Paper
        elevation={2}
        sx={{
          width: "100%",
          maxWidth: 600,
          p: { xs: 3, md: 4 },
          borderRadius: 3,
        }}
      >
        <Typography variant="h5" fontWeight={600} mb={2}>
          Напишіть нам
        </Typography>

        {submitted && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Дякуємо! Ваше повідомлення надіслано.
          </Alert>
        )}

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            label="Ваше ім’я"
            variant="outlined"
            fullWidth
            {...register("name", { required: "Вкажіть ім’я" })}
            error={!!errors.name}
            helperText={errors.name?.message}
          />

          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            {...register("email", {
              required: "Вкажіть email",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Некоректний email",
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <TextField
            label="Повідомлення"
            variant="outlined"
            fullWidth
            multiline
            minRows={4}
            {...register("message", { required: "Введіть повідомлення" })}
            error={!!errors.message}
            helperText={errors.message?.message}
          />

          <Button
            type="submit"
            variant="contained"
            size="large"
            startIcon={<Send />}
          >
            Надіслати
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};
