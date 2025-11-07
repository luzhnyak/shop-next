import * as yup from "yup";
import { useTranslations } from "next-intl";
import { useMemo } from "react";

export const useOrderSchema = () => {
  const t = useTranslations("order");

  const schema = useMemo(
    () =>
      yup.object().shape({
        user_id: yup.number().required(t("validationUserIdRequired")),
        address_id: yup.number().required(t("validationAddressIdRequired")),
        status: yup.string().required(t("validationStatusRequired")),
      }),
    [t]
  );

  return schema;
};
