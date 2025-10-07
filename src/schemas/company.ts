import * as yup from "yup";
import { useTranslations } from "next-intl";
import { useMemo } from "react";

export const useCompanySchema = () => {
  const t = useTranslations("company");

  const schema = useMemo(
    () =>
      yup.object().shape({
        name: yup.string().required(t("validationNameRequired")),
        description: yup.string().required(t("validationDescriptionRequired")),
      }),
    [t]
  );

  return schema;
};
