"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Button,
  Stack,
  Box,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

import { useDeleteUserMutation } from "../../../redux/users/usersApi";
import { selectCurrentUser } from "@/redux/auth/authSelectors";

import { Popconfirm } from "../../ui/Popconfirm";
import { Routes } from "@/types";
import { Modal } from "../../ui/Modal/Modal";
import { UserEditForm } from "@/components/admin/user";

export const UserProfile = () => {
  const currentUser = useSelector(selectCurrentUser)!;

  const [deleteUser, { isLoading: isDeleting, isSuccess: isDeleted }] =
    useDeleteUserMutation();
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);

  const t = useTranslations();
  const router = useRouter();

  const handleEdit = () => {
    setIsEditModalOpen(true);
  };

  const handleDelete = () => {
    deleteUser(currentUser.id!);
  };

  useEffect(() => {
    if (isDeleted) router.push(Routes.USERS);
  }, [isDeleted, router]);

  if (!currentUser) {
    return null;
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        {t("user.titleProfile")}
      </Typography>
      <Card sx={{ maxWidth: 400, mx: "auto", p: 2, textAlign: "center" }}>
        <Avatar
          sx={{ width: 100, height: 100, mx: "auto" }}
          src={"/avatar.png"}
          alt={currentUser.first_name}
        />
        <CardContent>
          <Typography variant="h5">
            {currentUser.first_name} {currentUser.last_name}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {currentUser.email}
          </Typography>

          <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            sx={{ pt: 2 }}
          >
            <Button
              variant="contained"
              color="primary"
              startIcon={<Edit />}
              onClick={handleEdit}
              disabled={isDeleting}
            >
              {t("actions.btnEdit")}
            </Button>
            <Popconfirm
              title={t("dialog.deleteConfirmTitle")}
              description={t("dialog.deleteConfirmMessage")}
              onConfirm={handleDelete}
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
        </CardContent>
      </Card>
      <Box>
        <Modal isOpenModal={isEditModalOpen} setOpenModal={setIsEditModalOpen}>
          <UserEditForm
            userId={currentUser.id!}
            initialData={{
              first_name: currentUser.first_name,
              last_name: currentUser.last_name,
              email: currentUser.email,
            }}
            setIsOpenModal={setIsEditModalOpen}
          />
        </Modal>
      </Box>
    </Box>
  );
};
