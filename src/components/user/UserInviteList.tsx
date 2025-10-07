"use client";

import { useState } from "react";
import { CustomTable } from "../ui/CustomTable";
import { useTranslations } from "next-intl";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Visibility, Cancel, Done } from "@mui/icons-material";

import { ColorBtn, IMembership, MembershipStatus, Routes } from "@/types";
import { CustomTablePagination } from "../ui/CustomTablePagination";
import {
  useAcceptInviteMutation,
  useCancelInviteMutation,
  useGetUserCompaniesQuery,
} from "@/redux/memberships/membershipsApi";
import { useRouter } from "next/navigation";
import { Action } from "../ui/TableActionsBtn";

type Props = {
  userId: number;
};

export const UserInviteList = ({ userId }: Props) => {
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const { data } = useGetUserCompaniesQuery({
    id: userId,
    role: MembershipStatus.PENDING_INVITE,
    skip: (page - 1) * rowsPerPage,
    limit: rowsPerPage,
  });
  const [cancelInvite] = useCancelInviteMutation();
  const [acceptInvite] = useAcceptInviteMutation();

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
        router.push(`${Routes.USERS}/${membership.user_id}`),
    },
    {
      key: "acceptUserBtn",
      icon: <Done />,
      color: ColorBtn.SECONDARY,
      onClick: (membership) => acceptInvite(membership.id),
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
