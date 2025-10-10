"use client";

import { useState, MouseEvent } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useSelector } from "react-redux";

import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";

import {
  selectCurrentUser,
  selectIsLoggedIn,
} from "@/redux/auth/authSelectors";

import { LanguageSwitcher } from "./LanguageSwitcher";
import { useAuthLogout } from "@/hooks/useAuthLogout";
import { settings } from "@/constants/navigation";
import { Routes } from "@/types";
import { Popconfirm } from "../ui/Popconfirm";

export const UserMenu = () => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const currentUser = useSelector(selectCurrentUser);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const logout = useAuthLogout();
  const t = useTranslations();
  const router = useRouter();

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleClickItemSetting = (action: string) => {
    if (action === Routes.PROFILE) router.push(Routes.PROFILE);
    if (action === Routes.SIGN_IN) router.push(action);
    handleCloseUserMenu();
  };

  return (
    <Stack
      direction="row"
      spacing={1}
      justifyContent="end"
      alignItems={"center"}
      sx={{ flexGrow: 1 }}
    >
      <LanguageSwitcher />
      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt="Remy Sharp" src="/avatar.png" />
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ top: "45px" }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ textAlign: "center", mb: 1 }}
          >
            {currentUser &&
              `${currentUser.first_name} ${currentUser.last_name}`}
          </Typography>
          <Divider />

          {settings.map((setting) =>
            setting.private != isLoggedIn ? null : (
              <MenuItem
                key={setting.action}
                onClick={() => {
                  handleClickItemSetting(setting.action);
                }}
              >
                <Typography sx={{ textAlign: "center" }}>
                  {t(setting.nameKey)}
                </Typography>
              </MenuItem>
            )
          )}
          {isLoggedIn && (
            <Popconfirm
              title={t("dialog.logoutConfirmTitle")}
              description={t("dialog.logoutConfirmMessage")}
              onConfirm={logout}
              okText={t("actions.btnOk")}
              cancelText={t("actions.btnCancel")}
            >
              <MenuItem>
                <Typography sx={{ textAlign: "center" }}>
                  {t("navigation.logout")}
                </Typography>
              </MenuItem>
            </Popconfirm>
          )}
        </Menu>
      </Box>
    </Stack>
  );
};
