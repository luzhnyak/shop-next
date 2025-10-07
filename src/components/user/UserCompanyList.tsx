"use client";

import { useState } from "react";
import { CustomTable } from "../ui/CustomTable";
import { useTranslations } from "next-intl";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Visibility, Cancel } from "@mui/icons-material";

import { ColorBtn, IMembership, Routes } from "@/types";
import { CustomTablePagination } from "../ui/CustomTablePagination";
import {
  useGetUserCompaniesQuery,
  useLeaveCompanyMutation,
} from "@/redux/memberships/membershipsApi";
import { useRouter } from "next/navigation";

import { selectCurrentUser } from "@/redux/auth/authSelectors";
import { useSelector } from "react-redux";
import { Action } from "../ui/TableActionsBtn";

type Props = {
  userId: number;
};

export const UserCompanyList = ({ userId }: Props) => {
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const currentUser = useSelector(selectCurrentUser);
  const { data } = useGetUserCompaniesQuery({
    id: userId,
    skip: (page - 1) * rowsPerPage,
    limit: rowsPerPage,
  });
  const [leaveCompany] = useLeaveCompanyMutation();

  const t = useTranslations();
  const router = useRouter();

  const columns: { id: keyof IMembership; label: string }[] = [
    { id: "id", label: "ID" },
    { id: "name", label: t("company.name") },
  ];

  const actions: Action<IMembership>[] = [
    {
      key: "viewUserBtn",
      icon: <Visibility />,
      color: ColorBtn.PRIMARY,
      onClick: (membership) =>
        router.push(`${Routes.COMPANIES}/${membership.company_id}`),
    },
    {
      key: "leaveUserBtn",
      icon: <Cancel />,
      color: ColorBtn.ERROR,
      onClick: (membership) => {
        if (currentUser) {
          leaveCompany(membership.id);
        }
      },
      confirm: {
        title: t("dialog.leaveConfirmTitle"),
        description: t("dialog.leaveCompanyConfirmMessage"),
      },
    },
  ];

  return (
    <Box sx={{ pt: 3 }}>
      <Typography variant="h5" gutterBottom>
        {t("company.titleCompanies")}
      </Typography>
      <CustomTable
        columns={columns}
        items={data?.items || []}
        actions={actions}
      />
      <CustomTablePagination
        total={data?.total || 0}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={setPage}
        onRowsPerPageChange={setRowsPerPage}
      />
    </Box>
  );
};
