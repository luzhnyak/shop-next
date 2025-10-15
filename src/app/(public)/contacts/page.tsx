import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { Contacts } from "@/components/contacts/Contacts";

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations("contacts");

  return {
    title: t("title"),
    description: t("description"),
  };
};

const ContactsPage = () => {
  return <Contacts />;
};

export default ContactsPage;
