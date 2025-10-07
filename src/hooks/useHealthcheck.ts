import { getHealthCheck } from "@/services/api";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";

export const useHealthcheck = () => {
  const t = useTranslations("hello");

  const healthcheck = async () => {
    try {
      await getHealthCheck();
      toast.success(t("healthcheckMessageSuccess"));
    } catch {
      toast.error(t("healthcheckMessageError"));
    }
  };

  return healthcheck;
};
