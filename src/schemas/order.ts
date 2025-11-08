import * as yup from "yup";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { OrderStatusEnum } from "@/types";

export const useOrderSchema = () => {
  const t = useTranslations("order");

  const schema = useMemo(
    () =>
      yup.object().shape({
        user_id: yup.number().required(t("validationUserIdRequired")),
        address_id: yup.number().required(t("validationAddressIdRequired")),
        status: yup
          .mixed<OrderStatusEnum>()
          .oneOf(Object.values(OrderStatusEnum), t("validationStatusInvalid"))
          .required(t("validationStatusRequired")),
      }),
    [t]
  );

  return schema;
};
