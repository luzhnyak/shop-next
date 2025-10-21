"use client";

import { Send } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface ContactFormInputs {
  name: string;
  email: string;
  message: string;
}

export const FeedbackForm = () => {
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
  );
};
