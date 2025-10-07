"use client";

import { ReactNode } from "react";
import { useAuthInit } from "@/hooks/useAuthInit";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  useAuthInit();

  return children;
};
