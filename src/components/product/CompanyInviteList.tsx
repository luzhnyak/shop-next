"use client";

import { useState } from "react";
import { CustomTable } from "../ui/CustomTable";
import { useTranslations } from "next-intl";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Visibility, Cancel } from "@mui/icons-material";

import { ColorBtn, IMembership, MembershipStatus, Routes } from "@/types";
import { CustomTablePagination } from "../ui/CustomTablePagination";
import {
  useCancelInviteMutation,
  useGetCompanyMembersQuery,
} from "@/redux/memberships/membershipsApi";
import { useRouter } from "next/navigation";
import { Action } from "../ui/TableActionsBtn";
import { useCompanyContext } from "@/context/CompanyContext";

export const CompanyInviteList = () => {
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const { companyId } = useCompanyContext();

  const { data } = useGetCompanyMembersQuery({
    id: companyId,
    role: MembershipStatus.PENDING_INVITE,
    skip: (page - 1) * rowsPerPage,
    limit: rowsPerPage,
  });
  const [cancelInvite] = useCancelInviteMutation();

  const t = useTranslations();
  const router = useRouter();

  const columns: { id: keyof IMembership; label: string }[] = [
    { id: "id", label: "ID" },
    { id: "name", label: t("user.firstName") },
  ];

  const actions: Action<IMembership>[] = [
    {
      key: "viewUserBtn",
      icon: <Visibility />,
      color: ColorBtn.PRIMARY,
      onClick: (membership) =>
        router.push(`${Routes.USERS}/${membership.user_id}`),
    },
    {
      key: "cancelUserBtn",
      icon: <Cancel />,
      color: ColorBtn.ERROR,
      onClick: (membership) => {
        cancelInvite(membership.id);
      },
      confirm: {
        title: t("dialog.cancelConfirmTitle"),
        description: t("dialog.cancelInviteConfirmMessage"),
      },
    },
  ];

  return (
    <Box sx={{ pt: 3 }}>
      <Typography variant="h5" gutterBottom>
        {t("company.titleInvitations")}
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
