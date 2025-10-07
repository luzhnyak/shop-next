import { Routes } from "@/types";

export const pages = [
  { nameKey: "navigation.about", route: Routes.ABOUT },
  { nameKey: "navigation.users", route: Routes.USERS },
  { nameKey: "navigation.products", route: Routes.PRODUCTS },
  { nameKey: "navigation.categories", route: Routes.CATEGORIES },
  { nameKey: "navigation.catalog", route: Routes.CATALOG },
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
