"use client";

import { useSelector } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

import { selectAuthToken, selectIsLoggedIn } from "@/redux/auth/authSelectors";
import { Routes } from "@/types";

export const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const token = useSelector(selectAuthToken);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoggedIn && token === null) {
      router.replace(`${Routes.SIGN_IN}`);
    }
  }, [isLoggedIn, router, pathname, token]);

  if (!isLoggedIn) return null;

  return children;
};
