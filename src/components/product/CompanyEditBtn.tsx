"use client";

import { Delete, Edit } from "@mui/icons-material";
import { Box, Button, Stack } from "@mui/material";
import { Popconfirm } from "../ui/Popconfirm";
import { CompanyVisibilityToggle } from "./CompanyVisibilityToggle";
import { useDeleteCompanyMutation } from "@/redux/products/productsApi";
import { useEffect, useState } from "react";
import { ICompany, Routes } from "@/types";
import { CompanyEditForm } from "./CompanyEditForm";
import { Modal } from "../ui/Modal/Modal";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

type Props = {
  company: ICompany;
};

export const CompanyEditBtn = ({ company }: Props) => {
  const [deleteCompany, { isLoading: isDeleting, isSuccess: isDeleted }] =
    useDeleteCompanyMutation();

  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);

  const t = useTranslations();
  const router = useRouter();

  useEffect(() => {
    if (isDeleted) router.push(Routes.COMPANIES);
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
          onConfirm={() => deleteCompany(company.id)}
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
      <CompanyVisibilityToggle
        companyId={company.id}
        currentVisibility={company.visibility}
      />
      <Modal isOpenModal={isEditModalOpen} setOpenModal={setIsEditModalOpen}>
        <CompanyEditForm
          companyId={company.id}
          initialData={{ name: company.name, description: company.description }}
          setIsOpenModal={setIsEditModalOpen}
        />
      </Modal>
    </Box>
  );
};
