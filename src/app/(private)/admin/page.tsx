import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { AdminPanel } from "@/components/admin/AdminPanel";

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations("admin");

  return {
    title: t("titleAdminPanel"),
  };
};

const AdminPanelPage = () => {
  return <AdminPanel />;
};

export default AdminPanelPage;
