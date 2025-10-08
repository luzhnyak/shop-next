"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CustomTable } from "../ui/CustomTable";
import { useTranslations } from "next-intl";
import { Typography, Box, Button } from "@mui/material";
import { Add, Delete, Edit, Visibility } from "@mui/icons-material";

import { ColorBtn, IProduct, Routes } from "@/types";
import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from "@/redux/products/productsApi";
import { useUpdateSearchParams } from "@/hooks/updateSearchParams";
import { CustomTablePagination } from "@/components/ui/CustomTablePagination";
import { Modal } from "@/components/ui/Modal/Modal";
import { Action } from "@/components/ui/TableActionsBtn";
import { ProductEditForm } from "@/components/product";

export const ProductList = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [productId, setProductId] = useState<number>(0);

  const searchParams = useSearchParams();
  const updateSearchParams = useUpdateSearchParams();

  const page = Number(searchParams.get("page")) || 1;
  const rowsPerPage = Number(searchParams.get("rowsPerPage")) || 10;

  const { data } = useGetProductsQuery({
    skip: (page - 1) * rowsPerPage,
    limit: rowsPerPage,
  });
  const [deleteProduct] = useDeleteProductMutation();

  const t = useTranslations();
  const router = useRouter();

  const columns: { id: keyof IProduct; label: string }[] = [
    { id: "id", label: "ID" },
    { id: "name", label: t("product.name") },
    { id: "description", label: t("product.description") },
  ];

  const actions: Action<IProduct>[] = [
    {
      key: "viewUserBtn",
      icon: <Visibility />,
      color: ColorBtn.PRIMARY,
      onClick: (product) => router.push(`${Routes.PRODUCTS}/${product.id}`),
    },
    {
      key: "editCategoryBtn",
      icon: <Edit />,
      color: ColorBtn.PRIMARY,
      onClick: (category) => {
        setProductId(category.id);
        setIsCreateModalOpen(true);
      },
    },
    {
      key: "deleteCategoryBtn",
      icon: <Delete />,
      color: ColorBtn.ERROR,
      onClick: (category) => {
        deleteProduct(category.id);
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
        {t("product.titleProducts")}
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
        {Boolean(productId) ? (
          <ProductEditForm
            productId={productId}
            initialData={data?.items.find((p) => p.id === productId)}
            setIsOpenModal={setIsCreateModalOpen}
          />
        ) : (
          <ProductEditForm setIsOpenModal={setIsCreateModalOpen} />
        )}
      </Modal>
    </Box>
  );
};
