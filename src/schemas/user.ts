import * as yup from "yup";
import { useTranslations } from "next-intl";
import { useMemo } from "react";

export const useUserUpdateSchema = () => {
  const t = useTranslations("auth");

  const schema = useMemo(
    () =>
      yup.object().shape({
        first_name: yup.string().required(t("validationFirstNameRequired")),
        last_name: yup.string().required(t("validationLastNameRequired")),
        password: yup
          .string()
          .required(t("validationPasswordRequired"))
          .min(6, t("validationPasswordMinLength", { min: 6 })),
      }),
    [t]
  );

  return schema;
};
