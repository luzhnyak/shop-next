import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { Typography } from "@mui/material";

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations("order");

  return {
    title: t("titleOrders"),
  };
};

const OrdersPage = () => {
  return <Typography>Orders Page</Typography>;
};

export default OrdersPage;
