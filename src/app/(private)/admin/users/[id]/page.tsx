import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { UserDetails } from "@/components/user";

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations("user");

  return {
    title: t("titleUser"),
  };
};

const UserPage = () => {
  return <UserDetails />;
};

export default UserPage;
