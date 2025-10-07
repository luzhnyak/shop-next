"use client";

import { notFound, useParams, usePathname } from "next/navigation";

import { selectCurrentUser } from "@/redux/auth/authSelectors";
import { useSelector } from "react-redux";
import { useTranslations } from "next-intl";
import { ReactNode, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { Card, CardContent, Typography, Box, Tab, Tabs } from "@mui/material";

import { useGetCompanyByIdQuery } from "@/redux/products/productsApi";
import { CompanyActionsBtn, CompanyEditBtn } from "@/components/product";

import { Quiz, Group, AdminPanelSettings } from "@mui/icons-material";
import Link from "next/link";
import { Routes } from "@/types";
import { CompanyContext } from "@/context/CompanyContext";

type Props = {
  children: ReactNode;
};

export const CompanyProfile = ({ children }: Props) => {
  const params = useParams();
  const companyId = Number(params.companyId);

  const pathname = usePathname();
  const currentTab = pathname.endsWith("/invites")
    ? 1
    : pathname.endsWith("/quizzes")
    ? 2
    : 0;

  const [value, setValue] = useState<number>(currentTab);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  if (isNaN(companyId)) {
    notFound();
  }

  const { data: company, error } = useGetCompanyByIdQuery(companyId);
  const currentUser = useSelector(selectCurrentUser)!;
  const isOwner = currentUser.id === company?.owner_id;

  const t = useTranslations();

  useEffect(() => {
    if (error) toast.error(t("company.errorLoadingCompany"));
  }, [error, t, toast]);

  if (!company)
    return (
      <Typography align="center">{t("company.companyNotFound")}</Typography>
    );

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        {t("company.titleCompany")}
      </Typography>
      <Card sx={{ maxWidth: 400, mx: "auto", p: 2, textAlign: "center" }}>
        <CardContent>
          <Typography variant="h5">{company.name}</Typography>
          <Typography variant="body1" color="text.secondary">
            {company.description}
          </Typography>
          {isOwner && <CompanyEditBtn company={company} />}
          {!isOwner && (
            <CompanyActionsBtn companyId={company.id} userId={currentUser.id} />
          )}
        </CardContent>
      </Card>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab
              icon={<Group />}
              label={t("company.tabMembers")}
              component={Link}
              href={`${Routes.COMPANIES}/${company.id}`}
            />
            <Tab
              icon={<AdminPanelSettings />}
              label={t("company.tabInvites")}
              component={Link}
              href={`${Routes.COMPANIES}/${company.id}/invites`}
            />
            <Tab
              icon={<Quiz />}
              label={t("company.tabQuizzes")}
              component={Link}
              href={`${Routes.COMPANIES}/${company.id}/quizzes`}
            />
          </Tabs>
        </Box>
        <Box sx={{ pt: 2 }}>
          <CompanyContext.Provider
            value={{ company, companyId, currentUser, isOwner }}
          >
            {children}
          </CompanyContext.Provider>
        </Box>
      </Box>
    </Box>
  );
};
