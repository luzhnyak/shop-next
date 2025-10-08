"use client";

import { Delete, Edit } from "@mui/icons-material";
import { Box, Button, Stack } from "@mui/material";
import { Popconfirm } from "../ui/Popconfirm";
// import { ProductVisibilityToggle } from "./ProductVisibilityToggle";
import { useDeleteProductMutation } from "@/redux/products/productsApi";
import { useEffect, useState } from "react";
import { IProduct, Routes } from "@/types";
import { ProductEditForm } from "./ProductEditForm";
import { Modal } from "../ui/Modal/Modal";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

type Props = {
  product: IProduct;
};

export const ProductEditBtn = ({ product }: Props) => {
  const [deleteProduct, { isLoading: isDeleting, isSuccess: isDeleted }] =
    useDeleteProductMutation();

  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);

  const t = useTranslations();
  const router = useRouter();

  useEffect(() => {
    if (isDeleted) router.push(Routes.PRODUCTS);
  }, [isDeleted, router]);

  return (
    <Box>
      <Stack direction="row" spacing={2} justifyContent="center" sx={{ pt: 2 }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Edit />}
          onClick={() => setIsEditModalOpen(true)}
          disabled={isDeleting}
        >
          {t("actions.btnEdit")}
        </Button>
        <Popconfirm
          title={t("dialog.deleteConfirmTitle")}
          description={t("dialog.deleteConfirmMessage")}
          onConfirm={() => deleteProduct(product.id)}
          okText={t("actions.btnOk")}
          cancelText={t("actions.btnCancel")}
        >
          <Button
            variant="contained"
            color="error"
            startIcon={<Delete />}
            disabled={isDeleting}
          >
            {isDeleting ? t("actions.btnDeleting") : t("actions.btnDelete")}
          </Button>
        </Popconfirm>
      </Stack>
      {/* <ProductVisibilityToggle
        productId={product.id}
        currentVisibility={product.visibility}
      /> */}
      <Modal isOpenModal={isEditModalOpen} setOpenModal={setIsEditModalOpen}>
        <ProductEditForm
          productId={product.id}
          initialData={product}
          setIsOpenModal={setIsEditModalOpen}
        />
      </Modal>
    </Box>
  );
};
