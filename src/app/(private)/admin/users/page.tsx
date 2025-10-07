import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { UserList } from "@/components/user";

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations("user");

  return {
    title: t("titleUsers"),
  };
};

const UsersPage = () => {
  return <UserList />;
};

export default UsersPage;
