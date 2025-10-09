import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { Hello } from "@/components/home/Hello";

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations("hello");

  return {
    title: t("title"),
    description: t("message"),
  };
};

const HomePage = () => {
  return <Hello />;
};

export default HomePage;
