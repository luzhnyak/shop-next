import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { UserProfile } from "@/components/admin/user";

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations("user");

  return {
    title: t("titleUser"),
  };
};

const ProfilePage = () => {
  return <UserProfile />;
};

export default ProfilePage;
