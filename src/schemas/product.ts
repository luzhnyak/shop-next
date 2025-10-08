import * as yup from "yup";
import { useTranslations } from "next-intl";
import { useMemo } from "react";

export const useProductSchema = () => {
  const t = useTranslations("product");

  const schema = useMemo(
    () =>
      yup.object().shape({
        name: yup.string().required(t("validationNameRequired")),
        description: yup.string().required(t("validationDescriptionRequired")),
        base_price: yup
          .number()
          .typeError(t("validationBasePriceNumber"))
          .required(t("validationBasePriceRequired")),
        sku: yup.string().required(t("validationSkuRequired")),
        stock_quantity: yup
          .number()
          .typeError(t("validationStockQuantityNumber"))
          .required(t("validationStockQuantityRequired")),
        category_id: yup.number().required(t("validationCategoryIdRequired")),
      }),
    [t]
  );

  return schema;
};
