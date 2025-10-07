"use client";

import { Add } from "@mui/icons-material";
import { Box, Button, List, ListItem, ListItemText } from "@mui/material";
import { useAddInviteMutation } from "@/redux/memberships/membershipsApi";
import { useTranslations } from "next-intl";
import { Modal } from "../ui/Modal/Modal";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useGetAvailableCompaniesQuery } from "@/redux/memberships/membershipsApi";

type Props = {
  userId: number;
};

export const UserInviteBtn = ({ userId }: Props) => {
  const [addInvite, { isLoading }] = useAddInviteMutation();
  const { data: companies } = useGetAvailableCompaniesQuery({ id: userId });
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const t = useTranslations();

  const handleInvite = (companyId: number) => {
    addInvite({
      companyId,
      userId,
    });
    setIsModalOpen(false);
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        startIcon={<Add />}
        onClick={() => setIsModalOpen(true)}
      >
        {t("user.btnInvite")}
      </Button>
      <Modal isOpenModal={isModalOpen} setOpenModal={setIsModalOpen}>
        <Box sx={{ p: 2 }}>
          <Typography align="center" variant="h5">
            {t("company.titleAvialableCompanies")}
          </Typography>
          <List>
            {companies?.items?.map((company) => (
              <ListItem
                key={company.id}
                secondaryAction={
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<Add />}
                    onClick={() => handleInvite(company.id)}
                    disabled={isLoading}
                  >
                    {t("user.btnInvite")}
                  </Button>
                }
              >
                <ListItemText primary={company.name} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Modal>
    </>
  );
};
