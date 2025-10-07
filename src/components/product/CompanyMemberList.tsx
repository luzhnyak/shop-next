"use client";

import { useState } from "react";
import { CustomTable } from "../ui/CustomTable";
import { useTranslations } from "next-intl";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Add, Delete, Visibility } from "@mui/icons-material";

import { ColorBtn, IMembership, MembershipStatus, Routes } from "@/types";
import { CustomTablePagination } from "../ui/CustomTablePagination";
import {
  useGetCompanyMembersQuery,
  useAddToAdminMutation,
  useRemoveUserFromCompanyMutation,
} from "@/redux/memberships/membershipsApi";
import { useRouter } from "next/navigation";
import { Action } from "../ui/TableActionsBtn";
import { useCompanyContext } from "@/context/CompanyContext";

export const CompanyMemberList = () => {
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const { companyId, isOwner } = useCompanyContext();

  const { data } = useGetCompanyMembersQuery({
    id: companyId,
    role: MembershipStatus.MEMBER,
    skip: (page - 1) * rowsPerPage,
    limit: rowsPerPage,
  });

  const t = useTranslations();
  const router = useRouter();

  const columns: { id: keyof IMembership; label: string }[] = [
    { id: "id", label: "ID" },
    { id: "name", label: t("user.firstName") },
  ];
  const [removeUserFromCompany] = useRemoveUserFromCompanyMutation();
  const [addToAdmin] = useAddToAdminMutation();

  const actions: Action<IMembership>[] = [
    {
      key: "viewUserBtn",
      icon: <Visibility />,
      color: ColorBtn.PRIMARY,
      onClick: (membership) =>
        router.push(`${Routes.USERS}/${membership.user_id}`),
    },
    {
      key: "deleteUserBtn",
      icon: <Add />,
      color: ColorBtn.SECONDARY,
      onClick: (membership) => {
        addToAdmin(membership.id);
      },
      hide: !isOwner,
    },
    {
      key: "addAdminBtn",
      icon: <Delete />,
      color: ColorBtn.ERROR,
      onClick: (membership) => {
        removeUserFromCompany(membership.id);
      },
      confirm: {
        title: t("dialog.deleteConfirmTitle"),
        description: t("dialog.deleteUserConfirmMessage"),
      },
      hide: !isOwner,
    },
  ];

  return (
    <Box sx={{ pt: 3 }}>
      <Typography variant="h5" gutterBottom>
        {t("company.titleMembers")}
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
