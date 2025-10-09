import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { AuthForm } from "@/components/auth/AuthForm";

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations("auth");

  return {
    title: t("signInTitle"),
  };
};

const AuthPage = () => {
  return <AuthForm />;
};

export default AuthPage;
