import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Catalog } from "@/components/catalog/Catalog";
import { SearchParams } from "@/types";

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations("catalog");

  return {
    title: t("title"),
    description: t("description"),
  };
};

type Props = {
  searchParams: SearchParams;
};

const CatalogPage = async ({ searchParams }: Props) => {
  const params = await searchParams;

  const page = params?.page ? Number(params.page) : 1;
  const limit = params?.limit ? Number(params.limit) : 10;

  return <Catalog page={page} limit={limit} />;
};

export default CatalogPage;
