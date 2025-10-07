import * as yup from "yup";
import { useTranslations } from "next-intl";
import { useMemo } from "react";

export const useLoginSchema = () => {
  const t = useTranslations("auth");

  const schema = useMemo(
    () =>
      yup.object().shape({
        email: yup
          .string()
          .email(t("validationEmailInvalid"))
          .required(t("validationEmailRequired")),
        password: yup
          .string()
          .min(6, t("validationPasswordMinLength", { min: 6 }))
          .required(t("validationPasswordRequired")),
      }),
    [t]
  );

  return schema;
};

export const useRegisterSchema = () => {
  const t = useTranslations("auth");

  const schema = useMemo(
    () =>
      yup.object().shape({
        first_name: yup.string().required(t("validationFirstNameRequired")),
        last_name: yup.string().required(t("validationLastNameRequired")),
        email: yup
          .string()
          .email(t("validationEmailInvalid"))
          .required(t("validationEmailRequired")),
        password: yup
          .string()
          .min(6, t("validationPasswordMinLength", { min: 6 }))
          .required(t("validationPasswordRequired")),
      }),
    [t]
  );

  return schema;
};
