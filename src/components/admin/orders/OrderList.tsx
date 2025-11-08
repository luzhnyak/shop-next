"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Column, CustomTable } from "../../ui/CustomTable";
import { useTranslations } from "next-intl";
import { Typography, Box, Button } from "@mui/material";
import { Add, Delete, Edit, Visibility } from "@mui/icons-material";
import { ColorBtn, ICategory, IOrder, Routes } from "@/types";

import { useUpdateSearchParams } from "@/hooks/updateSearchParams";
import { CustomTablePagination } from "@/components/ui/CustomTablePagination";
import { Modal } from "@/components/ui/Modal/Modal";
import { Action } from "@/components/ui/TableActionsBtn";
import { OrderEditForm } from "./OrderEditForm";
import {
  useDeleteOrderMutation,
  useGetOrdersQuery,
} from "@/redux/orders/ordersApi";

export const OrderList = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [orderId, setOrderId] = useState<number>(0);

  const searchParams = useSearchParams();
  const updateSearchParams = useUpdateSearchParams();

  const page = Number(searchParams.get("page")) || 1;
  const rowsPerPage = Number(searchParams.get("rowsPerPage")) || 10;

  const { data } = useGetOrdersQuery({
    skip: (page - 1) * rowsPerPage,
    limit: rowsPerPage,
  });
  const [deleteOrder] = useDeleteOrderMutation();

  const t = useTranslations();
  const router = useRouter();

  const columns: Column<IOrder>[] = [
    { id: "id", label: "ID" },
    { id: "user_name", label: "User Name" },
    // { id: "address_name", label: "Address Name" },

    { id: "status", label: "Status" },
    { id: "total_price", label: "Total Price" },
    { id: "created_at", label: "Created At" },
    // { id: "updated_at", label: "Updated At" },
  ];

  const actions: Action<IOrder>[] = [
    {
      key: "editOrderBtn",
      icon: <Edit />,
      color: ColorBtn.PRIMARY,
      onClick: (order) => {
        setOrderId(order.id);
        setIsCreateModalOpen(true);
      },
    },
    {
      key: "deleteOrderBtn",
      icon: <Delete />,
      color: ColorBtn.ERROR,
      onClick: (order) => {
        deleteOrder(order.id);
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
        {t("order.titleOrders")}
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
        {Boolean(orderId) ? (
          <OrderEditForm
            orderId={orderId}
            initialData={data?.items.find((c) => c.id === orderId)}
            setIsOpenModal={setIsCreateModalOpen}
          />
        ) : (
          <OrderEditForm setIsOpenModal={setIsCreateModalOpen} />
        )}
      </Modal>
    </Box>
  );
};
