"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { selectAuthToken, selectIsLoggedIn } from "@/redux/auth/authSelectors";
import { Routes } from "@/types";

/**
 * Тип доступу:
 * - "private" — лише для авторизованих
 * - "restricted" — лише для неавторизованих
 */
type RouteGuardProps = {
  access: "private" | "restricted";
  children: ReactNode;
};

export const RouteGuard = ({ access, children }: RouteGuardProps) => {
  const router = useRouter();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const token = useSelector(selectAuthToken);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (access === "private") {
      if (!isLoggedIn && !token) {
        router.replace(Routes.SIGN_IN);
      } else {
        setChecked(true);
      }
    } else if (access === "restricted") {
      if (isLoggedIn) {
        router.replace(Routes.ADMIN);
      } else {
        setChecked(true);
      }
    }
  }, [access, isLoggedIn, token, router]);

  if (!checked) {
    // Можна показати loader або splash screen
    return <div>Loading...</div>;
  }

  return children;
};
