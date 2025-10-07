"use client";

import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { Typography, Box } from "@mui/material";
import { Visibility } from "@mui/icons-material";

import { ColorBtn, IUser, Routes } from "@/types";
import { useGetUsersQuery } from "@/redux/users/usersApi";
import { useUpdateSearchParams } from "@/hooks/updateSearchParams";
import { CustomTable } from "@/components/ui/CustomTable";
import { CustomTablePagination } from "@/components/ui/CustomTablePagination";
import { Action } from "@/components/ui/TableActionsBtn";

export const UserList = () => {
  const searchParams = useSearchParams();
  const updateSearchParams = useUpdateSearchParams();

  const page = Number(searchParams.get("page")) || 1;
  const rowsPerPage = Number(searchParams.get("rowsPerPage")) || 10;

  const { data } = useGetUsersQuery({
    skip: (page - 1) * rowsPerPage,
    limit: rowsPerPage,
  });

  const t = useTranslations();
  const router = useRouter();

  const columns: { id: keyof IUser; label: string }[] = [
    { id: "id", label: "ID" },
    { id: "first_name", label: t("user.firstName") },
    { id: "last_name", label: t("user.lastName") },
    { id: "email", label: t("user.email") },
  ];

  const actions: Action<IUser>[] = [
    {
      key: "viewUserBtn",
      icon: <Visibility />,
      color: ColorBtn.PRIMARY,
      onClick: (user) => router.push(`${Routes.USERS}/${user.id}`),
    },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        {t("user.titleUsers")}
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
        onPageChange={(newPage) => updateSearchParams({ page: newPage })}
        onRowsPerPageChange={(newRows) =>
          updateSearchParams({ rowsPerPage: newRows, page: 1 })
        }
      />
    </Box>
  );
};
