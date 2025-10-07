import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { About } from "@/components/About";

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations("about");

  return {
    title: t("title"),
    description: t("description"),
  };
};

const AboutPage = () => {
  return <About />;
};

export default AboutPage;
