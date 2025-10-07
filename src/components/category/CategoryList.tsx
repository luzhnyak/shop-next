"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CustomTable } from "../ui/CustomTable";
import { useTranslations } from "next-intl";
import { Typography, Box, Button } from "@mui/material";
import { Add, Visibility } from "@mui/icons-material";

import { ColorBtn, ICategory, Routes } from "@/types";
import { useGetCategoriesQuery } from "@/redux/categories/categoriesApi";
import { useUpdateSearchParams } from "@/hooks/updateSearchParams";
import { CustomTablePagination } from "@/components/ui/CustomTablePagination";
import { Modal } from "@/components/ui/Modal/Modal";
import { Action } from "@/components/ui/TableActionsBtn";
// import { CompanyEditForm } from "@/components/product";

export const CategoryList = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);

  const searchParams = useSearchParams();
  const updateSearchParams = useUpdateSearchParams();

  const page = Number(searchParams.get("page")) || 1;
  const rowsPerPage = Number(searchParams.get("rowsPerPage")) || 10;

  const { data } = useGetCategoriesQuery({
    skip: (page - 1) * rowsPerPage,
    limit: rowsPerPage,
  });

  const t = useTranslations();
  const router = useRouter();

  const columns: { id: keyof ICategory; label: string }[] = [
    { id: "id", label: "ID" },
    { id: "name", label: t("category.name") },
    { id: "description", label: t("category.description") },
  ];

  const actions: Action<ICategory>[] = [
    {
      key: "viewUserBtn",
      icon: <Visibility />,
      color: ColorBtn.PRIMARY,
      onClick: (category) => router.push(`${Routes.CATEGORIES}/${category.id}`),
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
      {/* <Modal
        isOpenModal={isCreateModalOpen}
        setOpenModal={setIsCreateModalOpen}
      >
        <CategoryEditForm setIsOpenModal={setIsCreateModalOpen} />
      </Modal> */}
    </Box>
  );
};
