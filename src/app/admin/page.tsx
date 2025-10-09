import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { AdminPanel } from "@/components/admin/AdminPanel";

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations("company");

  return {
    title: t("titleCompanies"),
  };
};

const AdminPage = () => {
  return <AdminPanel />;
};

export default AdminPage;
