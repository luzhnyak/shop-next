"use client";

import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { Typography, Box } from "@mui/material";
import { Delete, Edit, Visibility } from "@mui/icons-material";

import { ColorBtn, IUser, Routes } from "@/types";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from "@/redux/users/usersApi";
import { useUpdateSearchParams } from "@/hooks/updateSearchParams";
import { CustomTable } from "@/components/ui/CustomTable";
import { CustomTablePagination } from "@/components/ui/CustomTablePagination";
import { Action } from "@/components/ui/TableActionsBtn";
import { Modal } from "../ui/Modal/Modal";
import { useState } from "react";
import { UserEditForm } from "./UserEditForm";

export const UserList = () => {
  const searchParams = useSearchParams();
  const updateSearchParams = useUpdateSearchParams();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [userId, setUserId] = useState<number>(0);

  const page = Number(searchParams.get("page")) || 1;
  const rowsPerPage = Number(searchParams.get("rowsPerPage")) || 10;

  const { data } = useGetUsersQuery({
    skip: (page - 1) * rowsPerPage,
    limit: rowsPerPage,
  });
  const [deleteUser] = useDeleteUserMutation();

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
    {
      key: "editCategoryBtn",
      icon: <Edit />,
      color: ColorBtn.PRIMARY,
      onClick: (category) => {
        setUserId(category.id);
        setIsCreateModalOpen(true);
      },
    },
    {
      key: "deleteCategoryBtn",
      icon: <Delete />,
      color: ColorBtn.ERROR,
      onClick: (category) => {
        deleteUser(category.id);
      },
      confirm: {
        title: t("dialog.deleteConfirmTitle"),
        description: t("dialog.deleteUserConfirmMessage"),
      },
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
      <Modal
        isOpenModal={isCreateModalOpen}
        setOpenModal={setIsCreateModalOpen}
      >
        {Boolean(userId) ? (
          <UserEditForm
            userId={userId}
            initialData={data?.items.find((u) => u.id === userId)}
            setIsOpenModal={setIsCreateModalOpen}
          />
        ) : (
          <UserEditForm setIsOpenModal={setIsCreateModalOpen} />
        )}
      </Modal>
    </Box>
  );
};
