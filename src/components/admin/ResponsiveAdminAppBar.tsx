"use client";
import { useState, MouseEvent } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useSelector } from "react-redux";

import Stack from "@mui/material/Stack";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";

import { adminPages, settings } from "@/constants/navigation";
import { Popconfirm } from "../ui/Popconfirm";
import { Routes } from "@/types";
import { LanguageSwitcher } from "../LanguageSwitcher";
import { Loader } from "../Loader";
import { useAuthLogout } from "@/hooks/useAuthLogout";

import {
  selectCurrentUser,
  selectIsLoggedIn,
} from "@/redux/auth/authSelectors";

export const ResponsiveAdminAppBar = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const currentUser = useSelector(selectCurrentUser);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const logout = useAuthLogout();
  const t = useTranslations();
  const router = useRouter();

  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleClickItemMenu = (route: Routes) => {
    router.push(route);
    handleCloseNavMenu();
  };

  const handleClickItemSetting = (action: string) => {
    if (action === Routes.PROFILE)
      router.push(`${Routes.USERS}/${currentUser?.id}`);
    if (action === Routes.SIGN_IN) router.push(action);
    handleCloseUserMenu();
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, pr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            onClick={() => router.push(Routes.HOME)}
            sx={{
              pr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            {"PromConcept"}
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {adminPages.map((page) => (
                <MenuItem
                  key={page.route}
                  onClick={() => handleClickItemMenu(page.route)}
                >
                  <Typography sx={{ textAlign: "center" }}>
                    {t(page.nameKey)}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, pr: 0 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            onClick={() => router.push(Routes.HOME)}
            sx={{
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            {"PromConcept"}
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {adminPages.map((page) => (
              <Button
                key={page.route}
                onClick={() => handleClickItemMenu(page.route)}
                sx={{ color: "white", display: "block" }}
              >
                {t(page.nameKey)}
              </Button>
            ))}
          </Box>
          <Stack
            flexDirection={"row"}
            alignItems={"center"}
            gap={2}
            sx={{ pr: 2 }}
          >
            <LanguageSwitcher />
            <Typography sx={{ textAlign: "center" }}>
              {currentUser &&
                `${currentUser.first_name} ${currentUser.last_name}`}
            </Typography>
          </Stack>
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
        </Toolbar>
      </Container>
      <Loader />
    </AppBar>
  );
};
