import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { OrderList } from "@/components/admin/orders";

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations("order");

  return {
    title: t("titleOrders"),
  };
};

const OrdersPage = () => {
  return <OrderList />;
};

export default OrdersPage;
