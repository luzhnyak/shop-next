"use client";

import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

import { selectIsLoggedIn } from "@/redux/auth/authSelectors";
import { Routes } from "@/types";

export const RestrictedRoute = ({ children }: { children: ReactNode }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      router.replace(Routes.HOME);
    }
  }, [isLoggedIn, router]);

  if (isLoggedIn) return null;

  return children;
};
