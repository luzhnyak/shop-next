"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Visibility, Cancel } from "@mui/icons-material";

import { ColorBtn, IMembership, MembershipStatus, Routes } from "@/types";
import { CustomTable } from "../ui/CustomTable";
import { CustomTablePagination } from "../ui/CustomTablePagination";
import {
  useCancelRequestMutation,
  useGetUserCompaniesQuery,
} from "@/redux/memberships/membershipsApi";
import { Action } from "../ui/TableActionsBtn";

type Props = {
  userId: number;
};

export const UserRequestList = ({ userId }: Props) => {
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const { data } = useGetUserCompaniesQuery({
    id: userId,
    role: MembershipStatus.PENDING_REQUEST,
    skip: (page - 1) * rowsPerPage,
    limit: rowsPerPage,
  });
  const [cancelRequest] = useCancelRequestMutation();

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
      key: "cancelCompanyBtn",
      icon: <Cancel />,
      color: ColorBtn.ERROR,
      onClick: (membership) => {
        cancelRequest(membership.id);
      },
      confirm: {
        title: t("dialog.cancelConfirmTitle"),
        description: t("dialog.cancelRequestConfirmMessage"),
      },
    },
  ];

  return (
    <Box sx={{ pt: 3 }}>
      <Typography variant="h5" gutterBottom>
        {t("company.titleRequests")}
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
