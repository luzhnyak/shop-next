import { Routes } from "@/types";

export const pages = [
  { nameKey: "navigation.catalog", route: Routes.CATALOG },
  { nameKey: "navigation.about", route: Routes.ABOUT },
  { nameKey: "navigation.contacts", route: Routes.CONTACTS },
  { nameKey: "navigation.admin", route: Routes.ADMIN },
];

export const adminPages = [
  { nameKey: "navigation.users", route: Routes.USERS },
  { nameKey: "navigation.products", route: Routes.PRODUCTS },
  { nameKey: "navigation.categories", route: Routes.CATEGORIES },
];

export const settings = [
  {
    nameKey: "navigation.profile",
    action: Routes.PROFILE,
    private: true,
  },
  {
    nameKey: "navigation.signIn",
    action: Routes.SIGN_IN,
    private: false,
  },
];
