"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CustomTable } from "../ui/CustomTable";
import { useTranslations } from "next-intl";
import { Typography, Box, Button } from "@mui/material";
import { Add, Delete, Edit, Visibility } from "@mui/icons-material";

import { ColorBtn, ICategory, Routes } from "@/types";
import {
  useGetCategoriesQuery,
  useDeleteCategoryMutation,
} from "@/redux/categories/categoriesApi";
import { useUpdateSearchParams } from "@/hooks/updateSearchParams";
import { CustomTablePagination } from "@/components/ui/CustomTablePagination";
import { Modal } from "@/components/ui/Modal/Modal";
import { Action } from "@/components/ui/TableActionsBtn";
import { CategoryEditForm } from "./CategoryEditForm";

export const CategoryList = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [categoryId, setCategoryId] = useState<number>(0);

  const searchParams = useSearchParams();
  const updateSearchParams = useUpdateSearchParams();

  const page = Number(searchParams.get("page")) || 1;
  const rowsPerPage = Number(searchParams.get("rowsPerPage")) || 10;

  const { data } = useGetCategoriesQuery({
    skip: (page - 1) * rowsPerPage,
    limit: rowsPerPage,
  });
  const [deleteCategory] = useDeleteCategoryMutation();

  const t = useTranslations();
  const router = useRouter();

  const columns: { id: keyof ICategory; label: string }[] = [
    { id: "id", label: "ID" },
    { id: "name", label: t("category.name") },
    { id: "description", label: t("category.description") },
  ];

  const actions: Action<ICategory>[] = [
    {
      key: "editCategoryBtn",
      icon: <Edit />,
      color: ColorBtn.PRIMARY,
      onClick: (category) => {
        setCategoryId(category.id);
        setIsCreateModalOpen(true);
      },
    },
    {
      key: "deleteCategoryBtn",
      icon: <Delete />,
      color: ColorBtn.ERROR,
      onClick: (category) => {
        deleteCategory(category.id);
      },
      confirm: {
        title: t("dialog.deleteConfirmTitle"),
        description: t("dialog.deleteUserConfirmMessage"),
      },
    },
  ];

  const handleCreate = () => {
    setIsCreateModalOpen(true);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        {t("category.titleCategories")}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<Add />}
        onClick={handleCreate}
      >
        {t("actions.btnCreate")}
      </Button>
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
        {Boolean(categoryId) ? (
          <CategoryEditForm
            categoryId={categoryId}
            initialData={data?.items.find((c) => c.id === categoryId)}
            setIsOpenModal={setIsCreateModalOpen}
          />
        ) : (
          <CategoryEditForm setIsOpenModal={setIsCreateModalOpen} />
        )}
      </Modal>
    </Box>
  );
};
