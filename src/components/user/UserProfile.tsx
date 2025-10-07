"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useSelector } from "react-redux";
import { useParams, useRouter, notFound } from "next/navigation";
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

import {
  useDeleteUserMutation,
  useGetUserByIdQuery,
} from "../../redux/users/usersApi";
import { selectCurrentUser } from "@/redux/auth/authSelectors";

import { Popconfirm } from "../ui/Popconfirm";
import { toast } from "react-toastify";
import { Routes } from "@/types";
import { Modal } from "../ui/Modal/Modal";
import {
  UserInviteBtn,
  UserInviteList,
  UserEditForm,
  UserRequestList,
  UserCompanyList,
} from "@/components/user";

export const UserProfile = () => {
  const params = useParams();
  const currentUser = useSelector(selectCurrentUser)!;

  const userId = Number(params.id);

  if (isNaN(userId)) {
    notFound();
  }

  const { data: user, error } = useGetUserByIdQuery(userId);

  const [deleteUser, { isLoading: isDeleting, isSuccess: isDeleted }] =
    useDeleteUserMutation();
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);

  const t = useTranslations();
  const router = useRouter();

  const handleEdit = () => {
    setIsEditModalOpen(true);
  };

  const handleDelete = () => {
    deleteUser(userId!);
  };

  useEffect(() => {
    if (isDeleted) router.push(Routes.USERS);
  }, [isDeleted, router]);

  useEffect(() => {
    if (error) toast.error(t("user.errorLoadingUser"));
  }, [error, t, toast]);

  if (!user)
    return <Typography align="center">{t("user.userNotFound")}</Typography>;

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        {t("user.titleProfile")}
      </Typography>
      <Card sx={{ maxWidth: 400, mx: "auto", p: 2, textAlign: "center" }}>
        <Avatar
          sx={{ width: 100, height: 100, mx: "auto" }}
          src={"/avatar.png"}
          alt={user.first_name}
        />
        <CardContent>
          <Typography variant="h5">
            {user.first_name} {user.last_name}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {user.email}
          </Typography>
          {currentUser && currentUser.id === user.id && (
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
                  {isDeleting
                    ? t("actions.btnDeleting")
                    : t("actions.btnDelete")}
                </Button>
              </Popconfirm>
            </Stack>
          )}
          {currentUser.id != user.id && <UserInviteBtn userId={userId} />}
        </CardContent>
      </Card>
      <UserCompanyList userId={userId} />
      {currentUser.id === user.id && (
        <Box>
          <UserRequestList userId={userId} />
          <UserInviteList userId={userId} />
          <Modal
            isOpenModal={isEditModalOpen}
            setOpenModal={setIsEditModalOpen}
          >
            <UserEditForm userId={userId} setIsOpenModal={setIsEditModalOpen} />
          </Modal>
        </Box>
      )}
    </Box>
  );
};
